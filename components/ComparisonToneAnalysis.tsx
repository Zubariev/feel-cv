import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ToneProfile, ComparisonResult } from '../types';
import { DeltaIndicator } from './DeltaIndicator';

interface Props {
  baseData: ToneProfile;
  compareData: ToneProfile;
  deltas: ComparisonResult['toneProfile'];
  baseLabel: string;
  compareLabel: string;
}

export const ComparisonToneAnalysis: React.FC<Props> = ({
  baseData,
  compareData,
  deltas,
  baseLabel,
  compareLabel
}) => {
  const chartData = [
    { name: 'Formal', base: baseData.formal, compare: compareData.formal, delta: deltas.formal },
    {
      name: 'Professional',
      base: baseData.professional,
      compare: compareData.professional,
      delta: deltas.professional
    },
    {
      name: 'Confident',
      base: baseData.confident,
      compare: compareData.confident,
      delta: deltas.confident
    },
    {
      name: 'Assertive',
      base: baseData.assertive,
      compare: compareData.assertive,
      delta: deltas.assertive
    },
    {
      name: 'Friendly',
      base: baseData.approachable,
      compare: compareData.approachable,
      delta: deltas.approachable
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Tone & Style Profile</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#64748b', fontSize: 12 }}
              width={70}
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number, name: string) => [value.toFixed(0), name]}
            />
            <Legend wrapperStyle={{ paddingTop: '8px' }} />
            <Bar
              dataKey="base"
              name={baseLabel}
              fill="#94a3b8"
              radius={[0, 4, 4, 0]}
              barSize={12}
            />
            <Bar
              dataKey="compare"
              name={compareLabel}
              fill="#6366f1"
              radius={[0, 4, 4, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Delta indicators below */}
      <div className="mt-4 flex flex-wrap gap-3">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">{item.name}:</span>
            <DeltaIndicator delta={item.delta} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};
