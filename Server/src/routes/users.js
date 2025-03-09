import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, firstName, lastName, role } = req.body;
  try {
    const newUser = new User({ 
      username, 
      email, 
      password, 
      firstName, 
      lastName, 
      role 
    });
    await newUser.save();
    
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users (for testing purposes)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add test users (for testing purposes)
router.post('/add-test-users', async (req, res) => {
  try {
    await User.deleteMany({}); // Clear existing users
    
    const testUsers = [
      {
        username: 'instructor1',
        email: 'instructor@test.com',
        password: 'test123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'instructor'
      },
      {
        username: 'student1',
        email: 'student@test.com',
        password: 'test123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'student'
      }
    ];

    // Use create instead of insertMany to trigger the pre-save hook
    const users = await Promise.all(
      testUsers.map(user => User.create(user))
    );
    
    console.log('Test users created successfully');
    res.status(201).json(users);
  } catch (err) {
    console.error('Add test users error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
