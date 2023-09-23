/**
 * File Name: authMiddleware.js
 */

const authMiddleware = async (ctx, next) => {
  try {
    if (ctx.isAuthenticated()) {
      await next();
      return;
    }
    ctx.status = 401;
    ctx.body = ResponseHelper.error(401, MSG.UNAUTHORIZED);
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = authMiddleware;
