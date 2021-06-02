const express = require('express');
const router = express.Router();
const { User, Question } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');


router.get('/', csrfProtection, asyncHandler(async(req, res) => {
    const questions = await Question.findAll();

    res.render('questions', {
        title: 'Questions',
        questions
    })
}))

router.post()






module.exports = router;