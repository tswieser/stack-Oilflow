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




router.post('/', csrfProtection, requireAuth, answerValidators, asyncHandler(async (req, res, next) => {

    const { answer_body, question_id } = req.body;
    const validationErrors = validationResult(req)
    const question = await Question.findByPk(question_id)

    const answers = await Answer.findAll({
        where: {
            question_id: question_id
        }
    }); //hits this route in backend

    if (validationErrors.isEmpty()) {
        const createAns = await Answer.create({
            question_id: question.id,
            user_id: res.locals.user.id,
            answer_body
        })
        res.json({ createAns });
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

