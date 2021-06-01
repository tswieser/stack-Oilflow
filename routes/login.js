const express = require("express");
const loginRouter = express.Router();



loginRouter.get("/", (req, res, next) => {
    res.render("login")
});

const loginValidators = [
    check("email")
        .exists({ checkFalsy: true})
        .withMessage("You must enter an email address."),
    check("password")
        .exists({ checkFalsy: true})
        .withMessage("You must enter a password."),
];



loginRouter.post("/", (req, res, next) => {
    const { email, password} = req.body

    res.redirect("/")
});




module.exports = loginRouter
