const express = require("express");
const apiRouter = express.Router();
const { Question_like, User, Question } = require('../db/models');
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
        console.log(count);
        if (questionLikes === true){
            count++
        }
        else if (questionLikes === false){
            count--
        } 
    }
    return count;
}

apiRouter.post("/questions/:id(\\d+)/upvote", async(req, res) => {

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id, 10);


    await Question_like.create({
        question_id: questionId,
        question_votes: 1,
        user_id: userId
    })

    let voteCount = await questionVoteCounter(questionId);
    res.json({voteCount})
});
  
apiRouter.post("/questions/:id(\\d+)/downvote", async(req, res) => {

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id, 10);

    await Question_like.create({
        question_id: questionId,
        question_votes: 0,
        user_id: userId
    })

    let voteCount = await questionVoteCounter(questionId);
    res.json({voteCount})
});


module.exports = apiRouter
