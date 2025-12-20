import React from 'react';
import { Eye, Layout, Type, Palette, Maximize } from 'lucide-react';
import { VisualAnalysis, ComparisonResult } from '../types';
import { DeltaIndicator } from './DeltaIndicator';

interface Props {
  baseData: VisualAnalysis;
  compareData: VisualAnalysis;
  deltas: ComparisonResult['visualAnalysis'];
}

export const ComparisonVisualMetrics: React.FC<Props> = ({ baseData, compareData, deltas }) => {
  const metrics = [
    {
      icon: <Eye className="w-5 h-5 text-purple-600" />,
      label: 'Visual Fixation',
      baseValue: baseData.fixationScore,
      compareValue: compareData.fixationScore,
      delta: deltas.fixationScore,
      color: 'bg-purple-50'
    },
    {
      icon: <Maximize className="w-5 h-5 text-blue-600" />,
      label: 'Whitespace',
      baseValue: baseData.whitespaceScore,
      compareValue: compareData.whitespaceScore,
      delta: deltas.whitespaceScore,
      color: 'bg-blue-50'
    },
    {
      icon: <Type className="w-5 h-5 text-indigo-600" />,
      label: 'Typography',
      baseValue: baseData.typographyScore,
      compareValue: compareData.typographyScore,
      delta: deltas.typographyScore,
      color: 'bg-indigo-50'
    },
    {
      icon: <Layout className="w-5 h-5 text-teal-600" />,
      label: 'Hierarchy',
      baseValue: baseData.hierarchyScore,
      compareValue: compareData.hierarchyScore,
      delta: deltas.hierarchyScore,
      color: 'bg-teal-50'
    },
    {
      icon: <Palette className="w-5 h-5 text-rose-600" />,
      label: 'Color Harmony',
      baseValue: baseData.colorHarmonyScore,
      compareValue: compareData.colorHarmonyScore,
      delta: deltas.colorHarmonyScore,
      color: 'bg-rose-50'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Visual Design Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`p-4 rounded-xl ${metric.color} border border-opacity-50 border-slate-200`}
          >
            <div className="flex items-center justify-center mb-2">{metric.icon}</div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg text-slate-400">{metric.baseValue}</span>
                <span className="text-slate-300">&rarr;</span>
                <span className="text-2xl font-bold text-slate-800">{metric.compareValue}</span>
              </div>
              <DeltaIndicator delta={metric.delta} size="sm" />
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide text-center mt-2">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
