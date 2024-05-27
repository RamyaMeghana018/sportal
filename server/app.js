require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Use the environment variable for MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

app.use('/api', authRoutes);

app.use(express.static('/client'));

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send('<h1>Welcome to your dashboard!</h1>');
    } else {
        res.redirect('/');
    }
});

// Use a different port to avoid EADDRINUSE error
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
