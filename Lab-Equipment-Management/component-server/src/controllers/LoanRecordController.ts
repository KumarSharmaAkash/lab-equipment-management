import { Request, Response } from "express";
import { findAllRecords, generateRecord, modifyRecord, queryRecords } from "../services/LoanRecordServices";

  

  async function createRecord(req:Request, res:Response){
    let record= req.body;
    

    try {
        let createdRecord= await generateRecord(record);
        console.log(createRecord);
        res.status(201).json({
            message:"New record genereted", record:createdRecord
        });
        
    } catch (error) {
        res.status(500).json({
            message:"somthing went wrong777", error
        }); 
    }
  }


  async function upadateRecord(req:Request, res:Response){
    let record=req.body;

    try {
        let upadatedRecord=await modifyRecord(record);
        res.status(201).json({
            message:"New record updated", record:upadatedRecord
        });
    } catch (error) {
        res.status(500).json({
            message:"somthing went wrong", error
        }); 
    }
  }


  async function getAllRecords(req:Request, res:Response){

    try {
        let records=await findAllRecords();
        res.status(200).json({
            message:"all records", records
        });
    } catch (error) {
        res.status(500).json({
            message:"somthing went wrong", error
        }); 
    }
  }

  async function getRecordsByPropery(req:Request, res:Response){
        let param=req.body;
    try {
        let records=await queryRecords(param);
        res.status(200).json({
            message:"all records from your query", records
        });
        console.log(records);
    } catch (error) {
        res.status(500).json({
            message:"somthing went wrong", error
        }); 
    }
  }

  export default{ createRecord, upadateRecord, getAllRecords,getRecordsByPropery};