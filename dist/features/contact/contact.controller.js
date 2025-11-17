"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const contactService = require("./contact.service");
const router = Router();
router.post("/", async (req, res) => {
    try {
        const message = await contactService.createMessage(req.body);
        res.status(201).json({
            success: true,
            data: message,
        });
    }
    catch (err) {
        console.error("Contact form error:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
module.exports = router;
//# sourceMappingURL=contact.controller.js.map