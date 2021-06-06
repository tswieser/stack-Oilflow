const express = require("express");
const logoutRouter = express.Router();
const { asyncHandler, csrfProtection } = require('./utils')
// const { check, validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs');
// const { User } = require('../db/models')
const cookieParser = require('cookie-parser')
const {  logoutUser } = require('../auth')

logoutRouter.use(cookieParser());



logoutRouter.get("/", csrfProtection, asyncHandler((req, res) => {
    logoutUser(req, res)
    return res.redirect("/")
}));


module.exports = logoutRouter;
