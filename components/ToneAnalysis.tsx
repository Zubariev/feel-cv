import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Info } from 'lucide-react';
import { ToneProfile } from '../types';

interface Props {
  data: ToneProfile;
  onInfoClick?: () => void;
}

export const ToneAnalysis: React.FC<Props> = ({ data, onInfoClick }) => {
  const chartData = [
    { name: 'Formal', value: data.formal, color: '#94a3b8' },
    { name: 'Professional', value: data.professional, color: '#3b82f6' },
    { name: 'Confident', value: data.confident, color: '#8b5cf6' },
    { name: 'Assertive', value: data.assertive, color: '#ec4899' },
    { name: 'Friendly', value: data.approachable, color: '#14b8a6' },
  ];

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
        Tone & Style Profile
        {onInfoClick && (
          <button
            onClick={onInfoClick}
            className="ml-2 p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Learn more about this analysis"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            width={80} 
          />
          <Tooltip 
             cursor={{fill: '#f1f5f9'}}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
