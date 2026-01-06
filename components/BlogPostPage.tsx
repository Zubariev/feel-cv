import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  BookOpen,
  ChevronLeft,
  Share2,
  Linkedin,
  Twitter,
  Link as LinkIcon
} from 'lucide-react';
import { Footer } from './Footer';
import {
  BlogPost,
  categoryLabels,
  categoryColors,
  blogPosts
} from '../data/blogData';

interface Props {
  post: BlogPost;
  onBack: () => void;
  onBackToBlog: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onSelectPost: (slug: string) => void;
}

export const BlogPostPage: React.FC<Props> = ({
  post,
  onBack,
  onBackToBlog,
  onNavigate,
  onSelectPost
}) => {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = `https://cvsense.com/blog/${post.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(post.title);
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">CVSense Blog</h1>
                <p className="text-xs text-slate-400">Insights for job seekers</p>
              </div>
            </div>
          </div>
          <button
            onClick={onBackToBlog}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            All Articles
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Article Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-lg mx-auto px-6 sm:px-8 lg:px-12">
            {/* Breadcrumb */}
            <button
              onClick={onBackToBlog}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Blog
            </button>

            {/* Category */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category]} mb-4`}>
              {categoryLabels[post.category]}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-slate-300 text-sm rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="max-w-screen-lg mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <article className="flex-1 min-w-0">
                <div
                  className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-bold prose-headings:text-slate-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900
                    prose-ul:list-disc prose-ol:list-decimal
                    prose-li:text-slate-600 prose-li:marker:text-slate-400
                    prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-slate-700
                    prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-600 prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-slate-900 prose-pre:text-slate-100
                    prose-img:rounded-xl prose-img:shadow-lg
                    prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-slate-200"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Sidebar */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                  {/* Share Section */}
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share this article
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={handleShareLinkedIn}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006699] transition-colors"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleShareTwitter}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#0d8ecf] transition-colors"
                        title="Share on Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                          copied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                        title="Copy link"
                      >
                        <LinkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    {copied && (
                      <p className="text-emerald-600 text-sm mt-2 text-center">
                        Link copied!
                      </p>
                    )}
                  </div>

                  {/* CTA Section */}
                  <div className="bg-indigo-600 text-white rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2">Ready to optimize your CV?</h3>
                    <p className="text-indigo-100 text-sm mb-4">
                      Put these insights into practice with CVSense AI analysis.
                    </p>
                    <button
                      onClick={onBack}
                      className="w-full px-4 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      Analyze Your CV
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <article
                    key={relatedPost.slug}
                    onClick={() => onSelectPost(relatedPost.slug)}
                    className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[relatedPost.category]} mb-3`}>
                      {categoryLabels[relatedPost.category]}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Want More Insights?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Explore more articles or start analyzing your CV with our AI-powered tool.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBackToBlog}
                className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Browse All Articles
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-colors border border-indigo-400"
              >
                Analyze Your CV
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
