import { HttpError } from "routing-controllers";

export class EmailExistException extends HttpError {

    public success : boolean;

    constructor(success: boolean) {
        super(409)
        Object.setPrototypeOf(this, EmailExistException.prototype);
        this.success = success;
        this.message = "This email already exist";
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