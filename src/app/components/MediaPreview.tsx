"use client";

import React from 'react';
import { X } from 'lucide-react';

interface MediaPreviewProps {
  fieldName: string;
  preview: string;
  onRemove: (fieldName: string) => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ fieldName, preview, onRemove }) => {
  const isVideo = fieldName.toLowerCase().includes('video');
  
  return (
    <div className="relative inline-block">
      {isVideo ? (
        <video 
          src={preview} 
          controls 
          className="max-w-full h-auto max-h-48 rounded"
        />
      ) : (
        <img 
          src={preview} 
          alt="Preview" 
          className="max-w-full h-auto max-h-48 rounded"
        />
      )}
      <button
        onClick={() => onRemove(fieldName)}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};