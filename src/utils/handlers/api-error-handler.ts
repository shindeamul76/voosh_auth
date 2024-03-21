

class ApiError extends Error {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    errors: any[]; 
    constructor(
      statusCode: number,
      data?: any,
      message: string = 'Something went wrong',
      errors: any[] = [], 
      stack: string = ''
    ) {
      super(message);
      this.name = 'ApiError'; 
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = false;
      this.errors = errors;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
    toJSON() {
      return {
        name: this.name,
        statusCode: this.statusCode,
        message: this.message,
        success: this.success,
        errors: this.errors,
        data: this.data,
      };
    }
  }
  
  export { ApiError };