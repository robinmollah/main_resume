console.log("Hello world");

let name = "Robin";
let questions = [
	`Describe ${name} in some words`,
	`If you could add one thing in ${name}'s life`,
	`If you could change one thing in  ${name}'s life`,
	`Something you don't like about ${name}`,
	`Any secret for ${name}`
];
let answers = [];

let questionId = 0;
let questionElem = $("#question");
questionElem.html(questions[questionId++]);
$("#submitButton").click(function(){
	questionElem.attr("data-qid", questionId);
	questionElem.html(questions[questionId++]);
	console.log("value", $("#answer").val());
});
$("#skipButton").click(function(){
	questionElem.html(questions[questionId++]);
});

console.log("Questions: ", questions);