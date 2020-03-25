console.log("Hello world");

let name = "Robin";
let questions = [
	`Describe ${name} in some words`,
	`If you could add one thing in ${name}'s life`,
	`If you could change one thing in  ${name}'s life`,
	`Something you don't like about ${name}`,
	`Any secret for ${name}`,
	`Frequently used words by ${name}`,
];
let answers = [];

let questionId = 0;
let questionElem = $("#question");
questionElem.html(questions[questionId++]);

function onClickCallback(skipped = false){
	answers[questionId-1] = skipped ? "Skipped" : $("#answer").val();
	console.log(answers);
	questionElem.html(questions[questionId++]);
	$("#answer").val("");
}

$("#submitButton").click(function(){
	onClickCallback();
});
$("#skipButton").click(function(){
	onClickCallback(true);
});

console.log("Questions: ", questions);