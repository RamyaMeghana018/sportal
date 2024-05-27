// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.json({ success: false, message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: 'Invalid username or password' });

        req.session.user = user;
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
