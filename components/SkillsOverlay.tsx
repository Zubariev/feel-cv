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
        return 'bg-indigo-500'; // Tech/Hard
      case 'soft':
        return 'bg-teal-400'; // Human/Soft
      case 'impact':
        return 'bg-rose-500'; // Impact/Numbers
      case 'education':
        return 'bg-amber-400'; // Education/Gold
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

        // We use slightly larger dimensions than the exact bbox to create a nice highlighter effect
        const top = Math.max(0, item.ymin - 0.2);
        const left = Math.max(0, item.xmin - 0.2);
        const width = (item.xmax - item.xmin) + 0.4;
        const height = (item.ymax - item.ymin) + 0.4;

        return (
          <div
            key={index}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
            className={`absolute ${bgColor} opacity-30 mix-blend-multiply rounded-[1px] transition-opacity duration-300`}
            title={`${item.name} (${getLabel(item.type)})`}
          >
          </div>
        );
      })}
    </div>
  );
};
