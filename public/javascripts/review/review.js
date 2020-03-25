console.log("Hello world");

let DEBUG = document.location.href.indexOf("debug") > -1;
if(DEBUG) console.error("DEBUG MODE ON");
let name = "Robin";
let questions = [
	`Describe ${name} in some words`,
	`If you could add one thing in ${name}'s life`,
	`If you could change one thing in  ${name}'s life`,
	`Something you don't like about ${name}`,
	`Any secret/question for ${name}`,
	`Frequently used words by ${name}`,
];
let answers = [];

let questionId = 0;
let questionElem = $("#question");
let reviewComplete = false;
questionElem.html(questions[questionId++]);


$("#submitButton").click(function(){
	onClickCallback();
});
$("#skipButton").click(function(){
	onClickCallback(true);
});

function onClickCallback(skipped = false){
	if(reviewComplete) {
		// TODO Thanks for your feedback
		// TODO Here is your review link
		let review_id = "sjdflkajsdf";
		let thanks = $("<h2>Much appreciated.</h2>");
		let link = $("<b>http://review.robin.engineer/" + review_id + "</b>");
		let emoji = $("<img/>").attr("src", "./images/satisfied-emoji.png")
			.attr("style", "width: 50%");
		$("div.question-block").html(thanks);
		$("div.question-block").append(link);
		$("div.question-block").append(emoji);
		$("#submitButton").fadeOut();
	}
	answers[questionId-1] = skipped ? "Skipped" : $("#answer").val();
	console.log(answers);
	questionElem.html(questions[questionId++]).fadeOut('fast').fadeIn('fast');
	$("#answer").val("").fadeOut().fadeIn();
	setProgressBar(Math.ceil((questionId/questions.length) * 100));
	
	if(questionId == questions.length){
		reviewComplete = true;
		$("#submitButton").text("Submit");
		$("#skipButton").fadeOut();
	}
}

function setProgressBar(progress){
	$("#progressbar").attr("aria-valuenow", progress).attr("style", "width: " + progress + "%").html(progress + "%");
}


console.log("Questions: ", questions);