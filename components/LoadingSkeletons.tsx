import React from 'react';

const shimmer = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]';

export const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`${shimmer} rounded ${className}`} />
);

export const AnalysisSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* Sidebar Skeleton */}
    <div className="lg:col-span-4 space-y-6">
      {/* Document Preview Skeleton */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <SkeletonBox className="h-4 w-32" />
          <div className="flex gap-2">
            <SkeletonBox className="h-6 w-16" />
            <SkeletonBox className="h-6 w-16" />
          </div>
        </div>
        <SkeletonBox className="w-full aspect-[8.5/11] rounded-lg" />
      </div>

      {/* Market Impact Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <SkeletonBox className="h-4 w-28 mb-6" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <SkeletonBox className="h-4 w-24" />
                <SkeletonBox className="h-4 w-12" />
              </div>
              <SkeletonBox className="h-2.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Main Dashboard Skeleton */}
    <div className="lg:col-span-8 space-y-6">
      {/* Visual Layout Engine */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <SkeletonBox className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="text-center">
              <SkeletonBox className="h-20 w-20 mx-auto rounded-full mb-2" />
              <SkeletonBox className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <SkeletonBox className="h-6 w-32 mb-4" />
          <SkeletonBox className="h-64 w-full rounded-lg" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <SkeletonBox className="h-6 w-32 mb-4" />
          <SkeletonBox className="h-64 w-full rounded-lg" />
        </div>
      </div>

      {/* Capital Evidence */}
      <div className="bg-slate-50 p-6 rounded-xl">
        <SkeletonBox className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-slate-100">
              <SkeletonBox className="h-5 w-24 mb-3" />
              <div className="space-y-2">
                <SkeletonBox className="h-3 w-full" />
                <SkeletonBox className="h-3 w-4/5" />
                <SkeletonBox className="h-3 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <SkeletonBox className="h-6 w-40 mb-4" />
        <SkeletonBox className="h-8 w-full rounded-full" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <SkeletonBox className="h-6 w-36 mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonBox key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <SkeletonBox className="h-6 w-36 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBox key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HistoryCardSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-start gap-4">
      <SkeletonBox className="w-20 h-28 rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <SkeletonBox className="h-5 w-48 mb-2" />
        <SkeletonBox className="h-4 w-32 mb-4" />
        <div className="flex gap-4">
          <SkeletonBox className="h-8 w-24" />
          <SkeletonBox className="h-8 w-24" />
          <SkeletonBox className="h-8 w-24" />
        </div>
      </div>
      <SkeletonBox className="h-10 w-24 rounded-lg" />
    </div>
  </div>
);

export const HistoryListSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <HistoryCardSkeleton key={i} />
    ))}
  </div>
);

export const UploadingSkeleton: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative w-24 h-24 mb-6">
      <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
      <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing your resume...</h3>
    <p className="text-slate-500 text-center max-w-md">
      Our AI is extracting capital signals, analyzing visual hierarchy, and generating saliency maps.
    </p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {['Extracting text', 'Visual analysis', 'Capital mapping', 'Signal scoring'].map((step, i) => (
        <span
          key={step}
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            i === 0
              ? 'bg-indigo-100 text-indigo-700 animate-pulse'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {step}
        </span>
      ))}
    </div>
  </div>
);
