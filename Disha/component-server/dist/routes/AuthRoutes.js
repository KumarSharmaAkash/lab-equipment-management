"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.post("/register", (0, validation_1.ValidateSchema)(validation_1.Schemas.user.create, 'body'), AuthController_1.default.handleRegister);
router.post("/login", (0, validation_1.ValidateSchema)(validation_1.Schemas.user.login, 'body'), AuthController_1.default.handleLogin);
module.exports = router;
