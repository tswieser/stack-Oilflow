const questionUpVote = document.getElementById("question_upvote");
const questionDownVote = document.getElementById("question_downvote");
const questionId = document.querySelector(".question_id");
const questionVoteCount = document.querySelector("#question_vote_count");
const voteContainer = document.querySelector(".vote-container-1");

const errMessage = document.createElement("P");

const upvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/upvote`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const vote = await res.json();

    if((vote.error_vote !== undefined) && (vote.error_vote === true)){
        errMessage.innerText = 'already upvoted';
        voteContainer.appendChild(errMessage)
        errMessage.style.backgroundColor = '#90EE90'
        setTimeout(()=> {
            voteContainer.removeChild(errMessage)
            errMessage.style.backgroundColor = 'transparent'
        }, 3000)
        return
    } else if((vote.error_vote !== undefined) && (vote.error_vote === false)) {
        questionVoteCount.style.backgroundColor = 'red'
        return
    } else {
        questionVoteCount.innerHTML = `${vote.new_vote}`
        //console error on first like since there is no errMessage Element yet
        voteContainer.removeChild(errMessage)
        errMessage.style.backgroundColor = 'transparent'
        return
    }
}

const downvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/downvote`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const vote = await res.json();

    if((vote.error_vote !== undefined) && (vote.error_vote === true)){
        questionVoteCount.style.backgroundColor = 'green'
        return
    } else if((vote.error_vote !== undefined) && (vote.error_vote === false)) {
        errMessage.innerText = 'already downvoted';
        voteContainer.appendChild(errMessage)
        errMessage.style.backgroundColor = '#ff5959'
        setTimeout(()=> {
            voteContainer.removeChild(errMessage)
            errMessage.style.backgroundColor = 'transparent'
        }, 3000)
        return
    } else {
        questionVoteCount.innerHTML = `${vote.new_vote}`
        //console error on first like since there is no errMessage Element yet
        voteContainer.removeChild(errMessage)
        errMessage.style.backgroundColor = 'transparent'
        return
    }
}
questionUpVote.addEventListener("click", upvote);
questionDownVote.addEventListener("click", downvote);