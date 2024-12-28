"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { MediaPreview } from './MediaPreview';
import { Field, TextFormData, FileFormData } from '../../types';

interface FormFieldsProps {
  fields: Field[];
  textData: TextFormData;
  mediaPreview: { [key: string]: string };
  onInputChange: (field: string, value: string) => void;
  onFileChange: (field: string, file: File | null) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  fields,
  textData,
  mediaPreview,
  onInputChange,
  onFileChange,
}) => {
  return (
    <div className="grid gap-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="text-sm font-medium">{field.label}</label>
          {field.type === 'input' ? (
            <Input
              placeholder={field.placeholder}
              value={textData[field.name] || ''}
              onChange={(e) => onInputChange(field.name, e.target.value)}
            />
          ) : field.type === 'textarea' ? (
            <Textarea
              placeholder={field.placeholder}
              value={textData[field.name] || ''}
              onChange={(e) => onInputChange(field.name, e.target.value)}
              rows={5}
            />
          ) : (
            <div className="space-y-2">
              <Input
                type="file"
                accept={field.accept}
                onChange={(e) => onFileChange(field.name, e.target.files?.[0] || null)}
                className="hidden"
                id={field.name}
              />
              <Button 
                type="button" 
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById(field.name)?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload {field.label}
              </Button>
              {mediaPreview[field.name] && (
                <MediaPreview
                  fieldName={field.name}
                  preview={mediaPreview[field.name]}
                  onRemove={() => onFileChange(field.name, null)}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};