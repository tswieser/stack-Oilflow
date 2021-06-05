const express = require('express');
const router = express.Router();
const { User, Question, Answer, Question_like } = require('../db/models');
const { asyncHandler } = require('./utils');



router.get("/",  asyncHandler(async(req, res, next) => {
    const { searchvalue } = req.body
    // console.log(req.body)
    let questions = await Question.findAll({
        where: {  }
    })
    req.render("searched-question")
}));


module.exports = router;
