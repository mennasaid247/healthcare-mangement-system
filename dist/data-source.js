"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// Configures and initializes the TypeORM connection to a PostgreSQL database
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// import { User } from "./models/User" //importing the model
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "HealthConnect",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});
