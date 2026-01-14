import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  BookOpen,
  ChevronRight,
  FileText
} from 'lucide-react';
import { Footer } from './Footer';
import {
  blogPosts,
  BlogPost,
  BlogCategory,
  categoryLabels,
  categoryColors,
  getAllCategories
} from '../data/blogData';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onSelectPost: (slug: string) => void;
  onPricingClick?: () => void;
}

export const BlogPage: React.FC<Props> = ({ onBack, onNavigate, onSelectPost, onPricingClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

  const categories = useMemo(() => getAllCategories(), []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">CVIVID Blog</h1>
              <p className="text-xs text-slate-400">Insights for job seekers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-20 lg:py-24">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-indigo-500/90 p-4 rounded-2xl shadow-lg shadow-indigo-500/20">
                <BookOpen className="w-9 h-9 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight">CVIVID Blog</h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Expert insights on resume optimization, career development, and the science behind successful job applications.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-slate-200 bg-slate-50/80">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-slate-500 tracking-wide uppercase">Filter:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                All Posts
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {filteredPosts.map(post => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    onClick={() => onSelectPost(post.slug)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {blogPosts.length === 0 ? 'Coming Soon' : 'No posts in this category'}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  {blogPosts.length === 0
                    ? 'We\'re working on creating valuable content for you. Check back soon for expert insights on resume optimization and career development.'
                    : 'Try selecting a different category to find articles.'}
                </p>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="mt-6 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    View All Posts
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-5 tracking-tight">Ready to Optimize Your CV?</h2>
            <p className="text-lg lg:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Put these insights into practice. Analyze your resume with CVIVID and get personalized recommendations.
            </p>
            <button
              onClick={onBack}
              className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg shadow-indigo-900/20 hover:shadow-xl"
            >
              Analyze Your CV
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} onPricingClick={onPricingClick} />
    </div>
  );
};

// Blog Post Card Component
interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 cursor-pointer"
    >
      {/* Image placeholder */}
      <div className="aspect-[16/10] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 relative overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-14 h-14 text-slate-300/80" />
          </div>
        )}
      </div>

      <div className="p-6 lg:p-7">
        {/* Category badge */}
        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${categoryColors[post.category]} mb-4`}>
          {categoryLabels[post.category]}
        </span>

        {/* Title */}
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-snug tracking-tight">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded-md border border-slate-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more link */}
        <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all duration-200">
          Read article
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </article>
  );
};
