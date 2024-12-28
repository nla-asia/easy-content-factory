"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { contentTypes } from '../../config/contentTypes';
import { FormFields } from './FormFields';
import { ContentPreview } from './ContentPreview';
import { ContentType, TextFormData, FileFormData } from '../../types';

const ContentFormatter: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>('');
  const [textData, setTextData] = useState<TextFormData>({});
  const [fileData, setFileData] = useState<FileFormData>({});
  const [activeTab, setActiveTab] = useState('edit');
  const [mediaPreview, setMediaPreview] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setTextData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFileData(prev => ({
      ...prev,
      [field]: file
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(prev => {
        const newPreview = { ...prev };
        delete newPreview[field];
        return newPreview;
      });
    }
  };

  const handleCopy = async () => {
    const content = getFormattedContent();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFormattedContent = (): string => {
    if (!contentType || !textData) return '';

    switch (contentType) {
      case 'news':
        return `${textData.headline || ''}

            According to ${textData.source || ''}, ${textData.summary || ''}

            ${textData.commentary || ''}

            ${textData.question || ''}

            ${mediaPreview['newsImage'] ? '[News Screenshot Attached]' : ''}`;

                case 'video':
                    return `${textData.context || ''}

            ${mediaPreview['videoContent'] ? '[Video Content Attached]' : ''}
            ${mediaPreview['screenshot'] ? '[Screenshot Attached]' : ''}

            Reaction: ${textData.reaction || ''}

            ${textData.cta || ''}`;

                case 'howto':
                    return `${textData.title || ''}

            ${textData.steps || ''}

            ${textData.closing || ''}

            ${mediaPreview['tutorialImages'] ? '[Tutorial Images Attached]' : ''}`;

                case 'tools':
                    return `${textData.title || ''}

            ${textData.tools || ''}

            ${textData.cta || ''}

            ${mediaPreview['toolScreenshots'] ? '[Tool Screenshots Attached]' : ''}`;

                case 'industry':
                    return `${textData.headline || ''}

            According to ${textData.source || ''}, ${textData.summary || ''}

            Our Insight: ${textData.insight || ''}

            ${mediaPreview['dataVisual'] ? '[Data Visualization/Graph Attached]' : ''}`;

      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Content Formatter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="news">Real-Time News Post</SelectItem>
                <SelectItem value="video">Screenshot + Video Commentary</SelectItem>
                <SelectItem value="howto">How-To Post</SelectItem>
                <SelectItem value="tools">Top Tools List</SelectItem>
                <SelectItem value="industry">Industry News/Insights</SelectItem>
              </SelectContent>
            </Select>

            {contentType && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-4">
                  <FormFields
                    fields={contentTypes[contentType].fields}
                    textData={textData}
                    mediaPreview={mediaPreview}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                  />
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardContent className="pt-6">
                      <ContentPreview
                        contentType={contentType}
                        textData={textData}
                        mediaPreview={mediaPreview}
                        onCopy={handleCopy}
                        copied={copied}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {!contentType && (
              <div className="flex items-center gap-2 text-blue-500">
                <AlertCircle className="h-5 w-5" />
                <p>Select a content type to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentFormatter;