import React, { useCallback } from 'react';
import { Upload, FileText, Loader2, FileType, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Magic bytes for file type verification
const MAGIC_BYTES = {
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
  png: [0x89, 0x50, 0x4E, 0x47], // .PNG
  jpeg: [0xFF, 0xD8, 0xFF], // JPEG/JPG
} as const;

/**
 * Verify file type by checking magic bytes
 */
const verifyMagicBytes = async (file: File): Promise<boolean> => {
  const buffer = await file.slice(0, 4).arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Check PDF
  if (file.type === 'application/pdf') {
    return MAGIC_BYTES.pdf.every((byte, i) => bytes[i] === byte);
  }

  // Check PNG
  if (file.type === 'image/png') {
    return MAGIC_BYTES.png.every((byte, i) => bytes[i] === byte);
  }

  // Check JPEG/JPG
  if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
    return MAGIC_BYTES.jpeg.every((byte, i) => bytes[i] === byte);
  }

  return false;
};

/**
 * Validate file size and type
 */
const validateFile = async (file: File): Promise<{ valid: boolean; error?: string }> => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
    };
  }

  // Check file type
  const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a PDF, PNG, or JPG file.'
    };
  }

  // Verify magic bytes
  const validMagicBytes = await verifyMagicBytes(file);
  if (!validMagicBytes) {
    return {
      valid: false,
      error: 'File appears to be corrupted or is not a valid PDF/PNG/JPG file.'
    };
  }

  return { valid: true };
};

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing }) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      const validation = await validateFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isAnalyzing) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        await handleFile(file);
      }
    },
    [handleFile, isAnalyzing]
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative w-full h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
          isAnalyzing
            ? 'border-blue-400 bg-blue-50 cursor-wait'
            : error
            ? 'border-red-300 bg-red-50 cursor-pointer'
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
          ) : error ? (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-lg font-semibold text-red-700 mb-2">Upload Failed</p>
              <p className="text-sm text-red-500 text-center px-4">{error}</p>
              <p className="text-xs text-slate-400 mt-4">Click or drop a file to try again</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-indigo-600" />
              </div>
              <p className="text-xl font-semibold text-slate-700 mb-2">Drop your resume here</p>
              <p className="text-sm text-slate-400">Supports PDF, PNG, JPG (max 10MB)</p>
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
    </div>
  );
};
