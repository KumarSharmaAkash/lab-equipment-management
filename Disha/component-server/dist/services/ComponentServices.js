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
exports.findAllComponents = findAllComponents;
exports.findComponentById = findComponentById;
exports.modifyComponent = modifyComponent;
exports.registerComponent = registerComponent;
exports.removeComponent = removeComponent;
exports.queryComponent = queryComponent;
exports.PaginateComponent = PaginateComponent;
const ComponentsDaos_1 = __importDefault(require("../daos/ComponentsDaos"));
function findAllComponents() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield ComponentsDaos_1.default.find();
    });
}
function findComponentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let component = yield ComponentsDaos_1.default.findById(id);
            if (component)
                return component;
            throw new Error("the component does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
function modifyComponent(component) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield ComponentsDaos_1.default.findOneAndUpdate({
                barcode: component.barcode
            }, component, { new: true });
            if (id)
                return component;
            throw new Error("Item Does not Exits");
        }
        catch (error) {
            throw error;
        }
    });
}
function registerComponent(component) {
    return __awaiter(this, void 0, void 0, function* () {
        const savedComponent = new ComponentsDaos_1.default(component);
        return yield savedComponent.save();
    });
}
function removeComponent(barcode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield ComponentsDaos_1.default.findOneAndUpdate({ barcode });
            if (id)
                return "SuccessFully deleted component";
            throw new Error(" component does not exits");
        }
        catch (error) {
            throw error;
        }
    });
}
function queryComponent(page, limit, title, barcode, description, value, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        let components = yield ComponentsDaos_1.default.find();
        let filteredComponent = [];
        components.forEach((component) => {
            if (barcode) {
                if (component.barcode.toLowerCase().includes(barcode.toLowerCase()) && !filteredComponent.some(b => b["barcode"] === component.barcode)) {
                    filteredComponent.push(component);
                }
            }
            if (title) {
                if (component.title.toLowerCase().includes(title.toLowerCase()) && !filteredComponent.some(b => b["barcode"] === component.barcode)) {
                    filteredComponent.push(component);
                }
            }
            if (description) {
                if (component.description.toLowerCase().includes(description.toLowerCase()) && !filteredComponent.some(b => b["barcode"] === component.barcode)) {
                    filteredComponent.push(component);
                }
            }
            if (value) {
                if (component.value.toLowerCase().includes(value.toLowerCase()) && !filteredComponent.some(b => b["barcode"] === component.barcode)) {
                    filteredComponent.push(component);
                }
            }
            if (genre) {
                if (component.genre.toLowerCase().includes(genre.toLowerCase()) && !filteredComponent.some(b => b["barcode"] === component.barcode)) {
                    filteredComponent.push(component);
                }
            }
        });
        return PaginateComponent(filteredComponent, page, limit);
    });
}
function PaginateComponent(components, page, limit) {
    let pageComponents = [];
    const pages = Math.ceil(components.length / Number(limit));
    if (Number(page) === pages) {
        const startPoint = (Number(page) - 1) * Number(limit);
        pageComponents = components.slice(startPoint);
    }
    else {
        const startPoint = (Number(page - 1)) * Number(limit);
        const endPoint = startPoint + Number(limit);
        pageComponents = components.slice(startPoint, endPoint);
    }
    const pageObject = {
        totalCount: components.length,
        currentPage: Number(page),
        totalPages: pages,
        limit: Number(limit),
        pageCount: pageComponents.length,
        items: pageComponents
    };
    return pageObject;
}
