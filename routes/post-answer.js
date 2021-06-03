const express = require('express');
const router = express.Router();
const { User, Question, Answer } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth')
// let id;

const answerValidators = [
    check("answer_body")
        .exists({ checkFalsy: true })
        .withMessage("Answer cannot be empty.")
];
router.post('/:id', csrfProtection, requireAuth, answerValidators, asyncHandler(async (req, res, next) => {
    const { answer_body } = req.body;
    const validationErrors = validationResult(req)
    const question = await Question.findByPk(req.params.id)
    // id = question
    const answers = await Answer.findAll({
        where: {
            question_id: req.params.id
        }
    }); //hits this route in backend

    if (validationErrors.isEmpty()) {
        await Answer.create({
            question_id: question.id,
            user_id: res.locals.user.id,
            answer_body
        })
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
    return
}))

module.exports = router

