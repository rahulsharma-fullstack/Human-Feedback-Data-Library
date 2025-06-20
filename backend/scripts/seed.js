import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Dataset from '../models/Dataset.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/human_feedback_db';

// Sample users
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
      bio: 'System administrator for the Human Feedback Data Library platform.',
      researchInterests: ['Platform Management', 'Data Governance', 'AI Ethics'],
    },
  },
  {
    username: 'researcher1',
    email: 'researcher1@university.edu',
    password: 'Research123!',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    role: 'user',
    profile: {
      organization: 'Stanford University',
      bio: 'AI researcher focusing on human feedback systems and RLHF.',
      website: 'https://stanford.edu/~sjohnson',
      researchInterests: ['RLHF', 'AI Safety', 'Natural Language Processing'],
    },
  },
  {
    username: 'datascientist',
    email: 'data@company.com',
    password: 'DataSci123!',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'user',
    profile: {
      organization: 'TechCorp AI Labs',
      bio: 'Senior data scientist working on conversational AI systems.',
      researchInterests: ['Dialogue Systems', 'Machine Learning', 'Human-AI Interaction'],
    },
  },
  {
    username: 'linguist_expert',
    email: 'expert@linguistics.org',
    password: 'Linguist123!',
    firstName: 'Dr. Emily',
    lastName: 'Rodriguez',
    role: 'user',
    profile: {
      organization: 'International Linguistics Institute',
      bio: 'Computational linguist specializing in multilingual NLP and language evaluation.',
      website: 'https://linguistics.org/erodriguez',
      researchInterests: ['Multilingual NLP', 'Language Evaluation', 'Cross-cultural AI'],
    },
  },
  {
    username: 'ethicsresearcher',
    email: 'ethics@aiethics.org',
    password: 'Ethics123!',
    firstName: 'Dr. James',
    lastName: 'Williams',
    role: 'moderator',
    profile: {
      organization: 'AI Ethics Research Center',
      bio: 'Researcher focused on ethical AI development and bias detection.',
      researchInterests: ['AI Ethics', 'Bias Detection', 'Fairness in ML'],
    },
  },
];

// Sample datasets
const sampleDatasets = [
  {
    name: 'Customer Satisfaction Transcripts',
    description: 'A collection of anonymized customer service call transcripts focused on product feedback. Useful for sentiment analysis and NLP tasks. Contains various interaction types including complaints, compliments, and feature requests.',
    link: 'https://github.com/example/customer-satisfaction-dataset',
    tags: ['customer service', 'nlp', 'feedback', 'transcripts', 'sentiment analysis'],
    dataFormat: 'JSONL',
    language: 'English',
    dataSize: '25MB',
    numRows: 1500,
    fileType: '.jsonl',
    licensing: 'CC BY-NC-SA 4.0',
    categories: ['Customer Support', 'Sentiment Analysis'],
    originatingPlatform: 'Internal Call Center Logs',
    status: 'approved',
    downloads: 145,
    views: 892,
    isPublic: true,
    isFeatured: true,
  },
  {
    name: 'Multilingual Product Reviews',
    description: 'User reviews for e-commerce products in English, Spanish, and French. Contains star ratings and review text. Perfect for multilingual sentiment analysis and cross-cultural preference studies.',
    link: 'https://huggingface.co/datasets/multilingual-reviews',
    tags: ['e-commerce', 'reviews', 'multilingual', 'sentiment', 'product feedback'],
    dataFormat: 'CSV',
    language: 'Multiple',
    dataSize: '10MB',
    numRows: 10000,
    fileType: '.csv',
    licensing: 'Apache 2.0',
    categories: ['E-commerce', 'Product Development'],
    originatingPlatform: 'Public Review Websites Aggregator',
    status: 'approved',
    downloads: 298,
    views: 1245,
    isPublic: true,
    isFeatured: true,
  },
  {
    name: 'AI Model Safety Evaluations',
    description: 'Human evaluations of AI model responses for safety, helpfulness, and harmfulness. Critical for responsible AI development and model alignment research.',
    link: 'https://github.com/ai-safety/evaluation-dataset',
    tags: ['ai safety', 'ethics', 'llm', 'evaluation', 'responsible ai'],
    dataFormat: 'JSON',
    language: 'English',
    dataSize: '5MB',
    numRows: 500,
    fileType: '.json',
    licensing: 'MIT',
    categories: ['AI Ethics', 'Responsible AI'],
    originatingPlatform: 'Research Consortium X',
    status: 'approved',
    downloads: 187,
    views: 634,
    isPublic: true,
    isFeatured: false,
  },
  {
    name: 'German Dialogue Dataset for Chatbots',
    description: 'Conversational data in German, specifically designed for training and evaluating chatbot systems. Includes various dialogue scenarios from casual conversation to technical support.',
    link: 'https://data.german-ai.org/dialogue-dataset',
    tags: ['dialogue', 'chatbot', 'german', 'conversational ai'],
    dataFormat: 'Text',
    language: 'German',
    dataSize: '15MB',
    numRows: 3200,
    fileType: '.txt',
    licensing: 'Custom (Research Only)',
    categories: ['Conversational AI', 'Language Technology'],
    originatingPlatform: 'University Linguistics Project',
    status: 'approved',
    downloads: 67,
    views: 312,
    isPublic: true,
    isFeatured: false,
  },
  {
    name: 'Image Captioning Feedback',
    description: 'Human feedback on the quality and accuracy of AI-generated image captions. Includes ratings and corrections for improving vision-language models.',
    link: 'https://vision-datasets.org/caption-feedback',
    tags: ['image captioning', 'computer vision', 'feedback', 'ai quality'],
    dataFormat: 'CSV',
    language: 'English',
    dataSize: '8MB',
    numRows: 2500,
    fileType: '.csv',
    licensing: 'CC BY 4.0',
    categories: ['Computer Vision', 'AI Evaluation'],
    originatingPlatform: 'Crowdsourcing Platform Y',
    status: 'approved',
    downloads: 123,
    views: 456,
    isPublic: true,
    isFeatured: false,
  },
  {
    name: 'Medical AI Consultation Feedback',
    description: 'Healthcare professional evaluations of AI-generated medical advice and diagnostic suggestions. Critical for developing safe medical AI systems.',
    link: 'https://medical-ai-datasets.org/consultation-feedback',
    tags: ['medical ai', 'healthcare', 'professional feedback', 'safety'],
    dataFormat: 'JSONL',
    language: 'English',
    dataSize: '12MB',
    numRows: 800,
    fileType: '.jsonl',
    licensing: 'Custom (Research Only)',
    categories: ['Medical AI', 'Healthcare'],
    originatingPlatform: 'Medical AI Research Consortium',
    status: 'pending',
    downloads: 0,
    views: 23,
    isPublic: false,
    isFeatured: false,
  },
  {
    name: 'Code Generation Quality Assessment',
    description: 'Programmer evaluations of AI-generated code snippets across multiple programming languages. Includes correctness, efficiency, and style ratings.',
    link: 'https://code-eval.org/generation-quality',
    tags: ['code generation', 'programming', 'software development', 'ai evaluation'],
    dataFormat: 'JSON',
    language: 'English',
    dataSize: '18MB',
    numRows: 4500,
    fileType: '.json',
    licensing: 'MIT',
    categories: ['Software Development', 'Code Generation'],
    originatingPlatform: 'Developer Community Platform',
    status: 'under_review',
    downloads: 0,
    views: 89,
    isPublic: false,
    isFeatured: false,
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    console.log('🌱 Seeding users...');
    
    // Clear existing users
    await User.deleteMany({});
    
    const users = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
      console.log(`   ✓ Created user: ${userData.username} (${userData.role})`);
    }
    
    console.log(`✅ Successfully created ${users.length} users`);
    return users;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const seedDatasets = async (users) => {
  try {
    console.log('🌱 Seeding datasets...');
    
    // Clear existing datasets
    await Dataset.deleteMany({});
    
    const datasets = [];
    for (let i = 0; i < sampleDatasets.length; i++) {
      const datasetData = {
        ...sampleDatasets[i],
        submittedBy: users[i % users.length]._id, // Distribute datasets among users
      };
      
      // Add some ratings to approved datasets
      if (datasetData.status === 'approved') {
        datasetData.ratings = [
          {
            user: users[(i + 1) % users.length]._id,
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
            comment: 'Great dataset! Very useful for my research.',
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
          },
          {
            user: users[(i + 2) % users.length]._id,
            rating: Math.floor(Math.random() * 3) + 3, // 3, 4, or 5 stars
            comment: 'Well-structured and documented. Highly recommended.',
            createdAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000), // Random date in last 20 days
          },
        ];
      }
      
      const dataset = new Dataset(datasetData);
      await dataset.save();
      datasets.push(dataset);
      
      // Update user's submitted datasets
      await User.findByIdAndUpdate(
        datasetData.submittedBy,
        { $push: { submittedDatasets: dataset._id } }
      );
      
      console.log(`   ✓ Created dataset: ${datasetData.name} (${datasetData.status})`);
    }
    
    console.log(`✅ Successfully created ${datasets.length} datasets`);
    return datasets;
  } catch (error) {
    console.error('❌ Error seeding datasets:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting database seeding...');
    
    await connectDB();
    
    const users = await seedUsers();
    const datasets = await seedDatasets(users);
    
    console.log('\n📊 Seeding Summary:');
    console.log(`   Users created: ${users.length}`);
    console.log(`   Datasets created: ${datasets.length}`);
    console.log(`   Approved datasets: ${datasets.filter(d => d.status === 'approved').length}`);
    console.log(`   Pending datasets: ${datasets.filter(d => d.status === 'pending').length}`);
    console.log(`   Featured datasets: ${datasets.filter(d => d.isFeatured).length}`);
    
    console.log('\n👥 Sample Login Credentials:');
    console.log('   Admin: admin@example.com / Admin123!');
    console.log('   Researcher: researcher1@university.edu / Research123!');
    console.log('   Data Scientist: data@company.com / DataSci123!');
    console.log('   Moderator: ethics@aiethics.org / Ethics123!');
    
    console.log('\n✅ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📋 Database connection closed');
    process.exit(0);
  }
};

// Run seeding if this script is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase();
}

export default seedDatabase;
