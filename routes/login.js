const express = require("express");
const loginRouter = express.Router();
const { asyncHandler, csrfProtection } = require('./utils')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const {User} = require('../db/models')
// const cookieParser = require('cookie-parser')



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

loginRouter.post("/", loginValidators, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const validationErrors = validationResult(req);
    const errors = [];
    console.log(validationErrors)


    if (validationErrors.isEmpty()) {
        const user = User.findOne({
            where: { email }
        })
        const passMatch = await bcrypt.compare(password, user.hashed_password.toString());
        if (user) {
            if (passMatch) {
                //to do login
                res.send('JLDSHFAKJSDJ')
            } else {
                errors.push('Login password/email combination is not valid.')
            }
        }
    } else {
        res.redirect('/')
    }

}));




module.exports = loginRouter
