const express = require('express');
const router = express.Router();

// Mock database for requests
let requests = [];

// Get all requests
router.get('/', (req, res) => {
    res.json(requests);
});

// Create a request
router.post('/', (req, res) => {
    const newRequest = req.body;
    requests.push(newRequest);
    res.status(201).json(newRequest);
});

// Update a request
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedRequest = req.body;
    requests[id] = updatedRequest;
    res.json(updatedRequest);
});

// Delete a request
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    requests.splice(id, 1);
    res.status(204).send();
});

module.exports = router;