let questions = JSON.parse(localStorage.getItem('questions')) || [];
let responses = JSON.parse(localStorage.getItem('responses')) || {};

document.getElementById('new-question-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const question = document.getElementById('question').value;

    const questionBox = document.createElement('div');
    questionBox.className = 'question-box';
    questionBox.innerHTML = `<strong>${title}</strong><p>${question}</p>`;
    questionBox.addEventListener('click', function() {
        displayQuestion(title, question);
    });

    document.getElementById('question-list').appendChild(questionBox);
    questions.push({ title, question });
    responses[title] = responses[title] || [];
    document.getElementById('new-question-form').reset();
    saveData();
    renderQuestionList();
});

function displayQuestion(title, question) {
    const rightPane = document.getElementById('question-form');
    rightPane.innerHTML = `
        <h2>${title}</h2>
        <p>${question}</p>
        <form class="response-form" id="response-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="comment">Comment:</label>
            <textarea id="comment" name="comment" required></textarea>
            <button type="submit">Submit</button>
        </form>
        <div id="responses"></div>
        <button id="resolve-button">Resolve</button>
    `;

    const responsesDiv = document.getElementById('responses');
    responses[title].forEach(response => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response';
        responseDiv.innerHTML = `<strong>${response.name}</strong><p>${response.comment}</p>`;
        responsesDiv.appendChild(responseDiv);
    });

    document.getElementById('response-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        const response = { name, comment };
        responses[title].push(response);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'response';
        responseDiv.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
        responsesDiv.appendChild(responseDiv);
        document.getElementById('response-form').reset();
        saveData();
    });

    document.getElementById('resolve-button').addEventListener('click', function() {
        rightPane.innerHTML = `
            <h2>Ask a Question</h2>
            <form id="new-question-form">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
                <label for="question">Question:</label>
                <textarea id="question" name="question" required></textarea>
                <button type="submit">Submit</button>
            </form>
        `;
        document.getElementById('new-question-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const question = document.getElementById('question').value;

            const questionBox = document.createElement('div');
            questionBox.className = 'question-box';
            questionBox.innerHTML = `<strong>${title}</strong><p>${question}</p>`;
            questionBox.addEventListener('click', function() {
                displayQuestion(title, question);
            });

            document.getElementById('question-list').appendChild(questionBox);
            questions.push({ title, question });
            responses[title] = responses[title] || [];
            document.getElementById('new-question-form').reset();
            saveData();
            renderQuestionList();
        });
    });
}

// Function to re-render the question list
function renderQuestionList() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    questions.forEach(({ title, question }) => {
        const questionBox = document.createElement('div');
        questionBox.className = 'question-box';
        questionBox.innerHTML = `<strong>${title}</strong><p>${question}</p>`;
        questionBox.addEventListener('click', function() {
            displayQuestion(title, question);
        });
        questionList.appendChild(questionBox);
    });
}

// Function to save data to local storage
function saveData() {
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('responses', JSON.stringify(responses));
}

// Initial render of the question list
renderQuestionList();

// Search functionality
document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredQuestions = questions.filter(({ title, question }) => 
        title.toLowerCase().includes(searchTerm) || question.toLowerCase().includes(searchTerm)
    );
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    filteredQuestions.forEach(({ title, question }) => {
        const questionBox = document.createElement('div');
        questionBox.className = 'question-box';
        questionBox.innerHTML = `<strong>${title}</strong><p>${question}</p>`;
        questionBox.addEventListener('click', function() {
            displayQuestion(title, question);
        });
        questionList.appendChild(questionBox);
    });
});
