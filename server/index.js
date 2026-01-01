const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <--- Make sure this is imported
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// --- THE FIX ---
// This line MUST be at the top, before any routes.
// Calling it with no arguments allows ALL connections.
app.use(cors()); 
// ----------------

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Real Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));