import React from 'react';
import { VisualAnalysis } from '../types';
import { Eye, Layout, Type, Palette, Maximize } from 'lucide-react';

interface Props {
  data: VisualAnalysis;
}

export const VisualMetrics: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <MetricCard 
        icon={<Eye className="w-5 h-5 text-purple-600" />}
        label="Visual Fixation"
        value={data.fixationScore}
        color="bg-purple-50"
      />
      <MetricCard 
        icon={<Maximize className="w-5 h-5 text-blue-600" />}
        label="Whitespace"
        value={data.whitespaceScore}
        color="bg-blue-50"
      />
      <MetricCard 
        icon={<Type className="w-5 h-5 text-indigo-600" />}
        label="Typography"
        value={data.typographyScore}
        color="bg-indigo-50"
      />
      <MetricCard 
        icon={<Layout className="w-5 h-5 text-teal-600" />}
        label="Hierarchy"
        value={data.hierarchyScore}
        color="bg-teal-50"
      />
      <MetricCard 
        icon={<Palette className="w-5 h-5 text-rose-600" />}
        label="Color Harmony"
        value={data.colorHarmonyScore}
        color="bg-rose-50"
      />
    </div>
  );
};

const MetricCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <div className={`p-4 rounded-xl ${color} border border-opacity-50 border-slate-200 flex flex-col items-center justify-center text-center`}>
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</div>
  </div>
);
