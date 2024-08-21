import { ILoanRecord } from "./LoanRecord";

export interface IComponents{
    barcode:string;
    imageUrl:string;
    title:string;
    description:string;
    value:string;
    genre:string;
    records:ILoanRecord[];
}