import express from 'express';

import LoanRecordController from '../controllers/LoanRecordController';
import { Schemas, ValidateSchema } from '../middlewares/validation';


const router = express.Router();
router.get('/', LoanRecordController.getAllRecords);
router.post('/',ValidateSchema(Schemas.loan.create,'body'),LoanRecordController.createRecord);
router.put('/',ValidateSchema(Schemas.loan.update,'body'),LoanRecordController.upadateRecord);
router.post('/query',ValidateSchema(Schemas.loan.query,'body'),LoanRecordController.getRecordsByPropery);

export=router;