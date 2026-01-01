const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  console.log("🔔 Register route hit!"); // <--- ADD THIS LINE
  console.log("Data received:", req.body);

  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    });

    const savedUser = await newUser.save();
    
    // Create Token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    
    res.json({ token, user: { 
      id: savedUser._id, 
      name: savedUser.name, 
      email: savedUser.email, 
      avatarUrl: savedUser.avatarUrl 
    }});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    res.json({ token, user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      avatarUrl: user.avatarUrl,
      joinedDate: user.joinedDate
    }});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// THIS WAS LIKELY MISSING:
module.exports = router;