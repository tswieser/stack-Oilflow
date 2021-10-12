const questionUpVote = document.getElementById("question_upvote");
const questionDownVote = document.getElementById("question_downvote");
const questionId = document.querySelector(".question_id");
const upvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/upvote`, {
      method: "POST",
    });
    const json = await res.json();
}

const downvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/downvote`, {
        method: "POST"
    })
    const json = await res.json();
}
questionUpVote.addEventListener("click", upvote);
questionDownVote.addEventListener("click", downvote);