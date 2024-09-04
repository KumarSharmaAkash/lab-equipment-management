import express from "express";

import UserController from "../controllers/UserController";
import { Schemas, ValidateSchema } from "../middlewares/validation";

const router = express.Router();

router.get('/',UserController.getAllUser);
router.get("/:userId",ValidateSchema(Schemas.user.userId, 'params'),UserController.getUserById);
router.put('/',ValidateSchema(Schemas.user.update, 'body'),UserController.updateUser);
router.delete('/:userId',ValidateSchema(Schemas.user.userId, 'params'),UserController.deleteUser);

export=router;