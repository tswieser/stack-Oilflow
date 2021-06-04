const express = require("express");
const apiRouter = express.Router();
const { Question_like, User, Question } = require('../db/models');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const { requireAuth } = require('../auth')



apiRouter.post("/questions/:id(\\d+)/upvote", (req, res) => {

    const userId = req.session.userId;

    const userVote = await Question_like.findAll({
        where: {user_id : userId}
    })


});
  
apiRouter.post("/questions/:id(\\d+)/downvote", (req, res) => {
 
});