"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const LabCardController_1 = __importDefault(require("../controllers/LabCardController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get('/:cardId', (0, validation_1.ValidateSchema)(validation_1.Schemas.Labcard.get, 'params'), LabCardController_1.default.getLabCard);
router.post('/', (0, validation_1.ValidateSchema)(validation_1.Schemas.Labcard.create, 'body'), LabCardController_1.default.createLabCard);
module.exports = router;
