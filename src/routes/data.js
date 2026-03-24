const express = require('express');
const router = express.Router();

const items = [
    { id: 1, name: 'Project Alpha', status: 'active' },
    { id: 2, name: 'Project Beta', status: 'pending' },
];

router.get('/', (req, res) => res.json(items));

router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

module.exports = router;
