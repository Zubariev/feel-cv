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
import { CapitalDistribution } from '../types';

interface Props {
  data: CapitalDistribution;
}

export const CapitalRadar: React.FC<Props> = ({ data }) => {
  const chartData = [
    { subject: 'Material', A: data.material, fullMark: 100 },
    { subject: 'Social', A: data.social, fullMark: 100 },
    { subject: 'Cultural', A: data.cultural, fullMark: 100 },
    { subject: 'Symbolic', A: data.symbolic, fullMark: 100 },
    { subject: 'Technological', A: data.technological, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Forms of Capital (Bourdieu)</h3>
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
