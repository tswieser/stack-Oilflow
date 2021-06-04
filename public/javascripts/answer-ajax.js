//add event listener to the form submit btn
//prevent default inside of event listener

// const { response } = require("express");


// start with fetch submit answer
//await the fetch (submit req with method post)
//post will hit backend server( set route )
//res will add to list of answers
//create node with answer and append
//

document.addEventListener('DOMContentLoaded', () => {
    const answerForm = document.getElementById('answer-form');
    answerForm.addEventListener('submit', async (e) => {
        // console.log("THIS IS THE WINDOW PATH NAME::::",window.location.pathname)
        e.preventDefault()
        console.log(`THIS IS THE E TARGET`, e.target.value)
        debugger

        const reqs = await fetch(window.location.pathname, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({answer_body: e.target})
        })
        const ress = await reqs.json()
        console.log(ress)
        debugger
    })
})
