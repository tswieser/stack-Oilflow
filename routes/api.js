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

//Question API helpers

const alreadyVoted = async (userId, questionId) => {
    let exVote = await Question_like.findOne({
        where: {
            user_id : userId,
            question_id : questionId
        }
    })

    if(exVote) return exVote.question_votes
    else return null
}

const changeVote = async (userId, questionId) => {
    let exVote = await Question_like.findOne({
        where: [
            {user_id : userId},
            {question_id : questionId}
        ]
    })

    await exVote.update({
        question_votes: !exVote.question_votes
    })
    return exVote
}

//Answer API helpers

const alreadyVotedAnswer = async (userId, answerId) => {
    let exVote = await Answer_like.findOne({
        where: [
            {user_id : userId},
            {answer_id : answerId}
        ]
    })

    if(exVote) return exVote.answer_votes
    else return null
}

const changeVoteAnswer = async (userId, answerId) => {
    let exVote = await Answer_like.findOne({
        where: [
            {user_id : userId},
            {answer_id : answerId}
        ]
    })

    await exVote.update({
        answer_votes: !exVote.answer_votes
    })
    return exVote
}

apiRouter.put("/questions/:id(\\d+)/upvote", asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id, 10);

    const vote = await alreadyVoted(userId, questionId)

    if(vote === null){
        await Question_like.create({
            question_id: questionId,
            question_votes: 1,
            user_id: userId
        })
        let modifiedVote = await questionVoteCounter(questionId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    } else if(vote === true){
        res.status(406).json({
            status: 'error',
            error_vote: vote
        })
        return
    } else if(vote === false){
        await changeVote(userId, questionId)
        let modifiedVote = await questionVoteCounter(questionId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    }

    // res.status(200).json({qCount})
}));

apiRouter.put("/questions/:id(\\d+)/downvote", asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id, 10);

    const vote = await alreadyVoted(userId, questionId)

    if(vote === null){
        await Question_like.create({
            question_id: questionId,
            question_votes: 0,
            user_id: userId
        })
        let modifiedVote = await questionVoteCounter(questionId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    } else if(vote === false){
        res.status(406).json({
            status: 'error',
            error_vote: vote
        })
        return
    } else if(vote === true){
        await changeVote(userId, questionId)
        let modifiedVote = await questionVoteCounter(questionId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    }

    let qCount = await questionVoteCounter(questionId);
    res.json({qCount})
}));

//vote.isNewRecord


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

apiRouter.put(`/answers/:id(\\d+)/upvote`, asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const answerId = parseInt(req.params.id, 10);

    let vote = await alreadyVotedAnswer(userId, answerId)

    if(vote === null){
        await Answer_like.create({
            answer_id: answerId,
            answer_votes: 1,
            user_id: userId
        })
        let modifiedVote = await questionVoteCounter(answerId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    } else if(vote === true){
        res.status(406).json({
            status: 'error',
            error_vote: vote
        })
        return
    } else if(vote === false){
        await changeVoteAnswer(userId, answerId)
        let modifiedVote = await questionVoteCounter(answerId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    }

    let voteCount = await answerVoteCounter(answerId);
    res.json({voteCount})
}));

apiRouter.put(`/answers/:id(\\d+)/downvote`, asyncHandler(async(req, res) => {

    const userId = req.session.auth.userId;
    const answerId = parseInt(req.params.id, 10);

    let vote = await alreadyVotedAnswer(userId, answerId)

    if(vote === null){
        await Answer_like.create({
            answer_id: answerId,
            answer_votes: 0,
            user_id: userId
        })
        let modifiedVote = await answerVoteCounter(answerId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    } else if(vote === false){
        res.status(406).json({
            status: 'error',
            error_vote: vote
        })
        return
    } else if(vote === true){
        await changeVoteAnswer(userId, answerId)
        let modifiedVote = await answerVoteCounter(answerId);
        res.status(200).json({'new_vote': modifiedVote})
        return
    }

    let voteCount = await answerVoteCounter(answerId);
    res.json({voteCount})
}));


module.exports = apiRouter
