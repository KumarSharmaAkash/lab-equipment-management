import Joi, { ObjectSchema } from "joi";

import { NextFunction, Response, Request } from "express";

import { IUser } from "../models/User";
import { IUserModel } from "../daos/UserDaos";
import { IComponents } from "../models/components";
import { IComponentModal } from "../daos/ComponentsDaos";
import { ILabCard } from "../models/LabCard";
import { ILoanRecord } from "../models/LoanRecord";
import { ILoanRecordModel } from "../daos/LoanRecordDaos";


export function ValidateSchema(schema: ObjectSchema, property: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            switch (property) {
                case 'query':
                    await schema.validateAsync(req.query);
                    break;

                case 'params':
                    await schema.validateAsync(req.params);
                    break;
                default:
                    await schema.validateAsync(req.body);
            }

            next();
        } catch (error) {
            return res.status(422).json({ message: "Object validation failed, please Include a valid object" });
        }
    }
}
export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required(),


        }),
        login: Joi.object<{ email: string, password: string }>({
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required(),

        }),
        userId: Joi.object<{ userId: string }>({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: Joi.object<IUserModel>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required(),


        })

    },
    component: {
        create: Joi.object<IComponents>({
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
            imageUrl: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.string().required(),
            genre: Joi.string().required(),

        }),
        update: Joi.object<IComponentModal>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
            imageUrl: Joi.string().required(),
            title: Joi.string().required(),
            value: Joi.string().required(),
            description: Joi.string().required(),
        }),
        delete: Joi.object<{ barcode: string }>({
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
        }),

    },
    Labcard:{
        create: Joi.object<ILabCard>({
            user:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get: Joi.object<{cardId:string}>({
            cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan:{

        create: Joi.object<ILoanRecord>({
            status:Joi.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            returnedDate: Joi.date(),
            patron:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()



        }),
        update: Joi.object<ILoanRecordModel>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status:Joi.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            returnedDate: Joi.date(),
            patron: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()

        }),
        query: Joi.object<{property: string, value:string |Date}>({
            property: Joi.string().valid('_id', "status","loanedDate","dueDate","patron","employeeOut","employeeIn","item").required(),
            value: Joi.alternatives().try(Joi.string(),Joi.date()).required()
        })
    }
}