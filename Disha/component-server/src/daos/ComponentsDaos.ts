import mongoose, {Schema, Document} from "mongoose";
import { IComponents } from "../models/components";
import { LoanRecordSchema } from "./LoanRecordDaos";


export interface IComponentModal extends IComponents, Document {};

const ComponentSchema = new Schema({
    barcode: {type:String,required:true, unique:true},
    imageUrl:{type:String, required:true},
    title:{type:String,required:true, unique:true},
    description:{type:String, required:true},
    value:{type:String, required:true},
    genre:{type:String, required:true},
    records:[LoanRecordSchema]

});

export default mongoose.model<IComponentModal>('components', ComponentSchema);