class ResponseHelper {
    static success(ctx, statusCode = 200, message = '', data, meta) {
      ctx.status = statusCode;
      ctx.body = {
        message,
        success: true,
        data,
        meta,
      };
    }
  
    static error(ctx, statusCode = 500, message = 'An error occurred', errors) {
      ctx.status = statusCode;
      ctx.body = {
        message,
        success: false,
        errors,
      };
    }
  }
  
  module.exports = ResponseHelper;
  