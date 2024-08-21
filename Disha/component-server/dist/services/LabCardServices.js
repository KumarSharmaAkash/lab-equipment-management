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
exports.registerLabCard = registerLabCard;
exports.findLabCard = findLabCard;
const LabcardDaos_1 = __importDefault(require("../daos/LabcardDaos"));
function registerLabCard(card) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedCard = new LabcardDaos_1.default(card);
            return yield savedCard.save();
        }
        catch (error) {
            let c = yield LabcardDaos_1.default.findOne({ user: card.user }).populate('user');
            if (c)
                return c;
            throw error;
        }
    });
}
function findLabCard(labCardId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let card = yield LabcardDaos_1.default.findOne({ _id: labCardId }).populate('user');
            if (card)
                return card;
            throw new Error;
        }
        catch (error) {
            throw new Error("yaha hai error bhai ");
        }
    });
}
