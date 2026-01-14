import React from 'react';
import { CapitalEvidence as CapitalEvidenceType } from '../types';
import { Coins, Users, GraduationCap, Crown, Cpu, Quote, Info } from 'lucide-react';

interface Props {
  data: CapitalEvidenceType;
  onInfoClick?: () => void;
}

export const CapitalEvidence: React.FC<Props> = ({ data, onInfoClick }) => {
  const categories = [
    { 
      key: 'cultural', 
      label: 'Cultural Capital', 
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />, 
      items: data.cultural,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    { 
      key: 'social', 
      label: 'Social Capital', 
      icon: <Users className="w-5 h-5 text-emerald-600" />, 
      items: data.social,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    { 
      key: 'symbolic', 
      label: 'Symbolic Capital', 
      icon: <Crown className="w-5 h-5 text-amber-600" />, 
      items: data.symbolic,
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    },
    { 
      key: 'technological', 
      label: 'Technological Capital', 
      icon: <Cpu className="w-5 h-5 text-purple-600" />, 
      items: data.technological,
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    { 
      key: 'material', 
      label: 'Material Capital', 
      icon: <Coins className="w-5 h-5 text-slate-600" />, 
      items: data.material,
      bg: 'bg-slate-50',
      border: 'border-slate-100'
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <Quote className="w-5 h-5 mr-2 text-indigo-500" />
        Forms of Capital Evidence
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className={`rounded-xl border ${cat.border} p-5 hover:shadow-md transition-shadow duration-200 bg-white`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${cat.bg}`}>
                {cat.icon}
              </div>
              <h4 className="font-semibold text-slate-700">{cat.label}</h4>
            </div>
            
            <div className="space-y-2">
              {cat.items && cat.items.length > 0 ? (
                cat.items.map((quote, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-slate-300 mt-1">“</span>
                    <p className="text-sm text-slate-600 italic leading-relaxed">
                      {quote}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic pl-4">No specific signal detected</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
