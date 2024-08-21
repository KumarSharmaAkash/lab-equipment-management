"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get('/', UserController_1.default.getAllUser);
router.get("/:userId", (0, validation_1.ValidateSchema)(validation_1.Schemas.user.userId, 'params'), UserController_1.default.getUserById);
router.put('/', (0, validation_1.ValidateSchema)(validation_1.Schemas.user.update, 'body'), UserController_1.default.updateUser);
router.delete('/:userId', (0, validation_1.ValidateSchema)(validation_1.Schemas.user.userId, 'params'), UserController_1.default.deleteUser);
module.exports = router;
