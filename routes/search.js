const express = require('express');
const router = express.Router();
const { User, Question, Answer, Question_like } = require('../db/models');
const { asyncHandler } = require('./utils');



router.get("/",  asyncHandler(async(req, res, next) => {
    const questions = await Question.findAll()

    res.json({ questions })

}));


module.exports = router;
