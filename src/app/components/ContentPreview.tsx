"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { ContentType, TextFormData } from '../../types';
import { MediaPreview } from './MediaPreview';

interface ContentPreviewProps {
  contentType: ContentType;
  textData: TextFormData;
  mediaPreview: { [key: string]: string };
  onCopy: () => void;
  copied: boolean;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  contentType,
  textData,
  mediaPreview,
  onCopy,
  copied,
}) => {
  const commonMediaPreview = (fieldName: string) => {
    return mediaPreview[fieldName] && (
      <div className="mt-4">
        <MediaPreview
          fieldName={fieldName}
          preview={mediaPreview[fieldName]}
          onRemove={() => {}} // Preview-only, no remove functionality needed
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Content type specific previews */}
            {contentType === 'news' && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold">{textData.headline || 'Your Headline'}</h2>
                <p>According to {textData.source || '[Source]'}, {textData.summary || '[News Summary]'}</p>
                <p>{textData.commentary || '[Your Commentary]'}</p>
                <p>{textData.question || '[Engagement Question]'}</p>
                {commonMediaPreview('newsImage')}
            </div>
            )}
    
            {contentType === 'video' && (
              <div className="space-y-4">
                <p>{textData.context || '[Video Context]'}</p>
                {commonMediaPreview('videoContent')}
                {commonMediaPreview('screenshot')}
                <p>{textData.reaction || '[Your Reaction]'}</p>
                <p>{textData.cta || '[Call to Action]'}</p>
              </div>
            )}
    
            {contentType === 'howto' && (
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
            )}
    
            {contentType === 'tools' && (
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
            )}
    
            {contentType === 'industry' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{textData.headline || 'Your Industry News Headline'}</h2>
                <p>According to {textData.source || '[Source]'}, {textData.summary || '[Summary]'}</p>
                <p>{textData.insight || '[Your Insight]'}</p>
                {commonMediaPreview('dataVisual')}
              </div>
            )}

      </div>

      <div className="pt-4 border-t">
        <Button
          onClick={onCopy}
          variant="outline"
          className="w-full"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Content
            </>
          )}
        </Button>
      </div>
    </div>
  );
};