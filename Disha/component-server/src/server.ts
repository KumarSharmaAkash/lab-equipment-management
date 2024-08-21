import express, { Express,Request,Response } from "express";
import cors from "cors";
import { config } from "./config/index";
import mongoose from "mongoose";
import { registerRoutes } from "./routes";
import bodyParser from 'body-parser';

const PORT =config.server.port;

const app:Express= express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async function startUp() {
   try {
        await mongoose.connect(config.mongo.url);
        console.log("Connection TO MongoDb successfully made");
        registerRoutes(app);
        app.listen(PORT,()=>{
            console.log(`server listening on port ${PORT}`);
        })
   } catch (error) {
     console.log("Connection To The DataBase Is Not Working");
     
   } 
})();


