"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { isValidObjectId } = require("mongoose");
module.exports = (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Wrong Id is provided" });
    }
    next();
};
//# sourceMappingURL=isValidMongoId.middleware.js.map