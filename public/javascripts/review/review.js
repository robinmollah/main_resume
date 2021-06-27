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
questionElem.html(questions[questionId]);


$("#submitButton").click(function(){
	onClickCallback();
});
$("#skipButton").click(function(){
	onClickCallback(true);
});

function onClickCallback(skipped = false){
	if(questionId == questions.length - 1) {
		// TODO Thanks for your feedback
		// TODO Here is your review link
		answers[questionId] = skipped ? "Skipped" : $("#answer").val();
		$("#question").fadeOut("faster");
		$("#answer").fadeOut("faster");
		$("#submitButton").fadeOut();
		$(".submitting").fadeIn();
		return;
	}
	answers[questionId] = skipped ? "Skipped" : $("#answer").val();
	questionId++;
	questionElem.html(questions[questionId]).fadeOut('fast').fadeIn('fast');
	$("#answer").val("").fadeOut().fadeIn();
	setProgressBar(Math.ceil((questionId/(questions.length - 1)) * 100));

	if(questionId == questions.length - 1){
		$("#submitButton").text("Submit").click(function(){
			console.log(getAnswer().val(), answers);
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
	$.getJSON("https://jsonip.com/?callback=?", function (data) {
		let ip = data.ip.split(".")
					.map(value => parseInt(value).toString(16))
					.join("-");
		$("#review_id").text(btoa(ip));
		$.ajax({
			url: "/review/submit",
			type: "POST",
			data: JSON.stringify({answers: answers, id: ip}),
			success: function(response){
				console.log("Response", response);
				$(".submitting").fadeOut();
				$(".submit-success").fadeIn();
			},
			error: function(error){
				console.error("Error: ", error);
				$(".submit-error").fadeIn();
			},
			dataType: 'json',
			contentType : 'application/json',
			processData: false
		});
	});
}


console.log("Questions: ", questions);
