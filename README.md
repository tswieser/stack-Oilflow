# Welcome to Stack-Oil-flow

Stack Oil flow is a social based platform that allows users to utilize question and answer based features to both share and gain Automotive based knowledge. The main goal of Stack Oil Flow is to cultivate an environment  of automotive enthusiasts, both recreational and professional to come together over a shared passion.

<br>

[Click here to see it in action!](https://stack-oil-flow.herokuapp.com/)

<br>

# Technologies Used

Stack Oil flow was built using JavaScript, PUG, and CSS. The main logic used was written in JavaScript and utilizes Express. The structure of the site is generated using PUG and CSS was used to style the generated PUG.

<br>

# Main Features
## Login and User Signup

Being a social platform a main feature of the site is the ability of the user to create an account and be able to sign in to participate in community discussions. The users passwords are protected by being stored using bcrypt password hashing. In addition to having an account theres is also authorization and authentication for the user that utilizes session based storage.

<br>

[Click here create a Free account to explore](https://stack-oil-flow.herokuapp.com/users/new)

<br>

## Questions and Answers
Another main function of Stack Oil Flow is the ability to post questions that are focused on automotive related topics as well as the ability for other users to answer those posted questions. There is a main questions page that dynamically updates the page based on the questions stored in the database and allows users to click on individual questions where they will be rerouted to that questions individual page where they can respond to that individual question. This Answer feature utilizes and API and ajax to dynamically update the page when you submit your answer without requiring a refresh of the page.

<br>

```javascript
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
```

<br>

## Up Votes and Down Votes
The ability to up and down vote a question and answer is a key part of the user experience for the stack over flow community. This functions allows the users to up vote questions and answers so that other users can see which answers the community sees as most helpful or what questions are the most relevant. The voting functionality is handled on the individual question page where you can view and submit answers and includes a counter. There is also a counter rendered on the main questions page that tracks the number of like that individual question has gotten.


<br>

The logic for the counter on the main questions page is handed by first creating an object that we pass in each piece of information from the Questions database and includes the Answers and Question_likes database that is needed to be rendered via the PUG file. The votes portion is handled by a nested loop to iterate through each individual question then iterate through that questions likes to create a counter based on the true and false values stored in the database.

<br>

[For more information on our Database structure check out our Wiki](https://github.com/tswieser/stack-Oilflow/wiki/Database-Schema)

<br>

```javascript
class QuestionObject {
    constructor(id, title, body, answers, votes) {
        this.id = id,
        this.title = title,
        this.body = body,
        this.answers = answers,
        this.votes = votes
    }
}

router.get('/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    let answersArr = []

    const questionsId = parseInt(req.params.id, 10)
    const question = await Question.findByPk(questionsId)
    const answers = await Answer.findAll({
        where: {
            question_id: req.params.id
        },
        include: [Question, Answer_like]
    })

    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i]
        let answerVotes = answers[i].Answer_likes;
        let count = 0

        for (let j = 0; j < answerVotes.length; j++) {
            let answerLikes = answerVotes[j].answer_votes
            if (answerLikes === true) count++
            else if (answerLikes === false) count--
        }

        let newAnswer = new AnswerObject(answer.id, answer.answer_body, answer.user_id, count)
        answersArr.push(newAnswer)
    }

```
<br>

In order to handle the actual voting portion of the logic, both answer and question voting was handled through the use ajax on the front end in order to ensure a smooth experience for the user. In order to implement this we have set up event listeners on all of the answer and question buttons that are created dynamically. After One of them is clicked it is determined if the click on the page was connected to an up vote or a down vote and that information is passed along where the answer or question id is extracted and sent to the back end where it can be stored into the database. It then seamlessly updates the counter using the same logic as the code above.

<br>

```javascript
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
```
* The above code is an example of how the upvote for answers is handled. Similar Logic is applied to down vote feature as well as the votes associated to the questions page.

<br>

## Search
The Final primary feature of Stack Oil Flow is the utilization of a search feature. The search feature is available via the navigation bar which is carried across every page of the site. In order to handle the search feature logic, after a key word is entered into the search bar and the user hits enter the information is sent and filtered through the database where question titles that contain the searched information will be populated onto the the questions page. The

<br>

```javascript
    searchbar.addEventListener("keypress", async(e) => {
        const res = await fetch("/search");
        const result = await res.json();

        const filtered = result.questionsArr.filter(obj => {
           return obj.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        if (e.key === "Enter") {
            if (filtered.length) {

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
```
