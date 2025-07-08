import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /auth/signup
router.post(
  '/signup',
  // 1. Validate input
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role').isIn(['owner', 'manager', 'viewer']).withMessage('Invalid role'),
  async (req, res) => {
    // 2. Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    try {
      // 3. Check if user already exists
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      // 4. Hash the password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // 5. Create the user
      const user = await User.create({ email, passwordHash, role });

      // 6. Return created user (toJSON removes passwordHash)
      return res.status(201).json(user);
    } catch (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /auth/login
router.post(
  '/login',
  // 1. Validate input
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required'),
  async (req, res) => {
    // 2. Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 3. Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 4. Compare password
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 5. Sign JWT
      const payload = { userId: user.id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '8h',
      });

      // 6. Return token and user info
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
