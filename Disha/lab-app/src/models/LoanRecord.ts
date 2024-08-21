import { Component } from "./Component";

export type LoanRecord={
    _id: string;
    status : 'LOANED'|'AVAILABLE';
    loanedDate: Date;
    dueDate:Date;
    returnedDate?:Date;
    patron:string;
    employeeOut:string;
    employeeIn?:string;
    item:Component;
    createdAt:Date;
    updatedAt:Date;
}