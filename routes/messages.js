const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get all messages
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

// Get all messages by id_post
router.get("/:id", async (req, res) => {
    try {
        const messages = await Message.find({
            id_post: req.params.id
        });
        res.json(messages);
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

// Delete message by id
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

// Delete message by id_post
router.delete("/post/:id", async (req, res) => {
    try {
        const removeMessage = await Message.remove({
            id_post: req.params.id
        });
        res.json(removeMessage);
    } catch (e) {
        res.status(500).json({ message: "Error 500" })
    }
});

module.exports = router;