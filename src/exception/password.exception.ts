import { HttpError } from "routing-controllers";

export class PasswordException extends HttpError {

    public success : boolean;
    
    constructor(success: boolean) {
        super(401)
        Object.setPrototypeOf(this, PasswordException.prototype);
        this.success = success;
        this.message = 'Incorrect password';
        this.toJSON();
    }

    toJSON() {
        return {
            name: this.constructor.name,
            success: this.success,
            code: this.httpCode,
            message: this.message
        };
    }
}