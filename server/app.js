const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Replace 'yourdbname' with the name of your MongoDB database
const mongoURI = 'mongodb+srv://2220:0222@cluster0.wymfyno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

app.use('/api', authRoutes);

app.use(express.static('../client'));

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
