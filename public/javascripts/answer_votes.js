

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
            
            console.log(answerId, vote, votes)
            if(vote === "answer_upvote"){
                const upvote = async () => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/upvote`, {
                        method: "PUT",
                    });
                    const json = await res.json();

                    if(json.error_vote){
                        console.log("ERROR")
                    }

                    votes.innerHTML = json.new_vote;
                }

                upvote();

            } else if (vote === "answer_downvote"){
                const downvote = async () => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/downvote`, {
                        method: "PUT"
                    })
                    const json = await res.json();
                    votes.innerHTML = json.new_vote;
                }
                downvote();
            }

        }
    })

})
