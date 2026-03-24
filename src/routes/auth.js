const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'User exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash });
    res.json({ message: 'Registered' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ token });
});

module.exports = router;
