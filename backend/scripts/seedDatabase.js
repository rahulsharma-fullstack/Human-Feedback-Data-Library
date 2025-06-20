import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Dataset from '../models/Dataset.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/human_feedback_db';

// Sample data
const sampleUsers = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    profile: {
      organization: 'Human Feedback Data Library',
      bio: 'Administrator of the Human Feedback Data Library platform.',
      researchInterests: ['AI Ethics', 'Data Management', 'Human-Computer Interaction'],
    },
  },
  {
    username: 'researcher1',
    email: 'researcher1@university.edu',
    password: 'Research123!',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'user',
    profile: {
      organization: 'University of AI Research',
      bio: 'PhD researcher focusing on human feedback in AI systems.',
      researchInterests: ['RLHF', 'AI Safety', 'Natural Language Processing'],
    },
  },
  {
    username: 'datascientist',
    email: 'data@company.com',
    password: 'DataSci123!',
    firstName: 'Bob',
    lastName: 'Smith',
    role: 'user',
    profile: {
      organization: 'TechCorp Inc.',
      bio: 'Data scientist working on machine learning model evaluation.',
      researchInterests: ['Model Evaluation', 'Bias Detection', 'Fairness'],
    },
  },
];

const sampleDatasets = [
  {
    name: 'Customer Service Dialogue Quality Assessment',
    description: 'A comprehensive dataset containing human evaluations of customer service conversations between agents and customers. Each dialogue is rated on helpfulness, politeness, and problem resolution effectiveness. This dataset is valuable for training customer service AI systems and understanding human preferences in customer support interactions.',
    link: 'https://github.com/example/customer-service-dataset',
    tags: ['customer service', 'dialogue', 'quality assessment', 'helpfulness', 'politeness'],
    dataFormat: 'Scored',
    language: 'English',
    dataSize: '50MB',
    numRows: 5000,
    fileType: '.jsonl',
    licensing: 'CC BY 4.0',
    categories: ['Customer Support', 'Dialogue Systems'],
    originatingPlatform: 'Customer Support Platform Analysis',
    status: 'approved',
    isPublic: true,
    isFeatured: true,
  },
  {
    name: 'Multilingual Text Summarization Preferences',
    description: 'Human preference data for text summarization in English, Spanish, and French. Contains original documents, multiple summary candidates, and human rankings based on accuracy, conciseness, and readability. Essential for training multilingual summarization models with human feedback.',
    link: 'https://huggingface.co/datasets/example/multilingual-summarization',
    tags: ['summarization', 'multilingual', 'preferences', 'ranking', 'nlp'],
    dataFormat: 'Multiple responses scored',
    language: 'Multiple',
    dataSize: '120MB',
    numRows: 8500,
    fileType: '.json',
    licensing: 'Apache 2.0',
    categories: ['Summarization', 'Multilingual NLP'],
    originatingPlatform: 'Research Collaboration Platform',
    status: 'approved',
    isPublic: true,
    isFeatured: true,
  },
  {
    name: 'AI Safety Evaluation Dataset',
    description: 'Critical dataset for evaluating AI safety measures. Contains scenarios with potential safety concerns and human expert evaluations on harmfulness, bias, and appropriateness of AI responses. Includes both explicit and subtle safety issues for comprehensive model evaluation.',
    link: 'https://safety-ai-research.org/datasets/safety-eval',
    tags: ['ai safety', 'ethics', 'harmfulness', 'bias', 'expert evaluation'],
    dataFormat: 'Classification',
    language: 'English',
    dataSize: '75MB',
    numRows: 3200,
    fileType: '.csv',
    licensing: 'Custom (Research Only)',
    categories: ['AI Safety', 'Ethics'],
    originatingPlatform: 'AI Safety Research Consortium',
    status: 'approved',
    isPublic: true,
    isFeatured: true,
  },
  {
    name: 'Code Quality Assessment Dataset',
    description: 'Programming code snippets evaluated by experienced developers for readability, efficiency, and correctness. Includes various programming languages and complexity levels. Useful for training code review AI systems and understanding human preferences in code quality.',
    link: 'https://github.com/codeeval/quality-assessment',
    tags: ['code quality', 'programming', 'readability', 'efficiency', 'developer feedback'],
    dataFormat: 'Scored',
    language: 'English',
    dataSize: '200MB',
    numRows: 15000,
    fileType: '.jsonl',
    licensing: 'MIT',
    categories: ['Software Development', 'Code Analysis'],
    originatingPlatform: 'Developer Community Platform',
    status: 'approved',
    isPublic: true,
  },
  {
    name: 'Medical Diagnosis Explanation Quality',
    description: 'Healthcare professionals\' evaluations of AI-generated medical diagnosis explanations. Rated on accuracy, clarity, and clinical usefulness. This dataset supports the development of more interpretable medical AI systems.',
    link: 'https://medical-ai.research/explanation-quality',
    tags: ['medical ai', 'diagnosis', 'explanation', 'healthcare', 'clinical'],
    dataFormat: 'Scored',
    language: 'English',
    dataSize: '30MB',
    numRows: 2100,
    fileType: '.csv',
    licensing: 'Custom (Research Only)',
    categories: ['Healthcare AI', 'Explainable AI'],
    originatingPlatform: 'Medical Research Institute',
    status: 'pending',
    isPublic: false,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Dataset.deleteMany({});

    // Create users
    console.log('Creating users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.username}`);
    }

    // Create datasets
    console.log('Creating datasets...');
    for (let i = 0; i < sampleDatasets.length; i++) {
      const datasetData = {
        ...sampleDatasets[i],
        submittedBy: createdUsers[i % createdUsers.length]._id,
      };

      const dataset = new Dataset(datasetData);
      await dataset.save();

      // Add dataset to user's submitted datasets
      await User.findByIdAndUpdate(
        dataset.submittedBy,
        { $push: { submittedDatasets: dataset._id } }
      );

      console.log(`Created dataset: ${dataset.name}`);
    }

    console.log('Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin / Admin123!');
    console.log('User 1: researcher1 / Research123!');
    console.log('User 2: datascientist / DataSci123!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
