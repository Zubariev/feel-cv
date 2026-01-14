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

// Clean up blog content - remove article wrapper and first h1 (title is shown in header)
const cleanBlogContent = (content: string): string => {
  return content
    .replace(/<article[^>]*>/gi, '')
    .replace(/<\/article>/gi, '')
    .replace(/<h1[^>]*>.*?<\/h1>/i, '') // Remove first h1 only
    .trim();
};

export const BlogPostPage: React.FC<Props> = ({
  post,
  onBack,
  onBackToBlog,
  onNavigate,
  onSelectPost
}) => {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = `https://CViviD.com/blog/${post.slug}`;

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
                <h1 className="text-lg font-bold tracking-tight">CViviD Blog</h1>
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
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-20 lg:py-24">
          <div className="max-w-screen-lg mx-auto px-6 sm:px-8 lg:px-12">
            {/* Breadcrumb */}
            <button
              onClick={onBackToBlog}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Blog
            </button>

            {/* Category */}
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${categoryColors[post.category]} mb-6`}>
              {categoryLabels[post.category]}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl leading-relaxed">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-slate-300 text-sm font-medium rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-14 lg:py-16">
          <div className="max-w-screen-lg mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-14 lg:gap-16">
              {/* Main Content */}
              <article className="flex-1 min-w-0">
                <div
                  className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-extrabold prose-headings:text-slate-900 prose-headings:tracking-tight
                    prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mt-0 prose-h1:mb-8
                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-bold
                    prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:font-bold
                    prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[1.0625rem]
                    prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
                    prose-strong:text-slate-800 prose-strong:font-semibold
                    prose-ul:list-disc prose-ul:my-6 prose-ul:pl-6
                    prose-ol:list-decimal prose-ol:my-6 prose-ol:pl-6
                    prose-li:text-slate-600 prose-li:leading-[1.75] prose-li:mb-2.5 prose-li:marker:text-slate-400 prose-li:text-[1.0625rem]
                    prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:rounded-r-lg
                    prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-indigo-600 prose-code:font-medium prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:my-8
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-table:border-collapse prose-table:my-8 prose-table:w-full prose-table:rounded-lg prose-table:overflow-hidden
                    prose-th:bg-slate-100 prose-th:p-4 prose-th:text-left prose-th:font-semibold prose-th:text-slate-800 prose-th:text-sm prose-th:uppercase prose-th:tracking-wide
                    prose-td:p-4 prose-td:border-b prose-td:border-slate-100 prose-td:text-slate-600
                    prose-hr:my-12 prose-hr:border-slate-200"
                  dangerouslySetInnerHTML={{ __html: cleanBlogContent(post.content) }}
                />
              </article>

              {/* Sidebar */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Share Section */}
                  <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5 flex items-center gap-2">
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
                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg shadow-indigo-600/20">
                    <h3 className="text-lg font-bold mb-3 tracking-tight">Ready to optimize your CV?</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed mb-5">
                      Put these insights into practice with CViviD AI analysis.
                    </p>
                    <button
                      onClick={onBack}
                      className="w-full px-4 py-3.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-sm"
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
          <section className="py-16 lg:py-20 bg-slate-50/80">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-10 tracking-tight">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {relatedPosts.map(relatedPost => (
                  <article
                    key={relatedPost.slug}
                    onClick={() => onSelectPost(relatedPost.slug)}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 cursor-pointer"
                  >
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${categoryColors[relatedPost.category]} mb-4`}>
                      {categoryLabels[relatedPost.category]}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-snug">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-20 lg:py-24 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-5 tracking-tight">Want More Insights?</h2>
            <p className="text-lg lg:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore more articles or start analyzing your CV with our AI-powered tool.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBackToBlog}
                className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg shadow-indigo-900/20"
              >
                Browse All Articles
              </button>
              <button
                onClick={onBack}
                className="px-10 py-4 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-all duration-200 border border-indigo-400"
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
