import { Express,Request,Response } from "express";
import authRoutes from "./AuthRoutes";
import userRoutes from './UserRoutes';
import ComponentRouters from "./ComponentRoutes"
import LabCardRouters from "./LabcardRoutes";
import loanRouter from "./LoanRecordRoutes";




export function registerRoutes(app:Express){

    app.use("/auth",authRoutes);
    app.use("/users",userRoutes);
    app.use("/component", ComponentRouters);
    app.use("/card",LabCardRouters);
    app.use("/loan",loanRouter);


}