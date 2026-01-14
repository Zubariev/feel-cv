import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { FileUpload } from './components/FileUpload';
import { CapitalRadar } from './components/CapitalRadar';
import { ToneAnalysis } from './components/ToneAnalysis';
import { SkillCompositionBar } from './components/SkillComposition';
import { VisualMetrics } from './components/VisualMetrics';
import { SaliencyHeatmap } from './components/SaliencyHeatmap';
import { CapitalEvidence } from './components/CapitalEvidence';
import { SkillsOverlay } from './components/SkillsOverlay';
import { ErrorBoundary, ErrorMessage } from './components/ErrorBoundary';
import { AnalysisSkeleton, UploadingSkeleton } from './components/LoadingSkeletons';
import { analyzeResume } from './services/geminiService';
import { convertPdfToImage } from './services/pdfService';
import { AnalysisResult, ComparisonResult, EntitlementSnapshot, PlanCode } from './types';
import { getPostBySlug } from './data/blogData';
import { supabase } from './services/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { databaseService } from './services/databaseService';
import { imageCacheService, computeBase64Hash } from './services/imageCacheService';
import { layerCaptureService } from './services/layerCaptureService';
import { comparisonService } from './services/comparisonService';
import { entitlementsService } from './services/entitlementsService';
import { paymentService } from './services/paymentService';
import { UpgradeModal } from './components/UpgradeModal';
import { UsageSummary } from './components/UsageMeter';
import { EmbeddedCheckout } from './components/EmbeddedCheckout';
import { useToast } from './components/Toast';

// Lazy-loaded page components for code splitting
const LandingPage = lazy(() => import('./components/LandingPage').then(m => ({ default: m.LandingPage })));
const AnalysisHistory = lazy(() => import('./components/AnalysisHistory').then(m => ({ default: m.AnalysisHistory })));
const ComparisonSelector = lazy(() => import('./components/ComparisonSelector').then(m => ({ default: m.ComparisonSelector })));
const ComparisonDashboard = lazy(() => import('./components/ComparisonDashboard').then(m => ({ default: m.ComparisonDashboard })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import('./components/TermsOfUsePage').then(m => ({ default: m.TermsOfUsePage })));
const CookiePolicyPage = lazy(() => import('./components/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const GDPRCompliancePage = lazy(() => import('./components/GDPRCompliancePage').then(m => ({ default: m.GDPRCompliancePage })));
const AIEthicalPolicyPage = lazy(() => import('./components/AIEthicalPolicyPage').then(m => ({ default: m.AIEthicalPolicyPage })));
const PaymentSuccessPage = lazy(() => import('./components/PaymentSuccessPage').then(m => ({ default: m.PaymentSuccessPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./components/BlogPostPage').then(m => ({ default: m.BlogPostPage })));

// Feature pages
const CVAnalysisPage = lazy(() => import('./components/features/CVAnalysisPage').then(m => ({ default: m.CVAnalysisPage })));
const CVComparisonPage = lazy(() => import('./components/features/CVComparisonPage').then(m => ({ default: m.CVComparisonPage })));
const EyeTrackingPage = lazy(() => import('./components/features/EyeTrackingPage').then(m => ({ default: m.EyeTrackingPage })));
const CapitalTheoryPage = lazy(() => import('./components/features/CapitalTheoryPage').then(m => ({ default: m.CapitalTheoryPage })));
const ATSScorePage = lazy(() => import('./components/features/ATSScorePage').then(m => ({ default: m.ATSScorePage })));
const MarketSignalingPage = lazy(() => import('./components/features/MarketSignalingPage').then(m => ({ default: m.MarketSignalingPage })));

// Simple loading fallback for lazy components
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  </div>
);

// Info button component that links to blog posts
const InfoButton: React.FC<{ slug: string; onClick: (slug: string) => void }> = ({ slug, onClick }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(slug); }}
    className="ml-2 p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
    title="Learn more about this analysis"
  >
    <Info className="w-4 h-4" />
  </button>
);

import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Award,
  Fingerprint,
  FileSearch,
  RefreshCw,
  Eye,
  EyeOff,
  Layers,
  ArrowLeft,
  History,
  Info,
  X,
  ZoomIn
} from 'lucide-react';

export default function App() {
  const { showToast } = useToast();
  const [showLanding, setShowLanding] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSaliency, setShowSaliency] = useState(true);
  const [showSkills, setShowSkills] = useState(false);
  // Cached layer images for past analyses
  const [cachedLayerUrls, setCachedLayerUrls] = useState<{
    raw: string | null;
    heatmap: string | null;
    skills: string | null;
    heatmap_skills: string | null;
  } | null>(null);
  const [_authSession, setAuthSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [_lastSavedAnalysisId, setLastSavedAnalysisId] = useState<string | null>(null);

  // Comparison feature state
  const [showComparisonSelector, setShowComparisonSelector] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [comparisonBaseAnalysis, setComparisonBaseAnalysis] = useState<AnalysisResult | null>(null);
  const [comparisonCompareAnalysis, setComparisonCompareAnalysis] = useState<AnalysisResult | null>(null);

  // Page navigation state
  const [currentPage, setCurrentPage] = useState<'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling' | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<string | null>(null);

  // Payment success state
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Entitlements state
  const [entitlements, setEntitlements] = useState<EntitlementSnapshot | null>(null);
  const [entitlementsLoading, setEntitlementsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [blockedAction, setBlockedAction] = useState<'analyze' | 'compare'>('analyze');
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Embedded checkout state
  const [showEmbeddedCheckout, setShowEmbeddedCheckout] = useState(false);

  // Image lightbox state
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    checkoutUrl: string;
    orderId: string;
    planName: string;
    planCode: PlanCode;
    amount: string;
  } | null>(null);

  // Ref for image dimensions to size the canvas
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // Reset saliency view when result changes
    if (result) {
        setShowSaliency(true);
        setShowSkills(false);
    }
  }, [result]);

  const handleImageLoad = () => {
    if (imageRef.current) {
        setImgDims({
            w: imageRef.current.offsetWidth,
            h: imageRef.current.offsetHeight
        });
    }
  };

  // Re-measure on window resize
  useEffect(() => {
    const handleResize = () => {
        if (imageRef.current) {
            setImgDims({
                w: imageRef.current.offsetWidth,
                h: imageRef.current.offsetHeight
            });
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [result]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageLightbox) {
        setShowImageLightbox(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showImageLightbox]);

  // Initialize auth session and subscribe to changes
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (error) {
        console.error('Error getting session', error);
        return;
      }
      setAuthSession(data.session);
      setCurrentUser(data.session?.user ?? null);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch entitlements when user changes
  const refreshEntitlements = useCallback(async () => {
    if (!currentUser) {
      setEntitlements(null);
      return;
    }

    setEntitlementsLoading(true);
    try {
      const snapshot = await entitlementsService.getEntitlements(currentUser.id);
      setEntitlements(snapshot);
    } catch (err) {
      console.error('Failed to fetch entitlements:', err);
    } finally {
      setEntitlementsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    refreshEntitlements();
  }, [refreshEntitlements]);

  // Detect payment success URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/payment/success') {
      setShowPaymentSuccess(true);
      setShowLanding(false);
      // Clean up the URL without page reload
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handlePaymentSuccessContinue = () => {
    setShowPaymentSuccess(false);
    setShowLanding(false);
  };

  const handleLogin = async (email: string, password: string) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
        showToast({ type: 'error', title: 'Login Failed', message: error.message });
      } else {
        showToast({ type: 'success', title: 'Welcome Back', message: 'You have signed in successfully.' });
      }
    } catch (err: any) {
      console.error('Login error', err);
      setAuthError('Unexpected error during login. Please try again.');
      showToast({ type: 'error', title: 'Login Failed', message: 'Please try again.' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthError(error.message);
        showToast({ type: 'error', title: 'Signup Failed', message: error.message });
      } else {
        setAuthError('Check your email to confirm your account before signing in.');
        showToast({ type: 'info', title: 'Check Your Email', message: 'Please confirm your account before signing in.' });
      }
    } catch (err: any) {
      console.error('Signup error', err);
      setAuthError('Unexpected error during signup. Please try again.');
      showToast({ type: 'error', title: 'Signup Failed', message: 'Please try again.' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setAuthError(error.message);
      }
    } catch (err: any) {
      console.error('Logout error', err);
      setAuthError('Unexpected error during logout. Please try again.');
    }
  };

  const handleFileSelect = async (file: File) => {
    // Check entitlements before analyzing
    if (currentUser && entitlements) {
      if (!entitlements.can.analyze_cv) {
        setBlockedAction('analyze');
        setShowUpgradeModal(true);
        return;
      }
    }

    try {
      setIsAnalyzing(true);
      setResult(null); // Clear previous
      setLastSavedAnalysisId(null);
      setAnalysisError(null);

      let base64Data = "";
      let mimeType = "";
      let imageDataUrl = "";

      if (file.type === 'application/pdf') {
        // Convert PDF to Image first
        const imageUri = await convertPdfToImage(file);
        // imageUri is data:image/png;base64,....
        setImagePreview(imageUri);
        imageDataUrl = imageUri;
        base64Data = imageUri.split(',')[1];
        mimeType = 'image/png';
      } else {
        // Handle normal Image
        imageDataUrl = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.readAsDataURL(file);
          r.onload = () => resolve(r.result as string);
          r.onerror = (error) => reject(error);
        });
        setImagePreview(imageDataUrl);
        base64Data = imageDataUrl.split(',')[1];
        mimeType = file.type;
      }

      // Check for duplicate analysis (caching) if user is authenticated
      if (currentUser?.id) {
        const fileHash = await computeBase64Hash(base64Data);

        // Check if we already analyzed this exact document
        const cachedAnalysis = await imageCacheService.findExistingAnalysis(
          currentUser.id,
          fileHash
        );

        if (cachedAnalysis) {
          // Found cached analysis - fetch the full result
          console.log('Found cached analysis:', cachedAnalysis.analysisId);
          try {
            const existingAnalysis = await databaseService.getAnalysis(cachedAnalysis.analysisId);
            if (existingAnalysis) {
              // Reconstruct AnalysisResult from cached data
              // For now, we'll re-run the analysis but skip saving
              // TODO: Implement full cache restoration
              console.log('Using cached analysis data');
            }
          } catch (err) {
            console.warn('Failed to load cached analysis, running new analysis');
          }
        }
      }

      // Run the AI analysis
      const analysis = await analyzeResume(base64Data, mimeType);
      setResult(analysis);

      // Show success toast
      showToast({
        type: 'success',
        title: 'Analysis Complete',
        message: `Overall score: ${analysis.overallScore}/100`,
      });

      // Persist analysis and generate image layers if user is authenticated
      if (currentUser?.id) {
        try {
          // Record usage (deducts from subscription or one-time purchases)
          const usageResult = await entitlementsService.recordAnalysisUsage(currentUser.id);
          console.log('Usage recording result:', JSON.stringify(usageResult));
          if (!usageResult.success) {
            console.error('Failed to record usage:', usageResult.error, usageResult.message);
            // Show a warning toast but don't block the analysis
            showToast({
              type: 'warning',
              title: 'Usage Tracking Issue',
              message: 'Analysis complete, but usage count may not be updated.',
            });
          }

          // Refresh entitlements to update UI
          await refreshEntitlements();
          console.log('Entitlements refreshed after analysis');

          // Save the analysis result
          const analysisId = await databaseService.saveAnalysisResult(
            currentUser.id,
            file,
            analysis
          );
          setLastSavedAnalysisId(analysisId);

          // Compute file hash for future duplicate detection
          const fileHash = await computeBase64Hash(base64Data);

          // Get the document ID from the analysis
          const analysisData = await databaseService.getAnalysis(analysisId);
          const documentId = (analysisData as any)?.document_id;

          if (documentId) {
            // Save fingerprint for duplicate detection
            await imageCacheService.saveFingerprint(
              currentUser.id,
              documentId,
              fileHash,
              file.size
            );

            // Generate and save all image layers in the background
            generateAndSaveLayers(
              currentUser.id,
              analysisId,
              documentId,
              imageDataUrl,
              analysis
            );
          }
        } catch (err) {
          console.error('Failed to persist analysis to Supabase', err);
        }
      } else {
        console.warn(
          'Analysis result not saved because no authenticated user was found. RLS requires auth.uid().'
        );
      }
    } catch (error) {
      console.error(error);
      setAnalysisError("Failed to analyze resume. Please try again.");
      showToast({
        type: 'error',
        title: 'Analysis Failed',
        message: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Background function to generate and save image layers
  const generateAndSaveLayers = async (
    userId: string,
    analysisId: string,
    documentId: string,
    imageDataUrl: string,
    analysis: AnalysisResult
  ) => {
    try {
      // Get image dimensions
      const img = new Image();
      img.src = imageDataUrl;
      await new Promise((resolve) => { img.onload = resolve; });
      const width = img.width;
      const height = img.height;

      // Generate all layer variations
      const layers = await layerCaptureService.generateAllLayers(
        imageDataUrl,
        analysis.visualHotspots || [],
        analysis.skillHighlights || []
      );

      // Upload each layer to storage
      await Promise.all([
        imageCacheService.uploadLayer(userId, analysisId, documentId, 'raw', layers.raw, width, height),
        imageCacheService.uploadLayer(userId, analysisId, documentId, 'heatmap', layers.heatmap, width, height),
        imageCacheService.uploadLayer(userId, analysisId, documentId, 'skills', layers.skills, width, height),
        imageCacheService.uploadLayer(userId, analysisId, documentId, 'heatmap_skills', layers.heatmap_skills, width, height),
      ]);

      console.log('All image layers saved successfully');
    } catch (err) {
      console.error('Failed to generate/save image layers:', err);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImagePreview(null);
    setLastSavedAnalysisId(null);
    setAnalysisError(null);
    setCachedLayerUrls(null);
  };

  const handleViewHistory = () => {
    setShowHistory(true);
    setShowLanding(false);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
  };

  const handleViewAnalysis = async (analysisId: string) => {
    setShowHistory(false);
    setShowLanding(false);
    setIsAnalyzing(true);
    setResult(null);
    setImagePreview(null);
    setCachedLayerUrls(null);

    try {
      // Load the full analysis result from database
      const analysisResult = await databaseService.getFullAnalysisResult(analysisId);
      if (!analysisResult) {
        setAnalysisError('Failed to load analysis data.');
        setIsAnalyzing(false);
        return;
      }

      // Try to load cached image layers
      let imageUrl: string | null = null;
      const cachedLayers = await imageCacheService.getLayers(analysisId);

      // Load all layer URLs in parallel
      const layerUrls: { raw: string | null; heatmap: string | null; skills: string | null; heatmap_skills: string | null } = {
        raw: null,
        heatmap: null,
        skills: null,
        heatmap_skills: null
      };

      if (cachedLayers.length > 0) {
        const layerPromises = cachedLayers.map(async (layer) => {
          const url = await imageCacheService.getLayerUrl(layer);
          return { type: layer.layer_type, url };
        });

        const resolvedLayers = await Promise.all(layerPromises);
        resolvedLayers.forEach(({ type, url }) => {
          if (type === 'raw' || type === 'heatmap' || type === 'skills' || type === 'heatmap_skills') {
            layerUrls[type] = url;
          }
        });

        imageUrl = layerUrls.raw;
        setCachedLayerUrls(layerUrls);
      }

      // Fallback: If no cached layers, try to load from original document
      if (!imageUrl && currentUser) {
        const analysisData = await databaseService.getAnalysis(analysisId);
        const documentId = (analysisData as any)?.document_id;

        if (documentId) {
          const analyses = await databaseService.listUserAnalyses(currentUser.id);
          const analysisInfo = (analyses as any[])?.find((a) => a.id === analysisId);
          const storagePath = analysisInfo?.document?.storage_path;
          const mimeType = analysisInfo?.document?.mime_type;

          // Only use direct URL for image files, not PDFs
          if (storagePath && mimeType && mimeType.startsWith('image/')) {
            imageUrl = await databaseService.getDocumentUrl(storagePath);
          }
        }
      }

      // Set the state to display the analysis
      setResult(analysisResult);
      setImagePreview(imageUrl);
      setIsAnalyzing(false);
    } catch (err) {
      console.error('Failed to load analysis:', err);
      setAnalysisError('Failed to load analysis. Please try again.');
      setIsAnalyzing(false);
    }
  };

  // Comparison feature handlers
  const handleStartComparison = () => {
    setShowComparisonSelector(true);
    setShowHistory(false);
  };

  const handleCompare = async (baseId: string, compareId: string) => {
    if (!currentUser) return;

    // Check entitlements
    if (entitlements && !entitlements.can.compare_cvs) {
      setBlockedAction('compare');
      setShowUpgradeModal(true);
      return;
    }

    try {
      // Load both full analyses
      const [baseResult, compareResult] = await Promise.all([
        databaseService.getFullAnalysisResult(baseId),
        databaseService.getFullAnalysisResult(compareId)
      ]);

      if (!baseResult || !compareResult) {
        setAnalysisError('Failed to load analysis data. Please try again.');
        return;
      }

      // Get metadata for names/dates
      const analyses = await databaseService.listUserAnalyses(currentUser.id);
      const baseInfo = (analyses as any[])?.find((a) => a.id === baseId);
      const compareInfo = (analyses as any[])?.find((a) => a.id === compareId);

      // Compute comparison
      const comparison = comparisonService.compareAnalyses(
        baseResult,
        compareResult,
        baseId,
        compareId,
        baseInfo?.document?.original_filename || 'Base',
        compareInfo?.document?.original_filename || 'Compare',
        baseInfo?.created_at || '',
        compareInfo?.created_at || ''
      );

      // Record usage
      const usageResult = await entitlementsService.recordComparisonUsage(currentUser.id);
      console.log('Comparison usage recording result:', JSON.stringify(usageResult));
      if (!usageResult.success) {
        console.error('Failed to record comparison usage:', usageResult.error, usageResult.message);
        showToast({
          type: 'warning',
          title: 'Usage Tracking Issue',
          message: 'Comparison complete, but usage count may not be updated.',
        });
      }

      // Refresh entitlements to update UI
      await refreshEntitlements();
      console.log('Entitlements refreshed after comparison');

      // Show comparison view
      setComparisonResult(comparison);
      setComparisonBaseAnalysis(baseResult);
      setComparisonCompareAnalysis(compareResult);
      setShowComparisonSelector(false);
      setShowComparison(true);
    } catch (err) {
      console.error('Comparison failed:', err);
      setAnalysisError('Failed to compare analyses. Please try again.');
    }
  };

  const handleBackFromComparison = () => {
    setShowComparison(false);
    setComparisonResult(null);
    setComparisonBaseAnalysis(null);
    setComparisonCompareAnalysis(null);
    setShowHistory(true);
  };

  const handleCancelComparison = () => {
    setShowComparisonSelector(false);
    setShowHistory(true);
  };

  // Plan display info helper
  const getPlanDisplayInfo = (planCode: PlanCode): { name: string; amount: string } => {
    switch (planCode) {
      case 'one-time':
        return { name: 'Single CV Analysis', amount: '€3.99' };
      case 'explorer':
        return { name: 'Explorer Plan', amount: '€9/month' };
      case 'career-builder':
        return { name: 'Career Builder Plan', amount: '€19/month' };
      case 'career-accelerator':
        return { name: 'Career Accelerator Plan', amount: '€29/month' };
      default:
        return { name: 'CViviD Plan', amount: '' };
    }
  };

  // Payment flow handler
  const handleSelectPlan = async (planCode: PlanCode) => {
    console.log('[App] handleSelectPlan called with planCode:', planCode);
    console.log('[App] currentUser:', currentUser?.id);

    if (!currentUser) {
      console.warn('[App] No current user - cannot proceed with payment');
      showToast({
        type: 'error',
        title: 'Please Sign In',
        message: 'You need to be signed in to purchase a plan.',
      });
      return;
    }

    if (!planCode) {
      console.warn('[App] No plan code provided');
      return;
    }

    setPaymentLoading(true);
    console.log('[App] Starting payment creation...');
    try {
      const { checkoutUrl, orderId } = await paymentService.createPayment({
        userId: currentUser.id,
        userEmail: currentUser.email || '',
        planCode,
      });

      console.log('[App] Payment created successfully:', { checkoutUrl, orderId });
      const planInfo = getPlanDisplayInfo(planCode);

      // Close the upgrade modal and show embedded checkout
      setShowUpgradeModal(false);
      setCheckoutData({
        checkoutUrl,
        orderId,
        planName: planInfo.name,
        planCode,
        amount: planInfo.amount,
      });
      setShowEmbeddedCheckout(true);
    } catch (err) {
      console.error('[App] Failed to create payment:', err);
      showToast({
        type: 'error',
        title: 'Payment Error',
        message: err instanceof Error ? err.message : 'Failed to start payment. Please try again.',
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  // Handle successful payment from embedded checkout
  const handlePaymentSuccess = async () => {
    setShowEmbeddedCheckout(false);
    setCheckoutData(null);
    setShowPaymentSuccess(true);
    showToast({
      type: 'success',
      title: 'Payment Successful',
      message: 'Your plan has been activated!',
    });
    // Refresh entitlements after a short delay to allow webhook processing
    setTimeout(() => refreshEntitlements(), 2000);
  };

  // Handle payment error from embedded checkout
  const handlePaymentError = (error: string) => {
    setShowEmbeddedCheckout(false);
    setCheckoutData(null);
    setAnalysisError(`Payment failed: ${error}`);
    showToast({
      type: 'error',
      title: 'Payment Failed',
      message: error || 'Please try again or use a different payment method.',
    });
  };

  // Handle embedded checkout close
  const handleCheckoutClose = () => {
    setShowEmbeddedCheckout(false);
    setCheckoutData(null);
  };

  // Page navigation handlers
  const handleNavigate = (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => {
    setCurrentPage(page);
    setShowLanding(false);
    setShowHistory(false);
    setShowComparison(false);
    setShowComparisonSelector(false);
    if (page !== 'blog') {
      setSelectedBlogPost(null);
    }
  };

  const handleBackFromPage = () => {
    setCurrentPage(null);
    setSelectedBlogPost(null);
    setShowLanding(true);
  };

  const handleSelectBlogPost = (slug: string) => {
    setSelectedBlogPost(slug);
  };

  const handleBackToBlog = () => {
    setSelectedBlogPost(null);
  };

  // Handler to open a specific blog post from analysis info buttons
  const handleOpenBlogPost = (slug: string) => {
    setCurrentPage('blog');
    setSelectedBlogPost(slug);
    setShowLanding(false);
  };

  // Show Payment Success Page
  if (showPaymentSuccess) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <PaymentSuccessPage
            onContinue={handlePaymentSuccessContinue}
            onRefreshEntitlements={refreshEntitlements}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show About Page
  if (currentPage === 'about') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AboutPage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Contact Page
  if (currentPage === 'contact') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ContactPage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Privacy Policy Page
  if (currentPage === 'privacy') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <PrivacyPolicyPage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Terms of Use Page
  if (currentPage === 'terms') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <TermsOfUsePage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Cookie Policy Page
  if (currentPage === 'cookies') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <CookiePolicyPage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show GDPR Compliance Page
  if (currentPage === 'gdpr') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <GDPRCompliancePage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show AI Ethical Policy Page
  if (currentPage === 'ai-ethics') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AIEthicalPolicyPage onBack={handleBackFromPage} onNavigate={handleNavigate} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Blog Post Page (individual post)
  if (currentPage === 'blog' && selectedBlogPost) {
    const post = getPostBySlug(selectedBlogPost);
    if (post) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <BlogPostPage
              post={post}
              onBack={handleBackFromPage}
              onBackToBlog={handleBackToBlog}
              onNavigate={handleNavigate}
              onSelectPost={handleSelectBlogPost}
            />
          </Suspense>
        </ErrorBoundary>
      );
    }
  }

  // Show Blog Page (listing)
  if (currentPage === 'blog') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <BlogPage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onSelectPost={handleSelectBlogPost}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show CV Analysis Feature Page
  if (currentPage === 'cv-analysis') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <CVAnalysisPage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onStartAnalysis={() => {
              setCurrentPage(null);
              setShowLanding(false);
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show CV Comparison Feature Page
  if (currentPage === 'cv-comparison') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <CVComparisonPage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onStartAnalysis={() => {
              setCurrentPage(null);
              setShowLanding(false);
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Eye-Tracking Feature Page
  if (currentPage === 'eye-tracking') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <EyeTrackingPage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onStartAnalysis={() => {
              setCurrentPage(null);
              setShowLanding(false);
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Capital Theory Feature Page
  if (currentPage === 'capital-theory') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <CapitalTheoryPage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onStartAnalysis={() => {
              setCurrentPage(null);
              setShowLanding(false);
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show ATS Score Feature Page
  if (currentPage === 'ats-score') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ATSScorePage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onStartAnalysis={() => {
              setCurrentPage(null);
              setShowLanding(false);
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Market Signaling Feature Page
  if (currentPage === 'market-signaling') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <MarketSignalingPage
            onBack={handleBackFromPage}
            onNavigate={handleNavigate}
            onStartAnalysis={() => {
              setCurrentPage(null);
              setShowLanding(false);
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Comparison Dashboard
  if (showComparison && comparisonResult && comparisonBaseAnalysis && comparisonCompareAnalysis) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ComparisonDashboard
            comparison={comparisonResult}
            baseAnalysis={comparisonBaseAnalysis}
            compareAnalysis={comparisonCompareAnalysis}
            onBack={handleBackFromComparison}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show Comparison Selector
  if (showComparisonSelector && currentUser) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ComparisonSelector
            userId={currentUser.id}
            onCompare={handleCompare}
            onCancel={handleCancelComparison}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // Show History Page
  if (showHistory && currentUser) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AnalysisHistory
            userId={currentUser.id}
            onBack={handleBackFromHistory}
            onViewAnalysis={handleViewAnalysis}
            onStartComparison={handleStartComparison}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (showLanding) {
    return (
      <>
        <Suspense fallback={<PageLoader />}>
          <LandingPage
            onStart={() => setShowLanding(false)}
            isAuthenticated={!!currentUser}
            userEmail={currentUser?.email ?? undefined}
            onLogin={handleLogin}
            onSignup={handleSignup}
            onLogout={handleLogout}
            authError={authError}
            authLoading={authLoading}
            onNavigate={handleNavigate}
            onSelectPlan={(planId) => handleSelectPlan(planId as PlanCode)}
          />
        </Suspense>

        {/* Embedded Checkout Modal - must be rendered on landing page too */}
        {checkoutData && (
          <EmbeddedCheckout
            isOpen={showEmbeddedCheckout}
            onClose={handleCheckoutClose}
            checkoutUrl={checkoutData.checkoutUrl}
            orderId={checkoutData.orderId}
            planName={checkoutData.planName}
            planCode={checkoutData.planCode}
            amount={checkoutData.amount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-slate-850 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowLanding(true)}
              className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white mr-1"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-indigo-500 p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CViviD</h1>
              <p className="text-xs text-slate-400 font-medium">5 types of capital & Visual Signal Extraction</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUser && (
              <>
                <button
                  onClick={handleViewHistory}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-xs font-medium transition-colors"
                  title="View past analyses"
                >
                  <History className="w-4 h-4" />
                  History
                </button>
                <div className="text-right mr-2">
                  <p className="text-xs text-slate-300 font-medium">
                    Signed in as
                  </p>
                  <p className="text-xs text-white truncate max-w-[180px]">
                    {currentUser.email}
                  </p>
                </div>
              </>
            )}
            <button
              onClick={currentUser ? handleLogout : () => setShowLanding(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-xs font-medium transition-colors"
            >
              {currentUser ? 'Sign out' : 'Sign in'}
            </button>
          </div>
          {result && (
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAnalyzing ? (
          <ErrorBoundary>
            <div className="animate-in fade-in duration-500">
              <UploadingSkeleton />
              <div className="mt-12">
                <AnalysisSkeleton />
              </div>
            </div>
          </ErrorBoundary>
        ) : analysisError ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <ErrorMessage message={analysisError} onRetry={handleReset} />
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
            >
              Try Another Resume
            </button>
          </div>
        ) : !result ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10 max-w-2xl">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
                Decode the Hidden Signals
              </h2>
              <p className="text-lg text-slate-500">
                Upload a CV to extract <span className="text-indigo-600 font-semibold">Capital Items</span>,
                analyze <span className="text-indigo-600 font-semibold">Visual Hierarchies</span>, and
                measure <span className="text-indigo-600 font-semibold">Market Signaling</span> strength.
              </p>
            </div>
            <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center opacity-70">
                <div className="flex flex-col items-center">
                    <Fingerprint className="w-8 h-8 text-slate-400 mb-3" />
                    <h4 className="font-semibold text-slate-700">Unique Identity</h4>
                    <p className="text-sm text-slate-500">Extracts tone & personal branding signals</p>
                </div>
                <div className="flex flex-col items-center">
                    <BarChart3 className="w-8 h-8 text-slate-400 mb-3" />
                    <h4 className="font-semibold text-slate-700">Capital Radar</h4>
                    <p className="text-sm text-slate-500">Maps Cultural, Social & Symbolic capital</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Eye className="w-8 h-8 text-slate-400 mb-3" />
                    <h4 className="font-semibold text-slate-700">Visual Saliency</h4>
                    <p className="text-sm text-slate-500">Predictive eye-tracking heatmaps</p>
                </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Sidebar / Resume Preview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center">
                       Source Document
                       <InfoButton slug="how-to-read-visual-analysis" onClick={handleOpenBlogPost} />
                     </h3>
                     <div className="flex gap-2">
                         <button 
                            onClick={() => setShowSkills(!showSkills)}
                            className={`text-xs flex items-center px-2 py-1 rounded transition-colors ${showSkills ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                            title="Toggle Skills Layer"
                         >
                            <Layers className="w-3 h-3 mr-1" />
                            Layer
                         </button>
                         <button 
                            onClick={() => setShowSaliency(!showSaliency)}
                            className={`text-xs flex items-center px-2 py-1 rounded transition-colors ${showSaliency ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}
                            title="Toggle Saliency Map"
                         >
                            {showSaliency ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                            {showSaliency ? 'Saliency' : 'Saliency'}
                         </button>
                     </div>
                </div>
                
                {imagePreview && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-100 shadow-inner group bg-slate-100">
                     <div
                       className="relative cursor-zoom-in"
                       onClick={() => setShowImageLightbox(true)}
                       title="Click to enlarge"
                     >
                       <img
                          ref={imageRef}
                          src={
                            // Use cached layer images if available, otherwise use base imagePreview
                            cachedLayerUrls
                              ? (showSaliency && showSkills && cachedLayerUrls.heatmap_skills)
                                || (showSaliency && !showSkills && cachedLayerUrls.heatmap)
                                || (!showSaliency && showSkills && cachedLayerUrls.skills)
                                || cachedLayerUrls.raw
                                || imagePreview
                              : imagePreview
                          }
                          onLoad={handleImageLoad}
                          alt="Resume Preview"
                          className="w-full h-auto block"
                       />
                       {/* Zoom indicator on hover */}
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                         <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                           <ZoomIn className="w-5 h-5 text-slate-700" />
                         </div>
                       </div>
                     </div>

                     {/* Only render on-the-fly overlays when no cached layers (i.e., fresh analysis) */}
                     {!cachedLayerUrls && showSkills && result.skillHighlights && result.skillHighlights.length > 0 && (
                        <SkillsOverlay highlights={result.skillHighlights} />
                     )}

                     {!cachedLayerUrls && showSaliency && result.visualHotspots && result.visualHotspots.length > 0 && (
                         <SaliencyHeatmap
                            hotspots={result.visualHotspots}
                            width={imgDims.w}
                            height={imgDims.h}
                         />
                     )}

                     {showSaliency && (
                        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-xl z-30 animate-in fade-in duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-xs font-semibold flex items-center">
                                    <BrainCircuit className="w-3 h-3 mr-1 text-yellow-400" />
                                    MSI-Net Saliency Map
                                </span>
                                <span className="text-xs text-slate-400">AI Simulation</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gradient-to-r from-purple-900 via-purple-600 via-red-500 via-orange-400 to-yellow-200 opacity-90 border border-white/10"></div>
                            <div className="flex justify-between mt-1 text-[10px] text-slate-300 font-medium">
                                <span>Low Attention</span>
                                <span>High Fixation</span>
                            </div>
                        </div>
                     )}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                     {showSkills && (
                         <>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-indigo-600 opacity-50 rounded-sm mr-1"></div>
                                <span className="text-slate-600">Hard Skills</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-teal-400 opacity-50 rounded-sm mr-1"></div>
                                <span className="text-slate-600">Soft Skills</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-rose-500 opacity-50 rounded-sm mr-1"></div>
                                <span className="text-slate-600">Impact</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-slate-500 opacity-50 rounded-sm mr-1"></div>
                                <span className="text-slate-600">Education</span>
                            </div>
                         </>
                     )}
                </div>
              </div>

              {/* Key Metrics Summary */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex items-center">
                  Market Impact
                  <InfoButton slug="understanding-market-impact-scores" onClick={handleOpenBlogPost} />
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Overall Score</span>
                      <span className="text-sm font-bold text-indigo-600">{result.overallScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${result.overallScore}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Market Signaling</span>
                      <span className="text-sm font-bold text-emerald-600">{result.marketSignalingScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${result.marketSignalingScore}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Based on brand prestige, rarity & gitHub strength</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">ATS Friendliness</span>
                      <span className="text-sm font-bold text-blue-600">{result.atsFriendlinessIndex}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${result.atsFriendlinessIndex}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Meter */}
              {currentUser && entitlements && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <UsageSummary
                    analysesUsed={entitlements.usage.analyses_used}
                    analysesLimit={entitlements.limits.analyses_per_month}
                    comparisonsUsed={entitlements.usage.comparisons_used}
                    comparisonsLimit={entitlements.limits.comparisons_per_month}
                    isUnlimitedComparisons={entitlements.limits.unlimited_comparisons}
                    planName={entitlements.plan.name}
                  />
                </div>
              )}
            </div>

            {/* Main Dashboard */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Visual Analysis Row */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-indigo-500" />
                    Visual Layout Engine
                    <InfoButton slug="understanding-layout-engine-scores" onClick={handleOpenBlogPost} />
                </h3>
                <VisualMetrics data={result.visualAnalysis} />
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Capital Radar */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <CapitalRadar data={result.capitalDistribution} onInfoClick={() => handleOpenBlogPost('understanding-forms-of-capital')} />
                </section>

                {/* Tone Analysis */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <ToneAnalysis data={result.toneProfile} onInfoClick={() => handleOpenBlogPost('understanding-tone-style-profile')} />
                </section>
              </div>

              {/* Capital Evidence - NEW SECTION */}
              <section className="bg-slate-50 rounded-xl">
                 <CapitalEvidence data={result.capitalEvidence} onInfoClick={() => handleOpenBlogPost('understanding-forms-of-capital')} />
              </section>

              {/* Semantic Distribution */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <SkillCompositionBar data={result.skillComposition} onInfoClick={() => handleOpenBlogPost('understanding-skills-distribution')} />
              </section>

              {/* Insights & Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-emerald-500" />
                        Top Detected Skills
                        <InfoButton slug="understanding-skills-distribution" onClick={handleOpenBlogPost} />
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {result.topHardSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.topSoftSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100">
                                {skill}
                            </span>
                        ))}
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                        Strategic Insights
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <h4 className="flex items-center text-sm font-semibold text-emerald-600 mb-2">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Key Strengths
                            </h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                {result.keyStrengths.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="flex items-center text-sm font-semibold text-amber-600 mb-2">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Improvement Areas
                            </h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                {result.improvementAreas.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Image Lightbox Modal */}
      {showImageLightbox && imagePreview && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowImageLightbox(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowImageLightbox(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            title="Close (ESC)"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[95vw] max-h-[95vh] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                cachedLayerUrls
                  ? (showSaliency && showSkills && cachedLayerUrls.heatmap_skills)
                    || (showSaliency && !showSkills && cachedLayerUrls.heatmap)
                    || (!showSaliency && showSkills && cachedLayerUrls.skills)
                    || cachedLayerUrls.raw
                    || imagePreview
                  : imagePreview
              }
              alt="Resume Full View"
              className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Click anywhere or press ESC to close
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {entitlements && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          entitlements={entitlements}
          blockedAction={blockedAction}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {/* Embedded Checkout Modal */}
      {checkoutData && (
        <EmbeddedCheckout
          isOpen={showEmbeddedCheckout}
          onClose={handleCheckoutClose}
          checkoutUrl={checkoutData.checkoutUrl}
          orderId={checkoutData.orderId}
          planName={checkoutData.planName}
          planCode={checkoutData.planCode}
          amount={checkoutData.amount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </div>
  );
}