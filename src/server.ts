// // import * as express from "express";
// import express from "express";
// import { Request, Response } from "express";
// const authRoutes = require('./routes/authRoutes');
// // import express from 'express';

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

import express from 'express';
import { AppDataSource } from './data-source';
import { port } from './config/Server-config';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { Request, Response } from "express";


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
//aktb el URL : /patient  3latoul
app.use("/",userRoutes);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    if (AppDataSource.isInitialized) {
      console.log('Connected to the database');
      app.get('/',(req:Request,res:Response)=>{
        res.send('Hello, express server');
      })
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};

startServer();