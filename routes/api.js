const express = require("express");
const apiRouter = express.Router();
const { Answer_like, Question_like, Answer, Question } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth')


const questionVoteCounter = async function(questionId){
    const question = await Question.findByPk(questionId, {
        include:  Question_like
    });
    let questionVotes = question.Question_likes;

    let count = 0

    for (let j = 0; j < questionVotes.length; j++) {
        let questionLikes = questionVotes[j].question_votes
        if (questionLikes === true){
            count++
        }
        else if (questionLikes === false){
            count--
        }
    }
    return count;
}

apiRouter.post("/questions/:id(\\d+)/upvote", asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id, 10);

    await Question_like.create({
        question_id: questionId,
        question_votes: 1,
        user_id: userId
    })

    let voteCount = await questionVoteCounter(questionId);
    res.json({voteCount})
}));

apiRouter.post("/questions/:id(\\d+)/downvote", asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id, 10);

    await Question_like.create({
        question_id: questionId,
        question_votes: 0,
        user_id: userId
    })

    let voteCount = await questionVoteCounter(questionId);
    res.json({voteCount})
}));


//ANSWER LIKES API

const answerVoteCounter = async function(answerId){
    const answer = await Answer.findByPk(answerId, {
        include:  Answer_like
    });
    let answerVotes = answer.Answer_likes;

    let count = 0

    for (let j = 0; j < answerVotes.length; j++) {
        let answerLikes = answerVotes[j].answer_votes
        if (answerLikes === true){
            count++
        }
        else if (answerLikes === false){
            count--
        }
    }
    return count;
}

apiRouter.post(`/answers/:id(\\d+)/upvote`, asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const answerId = parseInt(req.params.id, 10);

    await Answer_like.create({
        answer_id: answerId,
        answer_votes: 1,
        user_id: userId
    })

    let voteCount = await answerVoteCounter(answerId);
    res.json({voteCount})
}));

apiRouter.post(`/answers/:id(\\d+)/downvote`, asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const answerId = parseInt(req.params.id, 10);

    await Answer_like.create({
        answer_id: answerId,
        answer_votes: 0,
        user_id: userId
    })

    let voteCount = await answerVoteCounter(answerId);
    res.json({voteCount})
}));


module.exports = apiRouter
