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
const LabCardServices_1 = require("../services/LabCardServices");
function getLabCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId } = req.params;
        try {
            let LabCard = yield (0, LabCardServices_1.findLabCard)(cardId);
            res.status(200).json({
                message: "retrieved the users card", LabCard
            });
        }
        catch (error) {
            res.status(500).json({ message: "unable to retrieve the lab card" });
        }
    });
}
function createLabCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = req.body;
        try {
            let LabCard = yield (0, LabCardServices_1.registerLabCard)(card);
            res.status(201).json({
                message: "Generated lab card for usesr", LabCard
            });
        }
        catch (error) {
            res.status(500).json({ message: "unable to create lab card the user" });
        }
    });
}
exports.default = { getLabCard, createLabCard };
