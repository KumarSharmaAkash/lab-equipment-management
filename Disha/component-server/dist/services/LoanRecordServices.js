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
exports.generateRecord = generateRecord;
exports.modifyRecord = modifyRecord;
exports.findAllRecords = findAllRecords;
exports.queryRecords = queryRecords;
const LoanRecordDaos_1 = __importDefault(require("../daos/LoanRecordDaos"));
const ComponentServices_1 = require("./ComponentServices");
function generateRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let createdRecord = new LoanRecordDaos_1.default(record);
            createdRecord = yield createdRecord.save();
            let component = yield (0, ComponentServices_1.findComponentById)(record.item);
            let records = component.records;
            records = [createdRecord, ...records];
            component.records = records;
            yield (0, ComponentServices_1.modifyComponent)(component);
            return createdRecord;
        }
        catch (error) {
            throw error;
        }
    });
}
function modifyRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updatedRecord = yield LoanRecordDaos_1.default.findOneAndUpdate({ _id: record._id }, record, { new: true });
            if (updatedRecord) {
                let component = yield (0, ComponentServices_1.findComponentById)(record.item);
                let records = component.records;
                records[0] = updatedRecord;
                component.records = records;
                yield (0, ComponentServices_1.modifyComponent)(component);
                return updatedRecord;
            }
            throw new Error('error');
        }
        catch (error) {
            throw error;
        }
    });
}
function findAllRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDaos_1.default.find();
        }
        catch (error) {
            throw error;
        }
    });
}
function queryRecords(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDaos_1.default.find({ [params.property]: params.value }).populate('item').sort('-loanedDate');
        }
        catch (error) {
            throw error;
        }
    });
}
