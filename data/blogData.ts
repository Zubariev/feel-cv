// Blog post type definition
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  image?: string;
  content: string; // HTML or markdown content
}

export type BlogCategory =
  | 'resume-optimization'
  | 'career-development'
  | 'hr-insights'
  | 'market-signaling'
  | 'product-updates';

export const categoryLabels: Record<BlogCategory, string> = {
  'resume-optimization': 'Resume Optimization',
  'career-development': 'Career Development',
  'hr-insights': 'HR Insights',
  'market-signaling': 'Market Signaling',
  'product-updates': 'Product Updates',
};

export const categoryColors: Record<BlogCategory, string> = {
  'resume-optimization': 'bg-blue-50 text-blue-700 border-blue-200',
  'career-development': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'hr-insights': 'bg-purple-50 text-purple-700 border-purple-200',
  'market-signaling': 'bg-amber-50 text-amber-700 border-amber-200',
  'product-updates': 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

// Blog posts array - posts will be added here
export const blogPosts: BlogPost[] = [
  // Posts will be added later
];

// Helper functions
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): BlogCategory[] => {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
