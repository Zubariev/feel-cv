import React, { useCallback } from 'react';
import { Upload, FileText, Loader2, FileType } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isAnalyzing) return;
      
      const file = e.dataTransfer.files[0];
      if (file) {
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          onFileSelect(file);
        } else {
          alert('Please upload an image (PNG, JPG) or PDF file.');
        }
      }
    },
    [onFileSelect, isAnalyzing]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`relative w-full max-w-2xl mx-auto h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
        isAnalyzing
          ? 'border-blue-400 bg-blue-50 cursor-wait'
          : 'border-slate-300 hover:border-indigo-500 hover:bg-slate-50 cursor-pointer'
      }`}
    >
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleChange}
        disabled={isAnalyzing}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      
      <div className="flex flex-col items-center text-slate-500">
        {isAnalyzing ? (
          <>
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
            <p className="text-lg font-medium text-indigo-900">Analyzing Resume...</p>
            <p className="text-sm text-indigo-600 mt-2">Processing document & extracting signals</p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-indigo-600" />
            </div>
            <p className="text-xl font-semibold text-slate-700 mb-2">Drop your resume here</p>
            <p className="text-sm text-slate-400">Supports PDF, PNG, JPG</p>
            <div className="mt-8 flex gap-4">
                <span className="flex items-center text-xs bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500">
                    <FileText className="w-3 h-3 mr-1" />
                    Visual Analysis
                </span>
                <span className="flex items-center text-xs bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500">
                    <FileType className="w-3 h-3 mr-1" />
                    Capital Extraction
                </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
