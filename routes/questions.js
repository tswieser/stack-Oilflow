const express = require('express');
const router = express.Router();
const { User, Question } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth')

const questionValidator = [
    check('question_title')
        .exists({ checkFalsy: true })
        .withMessage("Please enter a question title")
        .isLength({ max: 200 })
        .withMessage("Title can not be greater than 200 characters"),
    check('question_body')
        .exists({ checkFalsy: true })
        .withMessage("PLease enter your question")

]




router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    const questions = await Question.findAll();

    res.render('questions', {
        title: 'Questions',
        questions
    })
}))








router.get('/ask', csrfProtection, asyncHandler(async (req, res) => {
    res.render("ask-question", { title: "Ask Question", csrfToken: req.csrfToken(), })

}))



router.post('/ask', requireAuth, csrfProtection, questionValidator, asyncHandler(async (req, res, next) => {
    const { question_title, question_body } = req.body;
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        await Question.create({
            userId: res.locals.user.id,
            question_title,
            question_body
        })
        res.redirect("/question");

    } else {
        const errors = validationErrors.array().map((error) => {
            return error.msg;
        })
        res.render('ask-question', {
            csrfToken: req.csrfToken(),
            errors
        });
    }
}))





module.exports = router;
