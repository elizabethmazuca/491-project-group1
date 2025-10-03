#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Fullstack Next.js App...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local from env.example');
    console.log('⚠️  Please update .env.local with your database credentials\n');
  } else {
    console.log('❌ env.example file not found');
  }
} else {
  console.log('✅ .env.local already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  console.log('Run: npm install');
} else {
  console.log('✅ Dependencies already installed');
}

console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your PostgreSQL database URL');
console.log('2. Run: npm run db:generate');
console.log('3. Run: npm run db:push');
console.log('4. Run: npm run dev');
console.log('\n🎉 Your fullstack Next.js app is ready!');
console.log('Visit http://localhost:3000 to see your app');

