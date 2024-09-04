import { Request, Response } from "express";
import { findAllUser, findUserById, removeUser, modifyUser } from "../services/UserService";
import { UserDoesNotExistError } from "../utils/ComponentsError";

async function getAllUser(req:Request, res:Response){
    try {
       let users = await findAllUser();
       res.status(200).json({
        message:"user retrieved successfully", users
       }) ;
    } catch (error:any) {

     res.status(500).json({
        message:"Unable to retrieve at this time", error: error.message
     })   
    }
}

async function getUserById(req:Request, res:Response){
    const userId= req.params.userId;
    try {
       let user= await findUserById(userId);
       res.status(200).json({
        message:"user found successfully", user
       }) ;
    } catch (error:any) {
      if(error instanceof UserDoesNotExistError){
         res.status(404).json({
            message: "user requested does nor exist"
         });
      }else{
         res.status(500).json({
            message:"could not find user", error: error.message
         }) 
      }
       
    }
}
async function updateUser(req:Request, res:Response){
    const user= req.body;
    try {
       let updateUser= await modifyUser(user);
       res.status(202).json({
        message:"user updated successfully", user:updateUser
       }) ;
    } catch (error:any) {
      if(error instanceof UserDoesNotExistError){
         res.status(404).json({
            message: "user requested does nor exist"
         });
      }else{
         res.status(500).json({
            message:"Unable to update user currently", error: error.message
         }) 
      }   
    }
}
async function deleteUser(req:Request, res:Response){
    let userId:string= req.params.userId;
    try {
       await removeUser(userId);
       res.status(202).json({
        message:"user deleted successfully"
       }) ;
    } catch (error:any) {
      if(error instanceof UserDoesNotExistError){
         res.status(404).json({
            message: "user requested does nor exist"
         });
      }else{
         res.status(500).json({
            message:"Unable to delete user at this time", error: error.message
         }) 
      } 
    }
}

export default {getAllUser, getUserById, deleteUser, updateUser}