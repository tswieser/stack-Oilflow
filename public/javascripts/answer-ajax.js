//add event listener to the form submit btn
//prevent default inside of event listener
// start with fetch submit answer
//await the fetch (submit req with method post)
//post will hit backend server( set route )
//res will add to list of answers
//create node with answer and append
//

document.addEventListener('DOMContentLoaded', () => {
    const answerBtn = document.getElementById('submit-answer');
    answerBtn.addEventListener('click', async (e) => {
        e.preventDefault()

        const formVal = document.getElementById('textArea')
        const id = window.location.pathname.split('/')[2]
        const cs = document.getElementById("_csrf").value
        const text = await fetch("/answers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ answer_body: formVal.value, question_id: id, _csrf: cs }, formVal.value = "")
        })
        const result = await text.json();
        console.log(result.createAns.answer_body)
        const container = document.getElementById('answer-container')
        container.innerHTML += `<div id="q-answers"> <p>${result.createAns.answer_body}</p></div>`

    })
})
