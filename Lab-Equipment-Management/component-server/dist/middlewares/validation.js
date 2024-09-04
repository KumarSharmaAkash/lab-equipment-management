"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
exports.ValidateSchema = ValidateSchema;
const joi_1 = __importDefault(require("joi"));
function ValidateSchema(schema, property) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            switch (property) {
                case 'query':
                    yield schema.validateAsync(req.query);
                    break;
                case 'params':
                    yield schema.validateAsync(req.params);
                    break;
                default:
                    yield schema.validateAsync(req.body);
            }
            next();
        }
        catch (error) {
            return res.status(422).json({ message: "Object validation failed, please Include a valid object" });
        }
    });
}
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            type: joi_1.default.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: joi_1.default.string().required(),
        }),
        login: joi_1.default.object({
            email: joi_1.default.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: joi_1.default.string().required(),
        }),
        userId: joi_1.default.object({
            userId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: joi_1.default.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: joi_1.default.string().required(),
        })
    },
    component: {
        create: joi_1.default.object({
            barcode: joi_1.default.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
            imageUrl: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            value: joi_1.default.string().required(),
            genre: joi_1.default.string().required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
            barcode: joi_1.default.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
            imageUrl: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            value: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
        }),
        delete: joi_1.default.object({
            barcode: joi_1.default.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
        }),
    },
    Labcard: {
        create: joi_1.default.object({
            user: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get: joi_1.default.object({
            cardId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan: {
        create: joi_1.default.object({
            status: joi_1.default.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date(),
            patron: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
            item: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status: joi_1.default.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date(),
            patron: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
            item: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        query: joi_1.default.object({
            property: joi_1.default.string().valid('_id', "status", "loanedDate", "dueDate", "patron", "employeeOut", "employeeIn", "item").required(),
            value: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.date()).required()
        })
    }
};
