document.addEventListener("DOMContentLoaded", ()=> {

    const searchbar = document.getElementById("navbar_search");
    const qContainer = document.getElementById("question-container")


    searchbar.addEventListener("keypress", async(e) => {
        const res = await fetch("/search");
        const result = await res.json();
        // console.log(result.questions)
        const filtered = result.questionsArr.filter(obj => {
           return obj.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        if (e.key === "Enter") {
            if (filtered.length) {
                // window.location.replace("/questions")
                // console.log(qContainer)
                // console.log(filtered)
                // qContainer.innerHTML = "";
                const filteredQs = filtered.map(q => {
                    return `<div class="question_div">
                                <div class="stats">
                                    <div class="votes_div">
                                        <p>${q.votes}</p>
                                        <p>Votes</p>
                                    </div>
                                    <div class="answers_div">
                                        <p>${q.answers.length}</p>
                                        <p>Answers</p>
                                    </div>
                                </div>
                                <div class="content_div">
                                    <a href="/questions/${q.id}">${q.title}</a>
                                    <p>${q.body}</p>
                                </div>
                            </div>`
                })
                qContainer.innerHTML = filteredQs;
            } else {
                qContainer.innerHTML = `<div class="not-found"><h1>Search result for :${e.target.value}</h1><br><h2>Found 0 matches</h2></div>`;
            }
        }

    })


})
