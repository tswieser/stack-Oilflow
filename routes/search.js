const express = require('express');
const router = express.Router();
const { User, Question, Answer, Question_like } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');

class QuestionObject {
    constructor(id, title, body, answers, votes) {
        this.id = id,
        this.title = title,
        this.body = body,
        this.answers = answers,
        this.votes = votes
    }
}

router.get("/", csrfProtection, asyncHandler(async(req, res, next) => {
    let questionsArr = [];
    const questions = await Question.findAll({
        include: [Answer, Question_like]
    });

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i]
        let questionVotes = questions[i].Question_likes;
        let count = 0

        for (let j = 0; j < questionVotes.length; j++) {
            let questionLikes = questionVotes[j].question_votes
            if (questionLikes === true) count++
            else if (questionLikes === false) count--
        }
        let newQuestion = new QuestionObject(question.id, question.question_title, question.question_body, question.Answers, count)
        questionsArr.push(newQuestion)
    }

    res.json({ csrfToken: req.csrfToken(), questionsArr })
}));


module.exports = router;
