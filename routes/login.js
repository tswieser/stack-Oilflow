const express = require("express");
const loginRouter = express.Router();
const { asyncHandler, csrfProtection } = require('./utils')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const { User } = require('../db/models')
const cookieParser = require('cookie-parser')
const { loginUser, logoutUser } = require('../auth')

loginRouter.use(cookieParser());

loginRouter.get("/", csrfProtection, asyncHandler(async (req, res, next) => {

    res.render("login", { csrfToken: req.csrfToken(), title: "Login" })
}));

const loginValidators = [
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("You must enter an email address."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("You must enter a password."),
];

loginRouter.post("/", csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validationErrors = validationResult(req);
    const user = await User.findOne({ where: { email } })
    const errors = [];

    if (!user) {
        errors.push('Provided User does not exist')
        res.render('login', {
            title: 'Login',
            errors: errors,
            csrfToken: req.csrfToken()
        })
        console.log(errors);
    }
    if (user) {
        const passMatch = await bcrypt.compare(password, user.hashed_password.toString());
        if (passMatch) {
                loginUser(req, res, user)
                return res.redirect('/')
        } else {
            errors.push('Password is incorrect')
            res.render('login', {
                title: 'Login',
                errors: errors,
                csrfToken: req.csrfToken()
            })
        }
    } else {
        errors = validationErrors.array().map((error) => error.msg);
    }

}));




module.exports = loginRouter
