import { ContentTypeConfig } from '../types';

export const contentTypes: Record<string, ContentTypeConfig> = {
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
