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
questionElem.html(questions[questionId]);


$("#submitButton").click(function(){
	onClickCallback();
});
$("#skipButton").click(function(){
	onClickCallback(true);
});

function onClickCallback(skipped = false){
	if(questionId == questions.length + 1) {
		// TODO Thanks for your feedback
		// TODO Here is your review link
		answers[questionId] = skipped ? "Skipped" : $("#answer").val();
		let review_id = "------";
		let thanks = $("<h2>Much appreciated.</h2>");
		let link = $("<span class='review-url'>http://review.robin.engineer/id/<span id='review_id'>"
			+  review_id + "</span></span>");
		let emoji = $("<img/>").attr("src", "./images/satisfied-emoji.png")
			.attr("style", "width: 50%");
		$("#question").fadeOut("faster");
		$("#answer").fadeOut("faster");
		$("div.question-block").append(thanks);
		$("div.question-block").append(link);
		$("div.question-block").append(emoji);
		$("#submitButton").fadeOut();
		return;
	}
	answers[questionId] = skipped ? "Skipped" : $("#answer").val();
	console.log(answers);
	questionElem.html(questions[questionId++]).fadeOut('fast').fadeIn('fast');
	$("#answer").val("").fadeOut().fadeIn();
	console.log(questionId, questionId/questions.length + 1);
	setProgressBar(Math.ceil((questionId/(questions.length +1)) * 100));
	
	if(questionId == questions.length){
		reviewComplete = true;
		$("#submitButton").text("Submit").click(function(){
			console.log(getAnswer().val(), answers);
			console.log("Answer", $("#answer"));
			answers[questionId] = skipped ? "Skipped" : $("#answer").val();
			submitReview(answers);
		});
		$("#skipButton").fadeOut();
	}
}

function getAnswer(){
	return $("#answer");
}

function setProgressBar(progress){
	$("#progressbar").attr("aria-valuenow", progress)
		.attr("style", "width: " + progress + "%")
		.html(progress + "%");
}

function submitReview(answers){
	$.getJSON("http://jsonip.com/?callback=?", function (data) {
		$("#review_id").text(btoa(data.ip));
		$.ajax({
			url: "/review/submit",
			type: "POST",
			data: JSON.stringify({answers: answers, id: data.ip}),
			success: function(response){
				console.log("Response", response);
			},
			error: function(error){
				console.error("Error: ", error);
			},
			dataType: 'json',
			contentType : 'application/json',
			processData: false
		});
	});
}


console.log("Questions: ", questions);