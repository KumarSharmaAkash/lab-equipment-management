"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const ComponentRoutes_1 = __importDefault(require("./ComponentRoutes"));
const LabcardRoutes_1 = __importDefault(require("./LabcardRoutes"));
const LoanRecordRoutes_1 = __importDefault(require("./LoanRecordRoutes"));
function registerRoutes(app) {
    app.use("/auth", AuthRoutes_1.default);
    app.use("/users", UserRoutes_1.default);
    app.use("/component", ComponentRoutes_1.default);
    app.use("/card", LabcardRoutes_1.default);
    app.use("/loan", LoanRecordRoutes_1.default);
}
