require('dotenv').config();
console.log('Current Directory:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');
console.log('Full URL:', process.env.DATABASE_URL);
