"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const ComponentsError_1 = require("../utils/ComponentsError");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'akkii1478@gmail.com',
        pass: 'xjra ufvr xtcx zazm'
    }
});
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registerUser = yield (0, UserService_1.register)(user);
            res.status(201).json({
                message: "User  successfully created",
                user: {
                    _id: registerUser._id,
                    type: registerUser.type,
                    firstName: registerUser.firstName,
                    lastName: registerUser.lastName,
                    email: registerUser.email
                }
            });
            const subject = 'Welcome to NITLabs!';
            const message = `Dear ${user.firstName},\n\nWelcome to NITLabs!\n\nThank you for registering at NITLabs. We are excited to have you on board. At NITLabs, we strive to provide a seamless experience that meets all your needs. we are here to support you every step of the way.\n\nIf you have any questions or need assistance, please don't hesitate to reach out to our support team.\n\nBest regards,\nThe NITLabs Team`;
            const mailOptions = {
                from: 'akkii1478@gmail.com',
                to: user.email,
                subject: subject,
                text: message
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send('Error sending email');
                }
                res.status(200).send('Registration email sent successfully');
            });
        }
        catch (error) {
            if (error.message.includes("E11000 duplicate key error collection:")) {
                res.status(409).json({ message: "User with email already exists", error: error.message });
            }
            else {
                res.status(500).json({
                    message: "unable to register user at this time", error: error.message
                });
            }
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const loggedIn = yield (0, UserService_1.login)(credentials);
            res.status(200).json({
                message: "User  successfully logged in",
                user: {
                    _id: loggedIn._id,
                    type: loggedIn.type,
                    firstName: loggedIn.firstName,
                    lastName: loggedIn.lastName,
                    email: loggedIn.email
                }
            });
        }
        catch (error) {
            if (error instanceof ComponentsError_1.InvalidUserNameOrPasswordError) {
                res.status(401).json({ message: "unable to login user at this time", error: error.message });
            }
            else {
                res.status(500).json({ message: "unable to login user at this time", error: error.message });
            }
        }
    });
}
exports.default = { handleRegister, handleLogin };
