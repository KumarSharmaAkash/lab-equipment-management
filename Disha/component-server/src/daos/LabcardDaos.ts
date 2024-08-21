import  mongoose, {Document, Schema} from 'mongoose';

import {ILabCard} from '../models/LabCard';

export interface ILabCardModal extends ILabCard,Document{};

const LabCardSchema:Schema= new Schema({
    user:{type:Schema.Types.ObjectId, required:true,unique:true, ref:"User"}
});

export default mongoose.model<ILabCardModal>('LabCard',LabCardSchema);