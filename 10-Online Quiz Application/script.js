// Each question stores its options and the correct option number.
var questions = [
  {
    text: "Which language is used to structure a web page?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 0
  },
  {
    text: "Which language is used to style a web page?",
    options: ["Python", "CSS", "C", "Java"],
    answer: 1
  },
  {
    text: "Which keyword declares a variable in this example?",
    options: ["make", "value", "var", "write"],
    answer: 2
  },
  {
    text: "Which method selects an element by its id?",
    options: ["getElementById()", "getElementsByClass()", "selectId()", "findId()"],
    answer: 0
  },
  {
    text: "Which method displays a message in the browser console?",
    options: ["console.log()", "page.write()", "show.text()", "message()"],
    answer: 0
  }
];

var questionList = document.getElementById("questionList");
var quizForm = document.getElementById("quizForm");
var result = document.getElementById("result");

function showQuestions() {
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    var questionBox = document.createElement("section");
    questionBox.className = "question";

    var heading = document.createElement("h2");
    heading.textContent = (i + 1) + ". " + question.text;
    questionBox.appendChild(heading);

    for (var j = 0; j < question.options.length; j++) {
      var label = document.createElement("label");
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "question" + i;
      radio.value = j;
      label.className = "option";
      label.appendChild(radio);
      label.appendChild(document.createTextNode(question.options[j]));
      questionBox.appendChild(label);
    }

    questionList.appendChild(questionBox);
  }
}

quizForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var correct = 0;

  for (var i = 0; i < questions.length; i++) {
    var selectedAnswer = document.querySelector(
      'input[name="question' + i + '"]:checked'
    );

    if (selectedAnswer !== null &&
        Number(selectedAnswer.value) === questions[i].answer) {
      correct++;
    }
  }

  var incorrect = questions.length - correct;
  result.textContent = "Quiz complete! Correct: " + correct +
    " | Incorrect: " + incorrect + " | Score: " + correct +
    " out of " + questions.length + ".";
});

showQuestions();
