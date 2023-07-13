import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import chess from './assets/images/chess.jpg';
import 'Trivia Questions';

$("img").attr("src", chess);
// to clear fields
function clearFields() {
    $('#location').val("");
    $('.showErrors').text("");
    $('.showHumidity').text("");
    $('.showTemp').text("");
}

//selecting all required elements
const start_btn = $(".start_btn button");
const info_box = $(".info_box");
const exit_btn = $(".buttons .quit");
const continue_btn = $(".buttons .restart");
const quiz_box = $(".quiz_box");
const result_box = $(".result_box");
const option_list = $(".option_list");
const time_line = $("header .time_line");
const timeText = $(".timer .time_left_txt");
const timeCount = $(".timer .timer_sec");

$(document).ready(function () {

    start_btn.click(function () {
        info_box.addClass("activeInfo"); // show info box
    });
    // if exitQuiz button clicked
    exit_btn.click(function () {
        info_box.removeClass("activeInfo"); //hide info box
    });

    // if continueQuiz button clicked
    continue_btn.click(function () {
        info_box.removeClass('activeInfo'); // hide info box
        quiz_box.addClass('activeQuiz'); // show quiz box
        showQuetions(0); //calling showQestions function
        queCounter(1); //passing 1 parameter to queCounter
        startTimer(15); //calling startTimer function
        startTimerLine(0); //calling startTimerLine function
    });
});
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = $(".buttons .restart", result_box);
const quit_quiz = $(".buttons .quit", result_box);

// if restartQuiz button clicked
restart_quiz.click = function () {
    $(".quiz_box").addClass("activeQuiz"); //show quiz box
    $(".result_box").removeClass("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.removeClass("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.on('click', function () {
    //reload the current window
    location.reload();

});

const next_btn = $("footer .next_btn");
const bottom_ques_counter = $("footer .total_que");

// if Next Que button clicked
next_btn.on("click", function () {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
});

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 549) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}

$('.que_text').click(function() {
    let questions = $('.que_text').val();
    clearFields();
    let promise = WeatherService.getWeather(city);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
