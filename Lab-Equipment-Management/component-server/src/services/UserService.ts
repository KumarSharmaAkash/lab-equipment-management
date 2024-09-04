import bcrypt from "bcrypt";
import { config } from "../config";
import UserDaos,{IUserModel} from "../daos/UserDaos";
import { IUser } from "../models/User";
import { unableToSaveUserError ,InvalidUserNameOrPasswordError, UserDoesNotExistError  } from "../utils/ComponentsError";


export async function register(user:IUser):Promise<IUserModel>{
    const ROUND=config.server.rounds;

    try {
        const hashedPassword=await bcrypt.hash(user.password,ROUND);
        const saved=new UserDaos({...user,password:hashedPassword});

        return await saved.save();
    } catch (error:any) {
       throw new unableToSaveUserError(error.message);
    }
}

export async function login(credentials:{email:string,password:string}):Promise<IUserModel>{
    const {email,password}=credentials;

    try {
        const user= await UserDaos.findOne({email});
        if(!user){
            throw new InvalidUserNameOrPasswordError("invalid username or password");
        }else{
            const validPassword: boolean=await bcrypt.compare(password,user.password);
            if(validPassword){
                return user;
            }else{
                throw new InvalidUserNameOrPasswordError("invalid username or password");
            }
        }
    } catch (error:any ) {
        throw error;
    }
} 

export async function findAllUser():Promise<IUserModel[]>{
    try {
        const users=await UserDaos.find();
        return users;
    } catch (error) {
        return [];
    }
}

export async function findUserById(userId:string):Promise<IUserModel> {
   try {
    const user=await UserDaos.findById(userId);

    if(user) return user;

    throw new UserDoesNotExistError("User does not exist with this Id");
   } catch (error:any) {
        throw error;
   } 
}

export async function modifyUser(user:IUserModel):Promise<IUserModel> {
    try {
        let id =await UserDaos.findByIdAndUpdate(user._id,user,{new: true});
        if(!id) throw new UserDoesNotExistError("User does not exist with this Id");
        return user;
    } catch (error:any) {
        throw error;
    }
    
}
export async function removeUser(userId:string):Promise<string> {
    try {
       let deleted= await UserDaos.findByIdAndDelete(userId);
       if(!deleted) throw new UserDoesNotExistError("User does not exist with this Id");
        return "User deleted successsfully";
    } catch (error) {
        throw error;
    }
    
}