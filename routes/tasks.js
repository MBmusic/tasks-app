const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

//Get task
router.get("/task/:id", async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id
        });
        res.json(task);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

// Submit task
router.post("/", async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title
        });

        const savedTask = await task.save();
        res.json(savedTask);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

// Delete task
router.delete("/:id", async (req, res) => {
    try {
        const removeTask = await Task.remove({
            _id: req.params.id
        });
        res.json(removeTask);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

// Update task
router.patch("/:id", async (req, res) => {
    try {
        const updateTask = await Task.updateOne({
            _id: req.params.id
        }, { 
            $set: {
                title: req.body.title
            }
        });
        res.json(updateTask);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

module.exports = router;