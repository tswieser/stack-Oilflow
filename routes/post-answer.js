const express = require('express');
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth')

const answerValidators = [
    check("answer_body")
        .exists({ checkFalsy: true })
        .withMessage("Answer cannot be empty.")
];

router.post('/', csrfProtection, requireAuth, answerValidators, asyncHandler(async (req, res, next) => {
    const { answer_body, question_id } = req.body;
    const validationErrors = validationResult(req)
    const id = req.params.id
    const question = await Question.findOne({ where: question_id })
    const answers = await Answer.findAll();
    // console.log(`THIS IS THE QUESTION LOG`, question.id)
    if (validationErrors.isEmpty()) {
        await Answer.create({
            question_id: question.id,
            user_id: res.locals.user.id,
            answer_body
        })
        // console.log(question.id)
        res.render(`questions-id`, { answers, question, csrfToken: req.csrfToken() });
    } else {
        const errors = validationErrors.array().map((error) => {
            return error.msg;
        })
        res.render('questions', {
            csrfToken: req.csrfToken(),
            errors
        });
    }
}))


module.exports = router
