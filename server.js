const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  

const app = express();
const port = 3100;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_budget_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));  // Make sure your index.html is inside "public"

// Define the Budget Schema using Mongoose
const budgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  budget: { type: Number, required: true },
  color: { type: String, required: true, match: /^#[0-9A-F]{6}$/i }  // Enforce hexadecimal color
});

const Budget = mongoose.model('Budget', budgetSchema);

// Endpoint to fetch budget data
app.get('/budget', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);  // Send the array directly
  } catch (err) {
    res.status(500).send('Error retrieving budget data');
  }
});

// Endpoint to add new budget data
app.post('/budget', async (req, res) => {
  const { title, budget, color } = req.body;
  if (!title || !budget || !color) {
    return res.status(400).send('All fields are required');
  }
  try {
    const newBudget = new Budget({ title, budget, color });
    await newBudget.save();
    res.status(201).json({ success: true, data: newBudget});
  } catch (err) {
    res.status(500).send('Error adding budget data');
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
