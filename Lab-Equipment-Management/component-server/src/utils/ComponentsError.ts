export class unableToSaveUserError extends Error{
    constructor(message:string){
        super(message);
    }
}

export class InvalidUserNameOrPasswordError extends Error{
    constructor(message:string){
        super(message);
    }
}

export class UserDoesNotExistError extends Error{
    constructor(message:string){
        super(message);
    }
}
export class ComponentsDoesNotExistError extends Error{
    constructor(message:string){
        super(message);
    }
}