document.addEventListener("DOMContentLoaded", ()=> {

    const searchbar = document.getElementById("navbar_search");

    searchbar.addEventListener("keyup", async(e) => {

        const res = await fetch("/search")
        const result = await res.json();
        // console.log(result.questions)
        const filtered = result.questions.filter(obj => {
           return obj.question_title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        // console.log(filtered)
        if (filtered)

    })


})
