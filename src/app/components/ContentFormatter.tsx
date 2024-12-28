"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ContentType = 'news' | 'howto' | 'tools' | 'video' | 'industry' | '';

interface Field {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'file';
  placeholder?: string;
  accept?: string;
}

interface ContentTypeConfig {
  title: string;
  fields: Field[];
}

// interface FormData {
//   [key: string]: string | File | null;
// }

interface TextFormData {
    [key: string]: string;
}
  
interface FileFormData {
    [key: string]: File | null;
}

const ContentFormatter: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>('');
 // const [formData, setFormData] = useState<FormData>({});
  const [textData, setTextData] = useState<TextFormData>({});
  const [fileData, setFileData] = useState<FileFormData>({});
  const [activeTab, setActiveTab] = useState('edit');
  const [mediaPreview, setMediaPreview] = useState<{ [key: string]: string }>({});

  const contentTypes: Record<string, ContentTypeConfig> = {
    'news': {
      title: 'Real-Time News Post',
      fields: [
        { name: 'headline', label: 'Headline', type: 'input', placeholder: 'Breaking: AI Revolutionizes Content Creation!' },
        { name: 'source', label: 'Source', type: 'input', placeholder: 'TechCrunch' },
        { name: 'summary', label: 'News Summary', type: 'textarea', placeholder: 'Brief summary of the news...' },
        { name: 'commentary', label: 'Your Commentary', type: 'textarea', placeholder: 'Add your thoughts or analysis...' },
        { name: 'question', label: 'Engagement Question', type: 'input', placeholder: 'How do you see this impacting content creators?' },
        { name: 'newsImage', label: 'Screenshot of News Article', type: 'file', accept: 'image/*' }
      ]
    },
    'video': {
      title: 'Screenshot + Video Commentary',
      fields: [
        { name: 'context', label: 'Context', type: 'textarea', placeholder: "Here's my quick reaction to OpenAI's new GPT update!" },
        { name: 'videoContent', label: 'Video Content', type: 'file', accept: 'video/*' },
        { name: 'screenshot', label: 'Screenshot', type: 'file', accept: 'image/*' },
        { name: 'reaction', label: 'Your Reaction', type: 'textarea', placeholder: 'Share your thoughts on this development...' },
        { name: 'cta', label: 'Call to Action', type: 'input', placeholder: 'Share your thoughts in the comments!' }
      ]
    },
    'howto': {
      title: 'How-To Post',
      fields: [
        { name: 'title', label: 'Title', type: 'input', placeholder: 'How to Create AI-Powered Content in 5 Steps!' },
        { name: 'steps', label: 'Steps (One per line)', type: 'textarea', placeholder: '1. Choose your topic\n2. Create visuals\n3. Write content' },
        { name: 'closing', label: 'Closing Message', type: 'textarea', placeholder: 'Add a call to action or final thoughts...' },
        { name: 'tutorialImages', label: 'Tutorial Images', type: 'file', accept: 'image/*' }
      ]
    },
    'tools': {
      title: 'Top Tools List',
      fields: [
        { name: 'title', label: 'Title', type: 'input', placeholder: 'Top 5 AI Tools for Content Creation' },
        { name: 'tools', label: 'Tools (One per line)', type: 'textarea', placeholder: '1. Tool Name - Description\n2. Tool Name - Description' },
        { name: 'cta', label: 'Call to Action', type: 'input', placeholder: 'Which tool is your favorite? Let me know below!' },
        { name: 'toolScreenshots', label: 'Tool Screenshots', type: 'file', accept: 'image/*' }
      ]
    },
    'industry': {
      title: 'Industry News or Insights',
      fields: [
        { name: 'headline', label: 'Headline', type: 'input', placeholder: 'AI Market to Reach $300 Billion by 2030' },
        { name: 'source', label: 'Source', type: 'input', placeholder: 'Market Research Firm' },
        { name: 'summary', label: 'Summary', type: 'textarea', placeholder: 'According to [Source], the AI market is expected to grow...' },
        { name: 'insight', label: 'Your Insight', type: 'textarea', placeholder: 'This highlights the growing demand for...' },
        { name: 'dataVisual', label: 'Graph or Infographic', type: 'file', accept: 'image/*' }
      ]
    }
  };

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

  const renderMediaPreview = (fieldName: string) => {
    const preview = mediaPreview[fieldName];
    if (!preview) return null;

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
          onClick={() => handleFileChange(fieldName, null)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderPreview = () => {
    if (!contentType) return null;

    const commonMediaPreview = (fieldName: string) => {
      return mediaPreview[fieldName] && (
        <div className="mt-4">
          {renderMediaPreview(fieldName)}
        </div>
      );
    };

    switch (contentType) {
        case 'news':
          return (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{textData.headline || 'Your Headline'}</h2>
              <p>According to {textData.source || '[Source]'}, {textData.summary || '[News Summary]'}</p>
              <p>{textData.commentary || '[Your Commentary]'}</p>
              <p>{textData.question || '[Engagement Question]'}</p>
              {commonMediaPreview('newsImage')}
            </div>
          );
        case 'video':
          return (
            <div className="space-y-4">
              <p>{textData.context || '[Video Context]'}</p>
              {commonMediaPreview('videoContent')}
              {commonMediaPreview('screenshot')}
              <p>{textData.reaction || '[Your Reaction]'}</p>
              <p>{textData.cta || '[Call to Action]'}</p>
            </div>
          );
        case 'howto':
          return (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{textData.title || 'Your How-To Title'}</h2>
              <div className="space-y-2">
                {(textData.steps || '').split('\n').map((step, index) => (
                  <p key={index}>📍 {step}</p>
                ))}
              </div>
              <p>{textData.closing || '[Closing Message]'}</p>
              {commonMediaPreview('tutorialImages')}
            </div>
          );
        case 'tools':
          return (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{textData.title || 'Your Tools List'}</h2>
              <div className="space-y-2">
                {(textData.tools || '').split('\n').map((tool, index) => (
                  <p key={index}>🔧 {tool}</p>
                ))}
              </div>
              <p>{textData.cta || '[Call to Action]'}</p>
              {commonMediaPreview('toolScreenshots')}
            </div>
          );
        case 'industry':
          return (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{textData.headline || 'Your Industry News Headline'}</h2>
              <p>According to {textData.source || '[Source]'}, {textData.summary || '[Summary]'}</p>
              <p>{textData.insight || '[Your Insight]'}</p>
              {commonMediaPreview('dataVisual')}
            </div>
          );
        default:
          return null;
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
        <div className="grid gap-4">
          {contentTypes[contentType].fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {field.type === 'input' ? (
                <Input
                  placeholder={field.placeholder}
                  value={textData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                />
              ) : field.type === 'textarea' ? (
                <Textarea
                  placeholder={field.placeholder}
                  value={textData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept={field.accept}
                    onChange={(e) => handleFileChange(field.name, e.target.files?.[0] || null)}
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
                  {renderMediaPreview(field.name)}
                </div>
              )}
            </div>
          ))}
        </div>
      </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardContent className="pt-6">
                      {renderPreview()}
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