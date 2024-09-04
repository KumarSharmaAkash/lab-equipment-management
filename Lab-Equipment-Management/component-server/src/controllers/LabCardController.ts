import { Request, Response } from "express";

import { findLabCard, registerLabCard } from "../services/LabCardServices";
import { ILabCard } from "../models/LabCard";

async function getLabCard(req:Request, res:Response){
    const {cardId}=req.params;

    try {
        let LabCard= await findLabCard(cardId);
        res.status(200).json({
            message: "retrieved the users card", LabCard
        });
        
    } catch (error) {
        res.status(500).json({message :"unable to retrieve the lab card"});
    }
}


async function createLabCard(req:Request, res:Response){
    const card:ILabCard=req.body;

    try {
        let LabCard= await registerLabCard(card);
        res.status(201).json({
            message: "Generated lab card for usesr", LabCard
        });
        

    } catch (error) {
        res.status(500).json({message :"unable to create lab card the user"});
    }
}

export default {getLabCard, createLabCard};