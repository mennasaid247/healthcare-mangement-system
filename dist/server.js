"use strict";
// // import * as express from "express";
// import express from "express";
// import { Request, Response } from "express";
// const authRoutes = require('./routes/authRoutes');
// // import express from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { AppDataSource } from './data-source';
// import { port } from './config/Server-config';
// import express from 'express';
// import { AppDataSource } from './data-source';
// import { port } from './config/Server-config';
// import authRoutes from './routes/authRoutes';
// const app = express();
// // Middleware
// app.use(express.json());
// // Routes
// app.use("/api/auth", authRoutes);
// const startServer = async () => {
//   try {
//     await AppDataSource.initialize();
//     if (AppDataSource.isInitialized) {
//       console.log('Connected to the database');
//       app.listen(port, () => {
//         console.log(`Server is running at http://localhost:${port}`);
//       });
//     }
//   } catch (error) {
//     console.error('Error during Data Source initialization:', error);
//   }
// };
// startServer();
// // const app = express();
// // //middleware
// // app.use(express.json());
// // //routes
// // app.use("/api/auth", authRoutes); 
// // app.get("*", (req: Request, res: Response) => {
// //   res.status(505).json({ message: "Bad Request" });
// // });
// // AppDataSource.initialize()
// //   .then(async () => {
// //     app.listen(port, () => {
// //       console.log("Server is running on http://localhost:" + port);
// //     });
// //     console.log("Data Source has been initialized!");
// //   })
// //   .catch((error) => console.log(error));
//   //connect to the database and start the server
// // (async () => {
// //    try{
// //     await AppDataSource.initialize();
// //     if (AppDataSource.isInitialized) {
// //       console.log('Connected to the database');
// //       app.get('/', (req, res) => {
// //         res.send('Hello, express server');
// //       });
// //        //34an ynady kol el endpoints lma el server y4t8l
// //       app.listen(port, () => {
// //         console.log(`Server is running at http://localhost:${port}`);
// //       });
// //     }
// // } 
// //     catch (error) {
// //     console.error( error);
// //     process.exit(1);
// //     }
// // })();
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const Server_config_1 = require("./config/Server-config");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/auth", authRoutes_1.default);
//aktb el URL : /patient  3latoul
app.use("/", userRoutes_1.default);
const startServer = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        if (data_source_1.AppDataSource.isInitialized) {
            console.log('Connected to the database');
            app.get('/', (req, res) => {
                res.send('Hello, express server');
            });
            app.listen(Server_config_1.port, () => {
                console.log(`Server is running at http://localhost:${Server_config_1.port}`);
            });
        }
    }
    catch (error) {
        console.error('Error during Data Source initialization:', error);
    }
};
startServer();
