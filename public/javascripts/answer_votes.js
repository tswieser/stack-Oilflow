

const upvote = document.querySelectorAll(".upvote");
const downvote = document.querySelectorAll(".downvote");
const answerDiv = document.querySelectorAll("#q-answers");

const errMessage = document.createElement("P")

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
                        method: "PUT",
                    });
                    const json = await res.json();

                    if(json.error_vote){
                        votes.appendChild(errMessage)
                        errMessage.innerText = 'already upvoted';
                        errMessage.style.backgroundColor = '#90EE90';
                        setTimeout(()=> {
                            votes.removeChild(errMessage)
                        }, 3000)
                        return
                    } else {
                        votes.innerHTML = json.new_vote;
                    }
                }

                upvote();

            } else if (vote === "answer_downvote"){
                const downvote = async () => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/downvote`, {
                        method: "PUT"
                    })
                    const json = await res.json();

                    if(json.status === 'error'){
                        votes.appendChild(errMessage)
                        errMessage.innerText = 'already downvoted';
                        errMessage.style.backgroundColor = '#ff5959';
                        setTimeout(()=> {
                            votes.removeChild(errMessage)
                        }, 3000)
                        return
                    } else {
                        votes.innerHTML = json.new_vote;
                    }

                }
                downvote();
            }

        }
    })

})
