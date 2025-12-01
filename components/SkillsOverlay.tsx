import React from 'react';
import { SkillHighlight } from '../types';

interface Props {
  highlights: SkillHighlight[];
}

export const SkillsOverlay: React.FC<Props> = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  const getColorClass = (type: string) => {
    switch (type) {
      case 'hard':
        return 'bg-indigo-600';
      case 'soft':
        return 'bg-teal-400';
      case 'impact':
        return 'bg-rose-500';
      case 'education':
        return 'bg-slate-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getLabel = (type: string) => {
     switch (type) {
      case 'hard': return 'Hard Skill';
      case 'soft': return 'Soft Skill';
      case 'impact': return 'Impact/Metric';
      case 'education': return 'Education';
      default: return 'Signal';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {highlights.map((item, index) => {
        const bgColor = getColorClass(item.type);

        return (
          <div
            key={index}
            style={{
              top: `${item.ymin}%`,
              left: `${item.xmin}%`,
              width: `${item.xmax - item.xmin}%`,
              height: `${item.ymax - item.ymin}%`,
            }}
            className={`absolute ${bgColor} opacity-30 mix-blend-multiply rounded-sm transition-opacity duration-300`}
            title={`${item.name} (${getLabel(item.type)})`}
          >
          </div>
        );
      })}
    </div>
  );
};