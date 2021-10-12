const express = require('express');
const router = express.Router();
const { Answer_like, Question, Answer, Question_like } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth');


class QuestionObject {
    constructor(id, title, body, answers, votes) {
        this.id = id,
            this.title = title,
            this.body = body,
            this.answers = answers,
            this.votes = votes
    }
}

class AnswerObject {
    constructor(id, answer_body, user_id, votes) {
        this.id = id,
            this.body = answer_body,
            this.userId = user_id,
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
        .withMessage("Please enter your question")

]

const voteCounter = (questions) => {

    let questionVotes = questions.Question_likes;
    let count = 0

    for (let j = 0; j < questionVotes.length; j++) {
        let questionLikes = questionVotes[j].question_votes
        if (questionLikes === true) count++
        else if (questionLikes === false) count--
    }
    return count;
}

router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    let questionsArr = [];
    let user = req.session.auth
    const questions = await Question.findAll({
        include: [Answer, Question_like]
    });

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i]        
        const count = voteCounter(question)

        let newQuestion = new QuestionObject(question.id, question.question_title, question.question_body, question.Answers, count)
        questionsArr.push(newQuestion)
    }

    if (!user) {
        res.render('questions', {
            title: 'Questions',
            questionsArr
        });
    } else {
        res.render('questions', {
            title: 'Questions',
            questionsArr,
            session: user
        });
    }
}))

router.get('/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    let answersArr = []
    let user = req.session.auth

    const questionsId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionsId, {
        include: {
            model: Question_like
        }
    })

    const qCount = voteCounter(question)
    console.log(qCount, "asdasdasdasda1123")

    const answers = await Answer.findAll({
        where: {
            question_id: req.params.id
        },
        include: [Question, Answer_like]
    })

    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i]
        let answerVotes = answers[i].Answer_likes;
        let count = 0

        for (let j = 0; j < answerVotes.length; j++) {
            let answerLikes = answerVotes[j].answer_votes
            if (answerLikes === true) count++
            else if (answerLikes === false) count--
        }

        let newAnswer = new AnswerObject(answer.id, answer.answer_body, answer.user_id, count)
        answersArr.push(newAnswer)
    }
    
    res.render('questions-id', { answersArr, qCount, question, csrfToken: req.csrfToken(), session: user });
}))

router.get('/ask', csrfProtection, asyncHandler(async (req, res) => {
    let user = req.session.auth

    if (!user) {
        res.render("ask-question", {
            title: "Ask Question",
            csrfToken: req.csrfToken(),
        })
    } else {
        res.render("ask-question", {
            title: "Ask Question",
            csrfToken: req.csrfToken(),
            session: user,
        })
    }
}))

router.post('/ask', requireAuth, csrfProtection, questionValidator, asyncHandler(async (req, res, next) => {
    const { question_title, question_body, user_id } = req.body;
    const validationErrors = validationResult(req);

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


module.exports = router;
