const express = require("express");
const loginRouter = express.Router();



loginRouter.get("/login", (req, res, next) => {
    res.send("Hi")
});




module.exports = loginRouter
