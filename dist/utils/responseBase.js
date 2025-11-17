"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBase {
    success;
    message;
    data;
    error;
    constructor(success, message, data = null, error = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
    static success(data, message = "Success") {
        return new ResponseBase(true, message, data, null);
    }
    static fail(message = "Error", error = null) {
        return new ResponseBase(false, message, null, error);
    }
}
module.exports = ResponseBase;
//# sourceMappingURL=responseBase.js.map