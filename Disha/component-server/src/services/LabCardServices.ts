import LabcardDaos, {ILabCardModal} from "../daos/LabcardDaos";
import { ILabCard } from "../models/LabCard";


export async function registerLabCard(card:ILabCard):Promise<ILabCardModal>{
    try {
        const savedCard = new LabcardDaos(card);
        return await savedCard.save();
    } catch (error:any) {
        let c = await LabcardDaos.findOne({user:card.user}).populate('user');
        if(c) return c;
        throw error;
    }
}

export async function findLabCard(labCardId:string):Promise<ILabCardModal>{
    try {
        let card= await LabcardDaos.findOne({_id:labCardId}).populate('user');
        if(card) return card;

        throw new Error;
    } catch (error:any) {
        throw  new Error("yaha hai error bhai ");
    }
}