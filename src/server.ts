import express from 'express';
import { AppDataSource } from './data-source';
import { port } from './config/Server-config';

const app = express();

  
(async () => {
   try{
    await AppDataSource.initialize();
    if (AppDataSource.isInitialized) {
      console.log('Connected to the database');
      app.get('/', (req, res) => {
        res.send('Hello, express server');
      });
      // app.use("/api", require("./routes"));   34an ynady kol el endpoints lma el server y4t8l
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    }

} 
    catch (error) {
    console.error( error);
    process.exit(1);
    }
})();