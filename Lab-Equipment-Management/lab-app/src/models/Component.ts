import { LoanRecord } from "./LoanRecord";
import { User } from "./User";

export type Component={
    _id: string;
    barcode: string;
    imageUrl:string;
    title: string;
    description:string;
    value:string;
    genre:string;
    records:LoanRecord[];
}
export interface ComponentPayload{
    barcode: string;
    imageUrl:string;
    title: string;
    description:string;
    value:string;
    genre:string;
}

export type CheckoutComponentPayload={
    component: Component;
    labCard:string;
    employee:User;
}

export type CheckInComponentPayload={
    component: Component;
    employee:User;
}