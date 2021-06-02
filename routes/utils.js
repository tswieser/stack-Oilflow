const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { check, validationResult } = require('express-validator')

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = {
    csrfProtection,
    asyncHandler,
    check,
    validationResult
}
