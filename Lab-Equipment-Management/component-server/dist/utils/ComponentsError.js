"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsDoesNotExistError = exports.UserDoesNotExistError = exports.InvalidUserNameOrPasswordError = exports.unableToSaveUserError = void 0;
class unableToSaveUserError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.unableToSaveUserError = unableToSaveUserError;
class InvalidUserNameOrPasswordError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidUserNameOrPasswordError = InvalidUserNameOrPasswordError;
class UserDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserDoesNotExistError = UserDoesNotExistError;
class ComponentsDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ComponentsDoesNotExistError = ComponentsDoesNotExistError;
