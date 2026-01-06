import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  Search,
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
  getAllCategories,
  searchPosts
} from '../data/blogData';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onSelectPost: (slug: string) => void;
}

export const BlogPage: React.FC<Props> = ({ onBack, onNavigate, onSelectPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

  const categories = useMemo(() => getAllCategories(), []);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
      if (selectedCategory !== 'all') {
        posts = posts.filter(post => post.category === selectedCategory);
      }
    }

    return posts;
  }, [searchQuery, selectedCategory]);

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
              <h1 className="text-lg font-bold tracking-tight">CVSense Blog</h1>
              <p className="text-xs text-slate-400">Insights for job seekers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-indigo-500 p-3 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">CVSense Blog</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Expert insights on resume optimization, career development, and the science behind successful job applications.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Filter by:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Posts
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  {blogPosts.length === 0 ? 'Coming Soon' : 'No posts found'}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  {blogPosts.length === 0
                    ? 'We\'re working on creating valuable content for you. Check back soon for expert insights on resume optimization and career development.'
                    : 'Try adjusting your search or filter to find what you\'re looking for.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-6 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your CV?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Put these insights into practice. Analyze your resume with CVSense and get personalized recommendations.
            </p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Analyze Your CV
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
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
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-slate-300" />
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Category badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category]} mb-3`}>
          {categoryLabels[post.category]}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read more link */}
        <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
          Read article
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </article>
  );
};
