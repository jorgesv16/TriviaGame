
var intervalId;
var counting;
var index = 0;
var count = 0;
var time;
var correctCounter = 0;
var incorrectCounter = 0;
var outCounter = 0;

var trivia = {
	questions: [
		"Who wrote an ancient Chinese military treatise known as 'The Art of War'?",
		"What famous actor became Governor of California in 2003?",
		"The Great Red Spot is a gigantic storm located on which planet in our solar system?",
		"What did the famous Hollywood sign, located in Los Angeles, originally say?",
		"Which state of the United States is the smallest?",
		"Who is credited with suggesting the word 'hello' be used when answering the telephone?",
		"Callisto is the name of a moon orbiting what planet in our solar system?"
		],

	answers: {
		options: [
			["Mao Zedong", "Sun Tzu", "Jack Ma", "Confucius"],
			["Justin Beiber", "Kim Kardashian", "Arnold Schwarzenegger", "Jake Paul"],
			["Jupiter", "Venus", "Mars", "Mercury"],
			["Woodland", "Hollywoodland", "La La Land", "Hollyland"],
			["Texas", "Las Vegas", "Wyoming", "Rhode Island"],
			["Nikola Tesla", "George Washington", "Thomas Edison", "Ernest Lawrence"],
			["Saturn", "Jupiter", "Neptune", "Venus"]
		],
		index: [1, 2, 0, 1, 3, 2, 1]
	},

	displayStart: function() {

		var start = $("<div>");

		start.addClass("begin");

		start.append("Start Quiz");

		$(".answers-box").append(start);

		$(".begin").click(function() {
			trivia.startQuiz();
		});
	},

	startQuiz: function() {

		$(".third-row").empty();
		$(".answers-box").empty();

		setTimeout(function() {
			displayCorrectAnswer(index, event)}, 
			30000);

		counting = setInterval(function() {
			count++;
			time = 30-count;

			$(".second-row").text("Time Remaining: " + time);
		}, 1000);

		$(".third-row").append(trivia.questions[index]);

		trivia.displayOptions(index);

	},


	displayOptions: function(index) {

		for(var i = 0; i < 4; i++) {

			var qs = $("<div>");
			qs.addClass("option");
			qs.attr("id", i);
			qs.text(trivia.answers.options[index][i]);
			$(".answers-box").append(qs);

		}

		$(".option").click(function(event) {
			displayCorrectAnswer(index, event);
		});
	},

	showScore: function() {
		$(".third-row").empty();
		$(".answers-box").empty();

		$(".third-row").append("End of Game");
		$(".answers-box").append("Correct Responses: " + correctCounter);
		$(".answers-box").append("Incorrect Responses: " + incorrectCounter);
		$(".answers-box").append("Out of Time: " + outCounter);
	}
}

function displayCorrectAnswer (i, event) {
	//console.log(event);
	clearInterval(counting);
	count = 0;

	if (event === undefined) {

		$(".second-row").empty();
		$(".third-row").empty();
		$(".answers-box").empty();

		$(".third-row").append("<div>Out of Time!</div><br>");
		$(".third-row").append("<div>The Correct Answer was: " + trivia.answers.options[i][trivia.answers.index[i]] + "</div>");
		outCounter++;

	} else {
		choice = $(event)["0"].target.attributes[1].value;

		$(".second-row").empty();
		$(".third-row").empty();
		$(".answers-box").empty();

		if (trivia.answers.index[i] == choice) {
			$(".third-row").append("<div>Correct!</div>");
			correctCounter++;
		} else {
			$(".third-row").append("<div>Incorrect!</div><br>");
			$(".third-row").append("<div>The Correct Answer was: " + trivia.answers.options[i][trivia.answers.index[i]] + "</div>");
			incorrectCounter++;
		}
	}

	index++;

	if (index === trivia.questions.length){
		setTimeout(trivia.showScore, 7000);
	} else {
		setTimeout(trivia.startQuiz, 7000);
	}
};

trivia.displayStart();

