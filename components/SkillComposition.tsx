import React from 'react';
import { SkillComposition } from '../types';

interface Props {
  data: SkillComposition;
}

export const SkillCompositionBar: React.FC<Props> = ({ data }) => {
  // Normalize just in case
  const total = data.hardSkills + data.softSkills + data.education + data.impact;
  const hard = (data.hardSkills / total) * 100;
  const soft = (data.softSkills / total) * 100;
  const edu = (data.education / total) * 100;
  const impact = (data.impact / total) * 100;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Semantic Content Distribution</h3>
      <div className="w-full h-6 flex rounded-full overflow-hidden bg-slate-100">
        <div style={{ width: `${hard}%` }} className="bg-indigo-500 h-full" title={`Hard Skills: ${Math.round(hard)}%`} />
        <div style={{ width: `${soft}%` }} className="bg-teal-400 h-full" title={`Soft Skills: ${Math.round(soft)}%`} />
        <div style={{ width: `${impact}%` }} className="bg-rose-400 h-full" title={`Impact/Achievements: ${Math.round(impact)}%`} />
        <div style={{ width: `${edu}%` }} className="bg-slate-300 h-full" title={`Education/Knowledge: ${Math.round(edu)}%`} />
      </div>
      
      <div className="flex flex-wrap gap-4 mt-3 text-sm">
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            <span className="text-slate-600">Hard Skills ({Math.round(hard)}%)</span>
        </div>
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
            <span className="text-slate-600">Soft Skills ({Math.round(soft)}%)</span>
        </div>
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-rose-400 mr-2"></div>
            <span className="text-slate-600">Impact ({Math.round(impact)}%)</span>
        </div>
        <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-slate-300 mr-2"></div>
            <span className="text-slate-600">Education ({Math.round(edu)}%)</span>
        </div>
      </div>
    </div>
  );
};
