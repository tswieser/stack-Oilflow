const express = require('express');
const router = express.Router();
const { User, Question } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth')

const answerValidators = [
    check("answer_body")
        .exists({ checkFalsy: true })
        .withMessage("Answer cannot be empty.")
];

router.post('/', csrfProtection, requireAuth, answerValidators, asyncHandler(async (req, res, next) => {
    const { answer_body, question_id, user_id } = req.body;
    const validationErrors = validationResult(req)
    const question = await Question.findByPk(req.params.id)

    if (validationErrors.isEmpty()) {
        await Answer.create({
            user_id: res.locals.user.id,
            answer_body,
            question_id: question.id
        })
        res.render(`/questions/${question_id}`, { csrfToken: req.csrfToken() });

    }
}))


module.exports = router
