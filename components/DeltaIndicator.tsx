import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricDelta } from '../types';

interface Props {
  delta: MetricDelta;
  showPercentage?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const DeltaIndicator: React.FC<Props> = ({
  delta,
  showPercentage = false,
  showValue = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xs gap-0.5',
    md: 'text-sm gap-1',
    lg: 'text-base gap-1.5'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const directionStyles = {
    improved: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      icon: TrendingUp
    },
    regressed: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: TrendingDown
    },
    neutral: {
      bg: 'bg-slate-50',
      text: 'text-slate-500',
      icon: Minus
    }
  };

  const style = directionStyles[delta.direction];
  const Icon = style.icon;

  const formatValue = () => {
    if (showPercentage) {
      const sign = delta.percentChange > 0 ? '+' : '';
      return `${sign}${delta.percentChange.toFixed(0)}%`;
    }
    const sign = delta.delta > 0 ? '+' : '';
    return `${sign}${delta.delta.toFixed(0)}`;
  };

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} px-1.5 py-0.5 rounded ${style.bg} ${style.text} font-medium`}
    >
      <Icon className={iconSizes[size]} />
      {showValue && <span>{formatValue()}</span>}
    </span>
  );
};
