"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contact = require("./contact.model");
exports.createMessage = async (data) => {
    const newMessage = await Contact.create(data);
    return newMessage;
};
//# sourceMappingURL=contact.service.js.map