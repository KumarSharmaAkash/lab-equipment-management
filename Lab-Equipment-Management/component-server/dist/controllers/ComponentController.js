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
const ComponentServices_1 = require("../services/ComponentServices");
function getAllComponents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let components = yield (0, ComponentServices_1.findAllComponents)();
            res.status(200).json({
                message: "Retrieved all books", count: components.length, components
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Unable to retrieve components at this time"
            });
        }
    });
}
function CreateComponent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let component = req.body;
        try {
            console.log('Received Payload:', component);
            let savedComponent = yield (0, ComponentServices_1.registerComponent)(component);
            console.log(savedComponent);
            res.status(201).json({
                message: "Component created successfully", savedComponent
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Unable to save components at this time"
            });
        }
    });
}
function updateComponent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let component = req.body;
        try {
            let updateComponent = yield (0, ComponentServices_1.modifyComponent)(component);
            res.status(202).json({
                message: "Component updated successfully", updateComponent
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Unable to update components at this time"
            });
        }
    });
}
function deleteComponent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { barcode } = req.params;
        try {
            let message = yield (0, ComponentServices_1.removeComponent)(barcode);
            res.status(202).json({
                message
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Unable to delete components at this time"
            });
        }
    });
}
function SearchForComponentByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, barcode, description, value, genre, page = 1, limit = 10 } = req.query;
        const components = yield (0, ComponentServices_1.queryComponent)(Number(page), Number(limit), title, barcode, description, value, genre);
        res.status(200).json({ message: "Retrieved components from query", page: components });
    });
}
exports.default = { getAllComponents, CreateComponent, updateComponent, deleteComponent, SearchForComponentByQuery };
