const express = require("express");
const loginRouter = express.Router();
const { asyncHandler, csrfProtection } = require('./utils')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')


loginRouter.get("/", (req, res, next) => {
    res.render("login")
});

const loginValidators = [
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("You must enter an email address."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("You must enter a password."),
];

loginRouter.post("/", loginValidators, csrfProtection, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validationErrors = validationResult(req);
    const errors = [];


    if (validationErrors.isEmpty()) {
        const user = await User.findOne({
            where: { email }
        })
        if (user) {
            const passMatch = await bcrypt.compare(password, user.hashed_password.toString());
            if (passMatch) {
                //to do login
                res.redirect('/')
            } else {
                errors.push('Login password/email combination is not valid.')
            }
        }
    } else {
        res.render('login', { csrfToken: req.csrfToken(), errors });
    }

}));




module.exports = loginRouter
