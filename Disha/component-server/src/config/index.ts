import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME:string=process.env.MONGO_USERNAME||"";
const MONGO_PASSWORD:string=process.env.MONGO_PASSWORD||"";

const MONGO_URL:string=`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.gn0tcdx.mongodb.net`;
const PORT:number=process.env.SERVER_PORT?Number(process.env.SERVER_PORT):8000;
const ROUNDS:number=process.env.SERVER_ROUNDS?Number(process.env.SERVER_ROUNDS):Math.floor(Math.random()*11);
export const config ={
    mongo:{
        url: MONGO_URL
    },
    server:{
        port:PORT,
        rounds:ROUNDS
    }
}


