export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'User Guide & Help', path: '/guide' },
  { name: 'Datasets', path: '/datasets' },
  { name: 'Submit a Dataset', path: '/submit' },
  { name: 'Admin', path: '/login' },
];

export const MOCK_DATASETS = [
  {
    id: '1',
    name: 'Customer Satisfaction Transcripts',
    description: 'A collection of anonymized customer service call transcripts focused on product feedback. Useful for sentiment analysis and NLP tasks.',
    tags: ['customer service', 'NLP', 'feedback', 'transcripts', 'sentiment analysis'],
    dataFormat: 'JSONL',
    language: 'English',
    numRows: 1500,
    dataSize: '25MB',
    fileType: '.jsonl',
    datePosted: '2023-05-15',
    link: 'https://example.com/dataset1',
    categories: ['Customer Support', 'Sentiment Analysis'],
    licensing: 'CC BY-NC-SA 4.0',
    originatingPlatform: 'Internal Call Center Logs'
  },
  {
    id: '2',
    name: 'Multilingual Product Reviews',
    description: 'User reviews for e-commerce products in English, Spanish, and French. Contains star ratings and review text.',
    tags: ['e-commerce', 'reviews', 'multilingual', 'sentiment', 'product feedback'],
    dataFormat: 'CSV',
    language: 'Multiple',
    numRows: 10000,
    dataSize: '10MB',
    fileType: '.csv',
    datePosted: '2023-08-01',
    link: 'https://example.com/dataset2',
    categories: ['E-commerce', 'Product Development'],
    licensing: 'Apache 2.0',
    originatingPlatform: 'Public Review Websites Aggregator'
  },
  {
    id: '3',
    name: 'AI Model Safety Evaluations',
    description: 'Human evaluations of AI model responses for safety, helpfulness, and harmfulness. Critical for responsible AI development.',
    tags: ['AI safety', 'ethics', 'LLM', 'evaluation', 'responsible AI'],
    dataFormat: 'JSON',
    language: 'English',
    numRows: 500,
    dataSize: '5MB',
    fileType: '.json',
    datePosted: '2024-01-20',
    link: 'https://example.com/dataset3',
    categories: ['AI Ethics', 'Responsible AI'],
    licensing: 'MIT',
    originatingPlatform: 'Research Consortium X'
  },
  {
    id: '4',
    name: 'German Dialogue Dataset for Chatbots',
    description: 'Conversational data in German, specifically designed for training and evaluating chatbot systems. Includes various dialogue scenarios.',
    tags: ['dialogue', 'chatbot', 'German', 'conversational AI'],
    dataFormat: 'Text',
    language: 'German',
    dataSize: '15MB',
    fileType: '.txt',
    datePosted: '2023-11-10',
    link: 'https://example.com/dataset4',
    categories: ['Conversational AI', 'Language Technology'],
    licensing: 'Custom (Research Only)',
    originatingPlatform: 'University Linguistics Project'
  },
   {
    id: '5',
    name: 'Image Captioning Feedback',
    description: 'Human feedback on the quality and accuracy of AI-generated image captions. Includes ratings and corrections.',
    tags: ['image captioning', 'computer vision', 'feedback', 'AI quality'],
    dataFormat: 'CSV',
    language: 'English',
    numRows: 2500,
    dataSize: '8MB',
    fileType: '.csv',
    datePosted: '2024-02-28',
    link: 'https://example.com/dataset5',
    categories: ['Computer Vision', 'AI Evaluation'],
    licensing: 'CC BY 4.0',
    originatingPlatform: 'Crowdsourcing Platform Y'
  }
];

export const FILTER_OPTIONS = {
  languages: ['', 'English', 'Spanish', 'French', 'German', 'Multiple'],
  dataFormats: ['', 'JSONL', 'CSV', 'JSON', 'Text', 'XML'],
  fileTypes: ['', '.jsonl', '.csv', '.json', '.txt', '.zip'],
  licenses: ['', 'CC BY-NC-SA 4.0', 'Apache 2.0', 'MIT', 'GPLv3', 'CC BY 4.0', 'Custom (Research Only)'],
};
