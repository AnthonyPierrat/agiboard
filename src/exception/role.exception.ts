import { UnauthorizedError } from "routing-controllers";

export class RoleException extends UnauthorizedError {

    public success : boolean;
    
    constructor(success: boolean) {
        super()
        Object.setPrototypeOf(this, RoleException.prototype);
        this.success = success;
        this.message = 'You don\'t have enough privilege';
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