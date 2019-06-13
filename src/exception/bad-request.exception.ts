import { BadRequestError } from "routing-controllers";

export class BadRequestException extends BadRequestError {

    public success : boolean;
    
    constructor(success: boolean, message?: string) {
        super()
        Object.setPrototypeOf(this, BadRequestException.prototype);
        this.success = success;
        this.message = message;
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