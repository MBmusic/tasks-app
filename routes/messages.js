const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get all messages
router.get("/:id", async (req, res) => {
    try {
        const tasks = await Message.find({
            id_post: req.params.id
        });
        res.json(tasks);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

// Submit message
router.post("/", async (req, res) => {
    try {
        const message = new Message({
            id_post: req.body.id_post,
            author: req.body.author,
            message: req.body.message
        });

        const savedMessage = await message.save();
        res.json(savedMessage);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

// Delete message
router.delete("/:id", async (req, res) => {
    try {
        const removeMessage = await Message.remove({
            _id: req.params.id
        });
        res.json(removeMessage);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

module.exports = router;