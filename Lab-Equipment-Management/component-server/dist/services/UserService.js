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
exports.register = register;
exports.login = login;
exports.findAllUser = findAllUser;
exports.findUserById = findUserById;
exports.modifyUser = modifyUser;
exports.removeUser = removeUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const UserDaos_1 = __importDefault(require("../daos/UserDaos"));
const ComponentsError_1 = require("../utils/ComponentsError");
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const ROUND = config_1.config.server.rounds;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, ROUND);
            const saved = new UserDaos_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return yield saved.save();
        }
        catch (error) {
            throw new ComponentsError_1.unableToSaveUserError(error.message);
        }
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credentials;
        try {
            const user = yield UserDaos_1.default.findOne({ email });
            if (!user) {
                throw new ComponentsError_1.InvalidUserNameOrPasswordError("invalid username or password");
            }
            else {
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (validPassword) {
                    return user;
                }
                else {
                    throw new ComponentsError_1.InvalidUserNameOrPasswordError("invalid username or password");
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
function findAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserDaos_1.default.find();
            return users;
        }
        catch (error) {
            return [];
        }
    });
}
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserDaos_1.default.findById(userId);
            if (user)
                return user;
            throw new ComponentsError_1.UserDoesNotExistError("User does not exist with this Id");
        }
        catch (error) {
            throw error;
        }
    });
}
function modifyUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield UserDaos_1.default.findByIdAndUpdate(user._id, user, { new: true });
            if (!id)
                throw new ComponentsError_1.UserDoesNotExistError("User does not exist with this Id");
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
function removeUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let deleted = yield UserDaos_1.default.findByIdAndDelete(userId);
            if (!deleted)
                throw new ComponentsError_1.UserDoesNotExistError("User does not exist with this Id");
            return "User deleted successsfully";
        }
        catch (error) {
            throw error;
        }
    });
}
