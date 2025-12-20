import React from 'react';
import { CheckCircle2, XCircle, MinusCircle, AlertTriangle, Plus, Minus } from 'lucide-react';
import { ComparisonResult } from '../types';

interface Props {
  strengthsAnalysis: ComparisonResult['strengthsAnalysis'];
  improvementsAnalysis: ComparisonResult['improvementsAnalysis'];
  skillsChanges: ComparisonResult['skillsChanges'];
}

export const StrengthsDelta: React.FC<Props> = ({
  strengthsAnalysis,
  improvementsAnalysis,
  skillsChanges
}) => {
  return (
    <div className="space-y-6">
      {/* Strengths Changes */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Strengths Evolution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* New Strengths */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-3">
              <Plus className="w-4 h-4 text-emerald-600" />
              <h4 className="font-semibold text-emerald-800">New Strengths</h4>
            </div>
            {strengthsAnalysis.added.length > 0 ? (
              <ul className="space-y-2">
                {strengthsAnalysis.added.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-emerald-600 opacity-70">No new strengths identified</p>
            )}
          </div>

          {/* Retained Strengths */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <MinusCircle className="w-4 h-4 text-slate-500" />
              <h4 className="font-semibold text-slate-700">Retained Strengths</h4>
            </div>
            {strengthsAnalysis.retained.length > 0 ? (
              <ul className="space-y-2">
                {strengthsAnalysis.retained.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 opacity-70">No matching strengths</p>
            )}
          </div>

          {/* Lost Strengths */}
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <Minus className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-red-800">Lost Strengths</h4>
            </div>
            {strengthsAnalysis.removed.length > 0 ? (
              <ul className="space-y-2">
                {strengthsAnalysis.removed.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                    <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-600 opacity-70">No strengths lost</p>
            )}
          </div>
        </div>
      </div>

      {/* Improvement Areas Changes */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Improvement Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Issues Resolved */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h4 className="font-semibold text-emerald-800">Issues Resolved</h4>
            </div>
            {improvementsAnalysis.resolved.length > 0 ? (
              <ul className="space-y-2">
                {improvementsAnalysis.resolved.map((issue, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-emerald-700 line-through opacity-75"
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-emerald-600 opacity-70">No issues resolved</p>
            )}
          </div>

          {/* Persistent Issues */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-amber-800">Persistent Issues</h4>
            </div>
            {improvementsAnalysis.persistent.length > 0 ? (
              <ul className="space-y-2">
                {improvementsAnalysis.persistent.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-amber-700">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-amber-600 opacity-70">No persistent issues</p>
            )}
          </div>

          {/* New Issues */}
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-red-800">New Issues</h4>
            </div>
            {improvementsAnalysis.new.length > 0 ? (
              <ul className="space-y-2">
                {improvementsAnalysis.new.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                    <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-600 opacity-70">No new issues</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Changes */}
      {(skillsChanges.hardSkillsAdded.length > 0 ||
        skillsChanges.hardSkillsRemoved.length > 0 ||
        skillsChanges.softSkillsAdded.length > 0 ||
        skillsChanges.softSkillsRemoved.length > 0) && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Skills Changes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hard Skills */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-700 mb-3">Hard Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skillsChanges.hardSkillsAdded.map((skill, idx) => (
                  <span
                    key={`add-${idx}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
                {skillsChanges.hardSkillsRemoved.map((skill, idx) => (
                  <span
                    key={`rem-${idx}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
                {skillsChanges.hardSkillsAdded.length === 0 &&
                  skillsChanges.hardSkillsRemoved.length === 0 && (
                    <span className="text-sm text-slate-400">No changes</span>
                  )}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-700 mb-3">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skillsChanges.softSkillsAdded.map((skill, idx) => (
                  <span
                    key={`add-${idx}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
                {skillsChanges.softSkillsRemoved.map((skill, idx) => (
                  <span
                    key={`rem-${idx}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
                {skillsChanges.softSkillsAdded.length === 0 &&
                  skillsChanges.softSkillsRemoved.length === 0 && (
                    <span className="text-sm text-slate-400">No changes</span>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
