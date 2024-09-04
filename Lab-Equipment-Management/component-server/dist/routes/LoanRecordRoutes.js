"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const LoanRecordController_1 = __importDefault(require("../controllers/LoanRecordController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get('/', LoanRecordController_1.default.getAllRecords);
router.post('/', (0, validation_1.ValidateSchema)(validation_1.Schemas.loan.create, 'body'), LoanRecordController_1.default.createRecord);
router.put('/', (0, validation_1.ValidateSchema)(validation_1.Schemas.loan.update, 'body'), LoanRecordController_1.default.upadateRecord);
router.post('/query', (0, validation_1.ValidateSchema)(validation_1.Schemas.loan.query, 'body'), LoanRecordController_1.default.getRecordsByPropery);
module.exports = router;
