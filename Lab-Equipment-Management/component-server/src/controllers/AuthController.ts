import{Request,Response} from "express";
import { register , login } from "../services/UserService";
import { IUser } from "../models/User";
import { IUserModel } from "../daos/UserDaos";
import { InvalidUserNameOrPasswordError } from "../utils/ComponentsError";
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akkii1478@gmail.com',
      pass: 'xjra ufvr xtcx zazm'
    }
  });

async function handleRegister(req:Request,res:Response){
    const user:IUser=req.body;

    try{
        const registerUser=await register(user);

        res.status(201).json({
            message:"User  successfully created",
            user:{

                _id:registerUser._id,
                type:registerUser.type,
                firstName:registerUser.firstName,
                lastName:registerUser.lastName,
                email:registerUser.email

            }
        });
       
        const subject = 'Welcome to NITLabs!';
        const message = `Dear ${user.firstName},\n\nWelcome to NITLabs!\n\nThank you for registering at NITLabs. We are excited to have you on board. At NITLabs, we strive to provide a seamless experience that meets all your needs. we are here to support you every step of the way.\n\nIf you have any questions or need assistance, please don't hesitate to reach out to our support team.\n\nBest regards,\nThe NITLabs Team`;

        const mailOptions = {
            from: 'akkii1478@gmail.com',
            to: user.email,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email');
            }
            res.status(200).send('Registration email sent successfully');
        });

    }catch(error:any){
        if(error.message.includes("E11000 duplicate key error collection:")){
            res.status(409).json({message:"User with email already exists",error:error.message});
        }else{
            res.status(500).json({
                message:"unable to register user at this time",error:error.message
            });
        }
        
    }


}


async function handleLogin(req:Request,res:Response){
    const credentials =req.body;

    try{
        const loggedIn:IUserModel=await login(credentials);

        res.status(200).json({
            message:"User  successfully logged in",
            user:{

                _id:loggedIn._id,
                type:loggedIn.type,
                firstName:loggedIn.firstName,
                lastName:loggedIn.lastName,
                email:loggedIn.email

            }
        })
    }catch(error:any){
        if(error instanceof InvalidUserNameOrPasswordError){
        res.status(401).json({message:"unable to login user at this time",error:error.message});

        }else{
            res.status(500).json({message:"unable to login user at this time",error:error.message});

        }
    }


}



export default {handleRegister , handleLogin};