const express = require('express');
const router = express.Router();
const { User, Question, Answer, Question_like } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth');

class QuestionObject{
    constructor(id ,title, body, answers, votes){
        this.title = title,
        this.body = body,
        this.answers = answers,
        this.votes = votes
    }        
}



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
    const questions = await Question.findAll({ 
        include: [ Answer, Question_like ]
    });

    const allQuestions = questions.map(question => {
        return question.dataValues;
    });
    
    const allLikes = allQuestions.map(question => {
        return question.Question_likes
    });

    res.render('questions', {
        // title: 'Questions',
        questions
    });
}))

router.get('/ask', csrfProtection, asyncHandler(async (req, res) => {
    res.render("ask-question", {
        title: "Ask Question",
        csrfToken: req.csrfToken(),
    })
}))

router.post('/ask', requireAuth, csrfProtection, questionValidator, asyncHandler(async (req, res, next) => {
    const { question_title, question_body, user_id } = req.body;
    const validationErrors = validationResult(req);
    // console.log(res.locals.user.id, user_id)

    if (validationErrors.isEmpty()) {
        await Question.create({
            user_id: res.locals.user.id,
            question_title,
            question_body
        })
        res.redirect("/questions");

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

router.get('/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const questionsId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionsId)

router.get('/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const questionsId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionsId)

    res.render('question-id', {
        title: 'Question',
        question,
        csrfToken: req.csrfToken()
    });
}))

    res.render('questions-id', {
        question,
        title: "Question",
        csrfToken: req.csrfToken()
    });
}))



module.exports = router;
