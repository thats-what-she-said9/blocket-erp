// backend/src/app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(express.json());

// 1. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// 2. Placeholder route to verify server
app.get('/health', (req, res) => {
  res.send({ status: 'OK' });
});

// Authentication routes
app.use('/auth', authRoutes);

// 3. Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
