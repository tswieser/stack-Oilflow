const questionUpVote = document.getElementById("question_upvote");
const questionDownVote = document.getElementById("question_downvote");
const questionId = document.querySelector(".question_id");
const upvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/upvote`, {
      method: "POST",
    });
    const json = await res.json();
    if(!res.ok) console.log(json.message) 
    console.log(questionId.id)
}

const downvote = async (e) => {
    e.preventDefault();
    const res = await fetch(`/votes/questions/${questionId.id}/downvote`, {
        method: "POST"
    })
    const json = await res.json();
    if(!res.ok) console.log(json.message) 
    console.log(questionId.id)
}
questionUpVote.addEventListener("click", upvote);
questionDownVote.addEventListener("click", downvote);