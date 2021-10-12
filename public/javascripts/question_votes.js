const questionUpVote = document.getElementById("question_upvote");
const questionDownVote = document.getElementById("question_downvote");
const questionId = document.querySelector(".question_id");
const questionVoteCount = document.querySelector("#question_vote_count");

const upvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/upvote`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const vote = await res.json();

    console.log(vote.error_vote)

    if((vote.error_vote !== undefined) && (vote.error_vote === true)){
        questionVoteCount.style.backgroundColor = 'green'
        return
    } else if((vote.error_vote !== undefined) && (vote.error_vote === false)) {
        questionVoteCount.style.backgroundColor = 'red'
        return
    } else {
        questionVoteCount.innerHTML = `${vote.qCount}`
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
        questionVoteCount.style.backgroundColor = 'red'
        return
    } else {
        questionVoteCount.innerHTML = `${vote.new_vote}`
        return
    }
}
questionUpVote.addEventListener("click", upvote);
questionDownVote.addEventListener("click", downvote);