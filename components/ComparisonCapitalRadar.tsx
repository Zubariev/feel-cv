import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { CapitalDistribution } from '../types';

interface Props {
  baseData: CapitalDistribution;
  compareData: CapitalDistribution;
  baseLabel: string;
  compareLabel: string;
}

export const ComparisonCapitalRadar: React.FC<Props> = ({
  baseData,
  compareData,
  baseLabel,
  compareLabel
}) => {
  const chartData = [
    {
      subject: 'Material',
      base: baseData.material,
      compare: compareData.material,
      fullMark: 100
    },
    {
      subject: 'Social',
      base: baseData.social,
      compare: compareData.social,
      fullMark: 100
    },
    {
      subject: 'Cultural',
      base: baseData.cultural,
      compare: compareData.cultural,
      fullMark: 100
    },
    {
      subject: 'Symbolic',
      base: baseData.symbolic,
      compare: compareData.symbolic,
      fullMark: 100
    },
    {
      subject: 'Technological',
      base: baseData.technological,
      compare: compareData.technological,
      fullMark: 100
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Forms of Capital (Bourdieu)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

            {/* Base Analysis - Gray dashed */}
            <Radar
              name={baseLabel}
              dataKey="base"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="#cbd5e1"
              fillOpacity={0.2}
            />

            {/* Compare Analysis - Indigo solid */}
            <Radar
              name={compareLabel}
              dataKey="compare"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="#6366f1"
              fillOpacity={0.3}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                border: '1px solid #e2e8f0'
              }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(0)}`,
                name
              ]}
            />
            <Legend
              wrapperStyle={{ paddingTop: '16px' }}
              iconType="line"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
