const express = require('express');
const mongoose = require('mongoose');
const User = require('./User'); // Import User model
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// GET endpoint to retrieve all users
app.get('/api/users', async (req, res) => {
    const users = await User.find(); // Retrieve users from MongoDB
    res.json(users);
});

// POST endpoint to add a new user
app.post('/api/users', async (req, res) => {
    const newUser = new User({ name: req.body.name });
    await newUser.save(); // Save the user to MongoDB
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
