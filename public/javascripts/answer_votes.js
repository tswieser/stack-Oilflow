// const { json } = require("sequelize/types");

const upvote = document.querySelectorAll(".upvote");
const downvote = document.querySelectorAll(".downvote");
window.addEventListener("DOMContentLoaded", e => {

    document.addEventListener("click", e => {
        e.stopPropagation();
        const isButton = e.target.nodeName === 'BUTTON';
        if(!isButton){
            return
        } else {
            
            const vote = e.target.className;
            const answerId = e.target.id;
            const votes = document.querySelector(`.answer_vote_${answerId}`);

            if(vote === "answer_upvote"){
                const upvote = async () => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/upvote`, {
                        method: "POST",
                    });
                    const json = await res.json();
                    if(!res.ok) console.log(json.message)
                    console.log(json)
                    votes.innerHTML = json.voteCount;
                }

                upvote();

            } else if (vote === "answer_downvote"){
                const downvote = async () => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/downvote`, {
                        method: "POST"
                    })
                    const json = await res.json();
                    if(!res.ok) console.log(json.message)
                    console.log(json)
                    votes.innerHTML = json.voteCount;
                }
                downvote();
            }

        }
    })

})
