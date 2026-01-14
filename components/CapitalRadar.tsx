import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Info } from 'lucide-react';
import { CapitalDistribution } from '../types';

interface Props {
  data: CapitalDistribution;
  onInfoClick?: () => void;
}

export const CapitalRadar: React.FC<Props> = ({ data, onInfoClick }) => {
  const chartData = [
    { subject: 'Material', A: data.material, fullMark: 100 },
    { subject: 'Social', A: data.social, fullMark: 100 },
    { subject: 'Cultural', A: data.cultural, fullMark: 100 },
    { subject: 'Symbolic', A: data.symbolic, fullMark: 100 },
    { subject: 'Technological', A: data.technological, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
        Forms of Capital (Bourdieu)
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
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Capital Score"
            dataKey="A"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#4f46e5' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
