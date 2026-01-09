const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');


const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks);
});


const setTask = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
    });

    res.status(200).json(task);
});


const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTask);
});


const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await task.remove ? task.remove() : await Task.findByIdAndDelete(req.params.id); // Support both mongoose versions

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
};
