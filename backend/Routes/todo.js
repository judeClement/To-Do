const express = require('express');
const router = express.Router();
const Todo = require('../Models/Todo');

// Create a new todo
router.post('/', async (req, res) => {
    const newTodo = new Todo({
        description: req.body.description,
        status: req.body.status
    });
    try {
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const removedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.json(removedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
