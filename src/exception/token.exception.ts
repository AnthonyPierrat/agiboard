import { HttpError } from "routing-controllers";

export class TokenException extends HttpError {

    public success : boolean;
    
    constructor(success: boolean) {
        super(401)
        Object.setPrototypeOf(this, TokenException.prototype);
        this.success = success;
        this.message = 'Invalid Token';
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