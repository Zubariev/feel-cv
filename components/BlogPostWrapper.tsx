import { useParams, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { getPostBySlug } from '../data/blogData';
import { SEOHead } from './SEOHead';
import { ErrorBoundary } from './ErrorBoundary';

const BlogPostPage = lazy(() => import('./BlogPostPage').then(m => ({ default: m.BlogPostPage })));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  </div>
);

interface BlogPostWrapperProps {
  onNavigate: (page: string) => void;
  onPricingClick: () => void;
}

export function BlogPostWrapper({ onNavigate, onPricingClick }: BlogPostWrapperProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    // Post not found, redirect to blog
    navigate('/blog');
    return null;
  }

  return (
    <ErrorBoundary>
      <SEOHead
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <Suspense fallback={<PageLoader />}>
        <BlogPostPage
          post={post}
          onBack={() => navigate('/')}
          onBackToBlog={() => navigate('/blog')}
          onNavigate={onNavigate as any}
          onSelectPost={(s: string) => navigate(`/blog/${s}`)}
          onPricingClick={onPricingClick}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
