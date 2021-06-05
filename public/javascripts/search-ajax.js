document.addEventListener("DOMContentLoaded", ()=> {

    const searchbar = document.getElementById("navbar_search");
    const qContainer = document.getElementById("question-container")
    searchbar.addEventListener("keypress", async(e) => {
        const res = await fetch("/search")
        const result = await res.json();
        // console.log(result.questions)
        const filtered = result.questions.filter(obj => {
           return obj.question_title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        if (e.key === "Enter") {
            if (filtered) {
                // window.location.replace("/questions")
                console.log(qContainer)
                qContainer.innerHTML = "";
                // qContainer.innerHTML =
            }
        }

    })


})
