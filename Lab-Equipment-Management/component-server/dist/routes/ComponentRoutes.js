"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ComponentController_1 = __importDefault(require("../controllers/ComponentController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.get('/', ComponentController_1.default.getAllComponents);
router.post('/upload', (0, validation_1.ValidateSchema)(validation_1.Schemas.component.create, "body"), ComponentController_1.default.CreateComponent);
router.put('/', (0, validation_1.ValidateSchema)(validation_1.Schemas.component.update, "body"), ComponentController_1.default.updateComponent);
router.delete('/:barcode', (0, validation_1.ValidateSchema)(validation_1.Schemas.component.delete, "params"), ComponentController_1.default.deleteComponent);
router.get('/query', ComponentController_1.default.SearchForComponentByQuery);
module.exports = router;
