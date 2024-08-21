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
Object.defineProperty(exports, "__esModule", { value: true });
const LoanRecordServices_1 = require("../services/LoanRecordServices");
function createRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let record = req.body;
        try {
            let createdRecord = yield (0, LoanRecordServices_1.generateRecord)(record);
            console.log(createRecord);
            res.status(201).json({
                message: "New record genereted", record: createdRecord
            });
        }
        catch (error) {
            res.status(500).json({
                message: "somthing went wrong777", error
            });
        }
    });
}
function upadateRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let record = req.body;
        try {
            let upadatedRecord = yield (0, LoanRecordServices_1.modifyRecord)(record);
            res.status(201).json({
                message: "New record updated", record: upadatedRecord
            });
        }
        catch (error) {
            res.status(500).json({
                message: "somthing went wrong", error
            });
        }
    });
}
function getAllRecords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let records = yield (0, LoanRecordServices_1.findAllRecords)();
            res.status(200).json({
                message: "all records", records
            });
        }
        catch (error) {
            res.status(500).json({
                message: "somthing went wrong", error
            });
        }
    });
}
function getRecordsByPropery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let param = req.body;
        try {
            let records = yield (0, LoanRecordServices_1.queryRecords)(param);
            res.status(200).json({
                message: "all records from your query", records
            });
            console.log(records);
        }
        catch (error) {
            res.status(500).json({
                message: "somthing went wrong", error
            });
        }
    });
}
exports.default = { createRecord, upadateRecord, getAllRecords, getRecordsByPropery };
