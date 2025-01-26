"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const Server_config_1 = require("./config/Server-config");
const app = (0, express_1.default)();
(async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        if (data_source_1.AppDataSource.isInitialized) {
            console.log('Connected to the database');
            app.get('/', (req, res) => {
                res.send('Hello, express server');
            });
            // app.use("/api", require("./routes"));   34an ynady kol el endpoints lma el server y4t8l
            app.listen(Server_config_1.port, () => {
                console.log(`Server is running at http://localhost:${Server_config_1.port}`);
            });
        }
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
