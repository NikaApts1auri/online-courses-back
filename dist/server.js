"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const connectToDB = require("./config/db.config");
const PORT = process.env.PORT || 3000;
let cachedDBConnection = null;
const startServer = async () => {
    try {
        if (!cachedDBConnection) {
            cachedDBConnection = await connectToDB();
            console.log("DB connected.");
        }
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map