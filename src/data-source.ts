// Configures and initializes the TypeORM connection to a PostgreSQL database
import "reflect-metadata"
import { DataSource } from "typeorm"
// import { User } from "./models/User" //importing the model

export const AppDataSource = new DataSource({
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
})
