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

            if(vote === "up_vote"){
                const upvote = async (e) => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/upvote`, {
                      method: "POST",
                    });
                    const json = await res.json();
                    if(!res.ok) console.log(json.message)
                }

                upvote();

            } else if (vote === "down_vote"){
                const downvote = async (e) => {
                    e.preventDefault();
                    const res = await fetch(`/votes/answers/${answerId}/downvote`, {
                        method: "POST"
                    })
                    const json = await res.json();
                    if(!res.ok) console.log(json.message)
                }
                downvote();
            }
        }
    })

})
