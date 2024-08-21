import express from "express";

import LabCardController from "../controllers/LabCardController";

import { Schemas, ValidateSchema } from "../middlewares/validation";

const router =express.Router();

router.get('/:cardId',ValidateSchema(Schemas.Labcard.get,'params'),LabCardController.getLabCard);
router.post('/',ValidateSchema(Schemas.Labcard.create,'body'),LabCardController.createLabCard);

export= router;