import React, { useState, useEffect, useRef } from 'react';
import { FileUpload } from './components/FileUpload';
import { CapitalRadar } from './components/CapitalRadar';
import { ToneAnalysis } from './components/ToneAnalysis';
import { SkillCompositionBar } from './components/SkillComposition';
import { VisualMetrics } from './components/VisualMetrics';
import { SaliencyHeatmap } from './components/SaliencyHeatmap';
import { CapitalEvidence } from './components/CapitalEvidence';
import { SkillsOverlay } from './components/SkillsOverlay';
import { LandingPage } from './components/LandingPage';
import { AnalysisHistory } from './components/AnalysisHistory';
import { ErrorBoundary, ErrorMessage } from './components/ErrorBoundary';
import { AnalysisSkeleton, UploadingSkeleton } from './components/LoadingSkeletons';
import { analyzeResume } from './services/geminiService';
import { convertPdfToImage } from './services/pdfService';
import { AnalysisResult } from './types';
import { supabase } from './services/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { databaseService } from './services/databaseService';
import { imageCacheService, computeBase64Hash } from './services/imageCacheService';
import { layerCaptureService } from './services/layerCaptureService';
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
  History
} from 'lucide-react';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSaliency, setShowSaliency] = useState(true);
  const [showSkills, setShowSkills] = useState(false);
  const [_authSession, setAuthSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [_lastSavedAnalysisId, setLastSavedAnalysisId] = useState<string | null>(null);
  
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

  const handleLogin = async (email: string, password: string) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
      }
    } catch (err: any) {
      console.error('Login error', err);
      setAuthError('Unexpected error during login. Please try again.');
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
      } else {
        setAuthError('Check your email to confirm your account before signing in.');
      }
    } catch (err: any) {
      console.error('Signup error', err);
      setAuthError('Unexpected error during signup. Please try again.');
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

      // Persist analysis and generate image layers if user is authenticated
      if (currentUser?.id) {
        try {
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
  };

  const handleViewHistory = () => {
    setShowHistory(true);
    setShowLanding(false);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
  };

  const handleViewAnalysis = (_analysisId: string) => {
    // TODO: Implement viewing a specific past analysis
    // For now, just go back to the main view
    setShowHistory(false);
  };

  // Show History Page
  if (showHistory && currentUser) {
    return (
      <ErrorBoundary>
        <AnalysisHistory
          userId={currentUser.id}
          onBack={handleBackFromHistory}
          onViewAnalysis={handleViewAnalysis}
        />
      </ErrorBoundary>
    );
  }

  if (showLanding) {
    return (
      <LandingPage
        onStart={() => setShowLanding(false)}
        isAuthenticated={!!currentUser}
        userEmail={currentUser?.email ?? undefined}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
        authError={authError}
        authLoading={authLoading}
      />
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
              <h1 className="text-xl font-bold tracking-tight">CVSense</h1>
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
                     <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Source Document</h3>
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
                     <img 
                        ref={imageRef}
                        src={imagePreview} 
                        onLoad={handleImageLoad}
                        alt="Resume Preview" 
                        className="w-full h-auto block" 
                     />
                     
                     {showSkills && result.skillHighlights && (
                        <SkillsOverlay highlights={result.skillHighlights} />
                     )}

                     {showSaliency && result.visualHotspots && (
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
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Market Impact</h3>
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
            </div>

            {/* Main Dashboard */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Visual Analysis Row */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-indigo-500" />
                    Visual Layout Engine
                </h3>
                <VisualMetrics data={result.visualAnalysis} />
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Capital Radar */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <CapitalRadar data={result.capitalDistribution} />
                </section>

                {/* Tone Analysis */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <ToneAnalysis data={result.toneProfile} />
                </section>
              </div>

              {/* Capital Evidence - NEW SECTION */}
              <section className="bg-slate-50 rounded-xl">
                 <CapitalEvidence data={result.capitalEvidence} />
              </section>

              {/* Semantic Distribution */}
              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <SkillCompositionBar data={result.skillComposition} />
              </section>

              {/* Insights & Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-emerald-500" />
                        Top Detected Skills
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
    </div>
  );
}