export abstract class ApiController {

    /**
     * 
     * @param {boolean} success 
     * @param {Object} data data to send 
     * @param {string} message message to send 
     * @param {number} code http code 
     */
    public response(success: boolean, data: Object, message: string, code: number) {
        return {
            success: success,
            data: data,
            message: message,
            code: code,
        }
    }
} 