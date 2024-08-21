import express from "express";
import ComponentController from "../controllers/ComponentController";
import { Schemas, ValidateSchema } from "../middlewares/validation";

const router=express.Router();

router.get('/',ComponentController.getAllComponents);
router.post('/upload',ValidateSchema(Schemas.component.create, "body"),ComponentController.CreateComponent);
router.put('/',ValidateSchema(Schemas.component.update, "body"),ComponentController.updateComponent);
router.delete('/:barcode',ValidateSchema(Schemas.component.delete, "params"),ComponentController.deleteComponent);
router.get('/query',ComponentController.SearchForComponentByQuery);


export= router;
