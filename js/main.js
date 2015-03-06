// -----------------------------------------------------
// Display Current Time
// -----------------------------------------------------

var currentTime = null,
    time = null;

var update = function () {
    time = moment(new Date());
    currentTime.html(time.format('h:mm')).append('<span id="ampm">' + time.format('a') + '</span>');
};

currentTime = $('#current-time');
update();
setInterval(update, 1000);


// -----------------
// Analog Clock Function
// -----------------

$('#clock-display').click(function() {
    $('#clock-display-settings').toggleClass('digital analog');

    if($('#clock-display-settings').hasClass('analog')) {
        $('.analog-clock').show();
        $('#current-time').hide();
    } else {
        $('.analog-clock').hide();
        $('#current-time').show();
    }
});

    // if($('#sound-settings').hasClass('on')) {
    //     timerAudio.play();
    // } 

$(function(){
  analogClock();
});

function analogClock() {

  // Get time from moment.js with specified format
  var now = moment().format("hhmmssA");

  // Move the clock hands
  rotateHands(now[4] + now[5], now[2] + now[3], now[0] + now[1]);
}

function rotateHands(sec,min,hour) {
  var degSec = 360/60*sec;
  var degMin = 360/60*min;
  var degHour = 360/12*hour;

  var sHand = $('.seconds-container');
  sHand.css({
        "-webkit-transform": "rotate(" + degSec + "deg)",
        "-moz-transform": "rotate(" + degSec + "deg)",
        "transform": "rotate(" + degSec + "deg)" 
    });

  var mHand = $('.minutes-container');
  mHand.css({
        "-webkit-transform": "rotate(" + degMin + "deg)",
        "-moz-transform": "rotate(" + degMin + "deg)",
        "transform": "rotate(" + degMin + "deg)"
    });

  var hHand = $('.hours-container');
  hHand.css({
        "-webkit-transform": "rotate(" + degHour + "deg)",
        "-moz-transform": "rotate(" + degHour + "deg)",
        "transform": "rotate(" + degHour + "deg)" 
    });
}

setInterval(analogClock, 1000);


// -----------------
// SVG images
// -----------------

// PNG Fallbacks
if (!Modernizr.svg) {
    // SVG Inline Images
    var imgs = document.getElementsByTagName('img');
    var svgExtension = /.*\.svg$/
    var l = imgs.length;
    for(var i = 0; i < l; i++) {
        if(imgs[i].src.match(svgExtension)) {
            imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
            console.log(imgs[i].src);
        }
    }
    // SVG Background Images
    $('#clock').addClass('no-svg');
}

// Replace all SVG images with inline SVG
function svgReplace() {
    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
}

$(function() {
    svgReplace();
});


// -----------------------------------------------------
// Open App Screen
// -----------------------------------------------------

// Greeting based on time of day

function setGreeting(){
    refTime = new Date();
    refH = refTime.getHours();
    if (refH>=5 && refH<12){
        $('#clock').addClass('morning');
        $('.good-day h3').html('Good Morning!');
        $('.good-day .greeting').html('Let\'s start your day off right!');
    } else if (refH>=12 && refH<18){
        $('#clock').addClass('afternoon');
        $('.good-day h3').html('Good Afternoon!');
        $('.good-day .greeting').html('Roll up your sleeves and don\'t slow this awesome day down!');
    } else if (refH>=18 || refH<5){
        $('#clock').addClass('evening');
        $('.good-day h3').html('Good Evening!');
        $('.good-day .greeting').html('Burning the midnight oil? Make sure you don\'t burn yourself out!');
    }
    var greetTimeout = setTimeout(setGreeting, 10000);
}

setGreeting();

$('#info').hide(); // CSS display none on page load


// -----------------------------------------------------
// Toggle Visibility Of Different Templates
// -----------------------------------------------------

$('#icon').on('click',function(){
    $('.home, #settings').fadeToggle(200);
    $('#icon i').toggleClass('icon-settings icon-close');

    if($('#icon i').hasClass('icon-close')) {
        $('#return-to-home').hide();
    }

    var a = $('#clock');
    var b = $('#icon i');

    if( (a.hasClass('timer-started')) && (b.hasClass('icon-settings')) ) {
        $('#return-to-home').show()
    }
    
});

$('#aboutlink').on('click', function(){
    $('#settings, .icon-bar').fadeOut(200);
    $('#about').fadeIn(200);
    $('.icon-bar').fadeOut(200);
    $('#about').fadeIn(200);
});

$('.back').on('click',function(){
    $('#inputstart, #inputend').detach();
    $('.icon-bar, #settings').fadeIn(200);
    $('#about').fadeOut(200);
});

$('.close').on('click',function(){
    $('.icon-bar, #main-screen, .home').fadeIn(200);
    $('#settings, #about').fadeOut(200);
    $('#icon i').toggleClass('icon-settings icon-close');
});


// -----------------------------------------------------
// Fade info icon content onclick
// -----------------------------------------------------

var fade_out = function() {
    $('#info p').fadeOut();
};

$('#icon-info').click(function(){
    $('#info p').fadeToggle();
    setTimeout(fade_out, 5000);
});


// -----------------------------------------------------
// Entering Main App Section (starting the day)
// -----------------------------------------------------

// var ms_defaultTimer = 5.4e6; // ninety minute timer in ms
var ms_defaultTimer = 6e4; // needs to be in ms

var defaultTimer = new Tock({
    countdown: true,
    time: ms_defaultTimer,
    interval: 6e4, // one minute
    callback: defaultCountdown,
    complete: timeout_done
});

$('#startDay').on('click', timeout_init);
$('#returnDay').on('click', timeout_init);

function defaultCountdown() {
    var minutes_til = Math.round(defaultTimer.timeToMS(defaultTimer.lap()) / 60) / 1000;
    $('.arrow_box span').html(minutes_til);
}

function timeout_init() {
    if (true) { 
        defaultTimer.start(ms_defaultTimer, 'MM:SS'); // start countdown
        $('#clock').removeClass('break').addClass('timer-started');
        $('.good-day h3, .good-day p, #startDay, #end-break').fadeOut(100);
        $('#info, #return-to-home, #icon').fadeIn(1000);
        $('#info p').fadeIn(1000).delay(5000).fadeOut(1000);

    } else {
        // TODO do something if user wants to over ride for timer outside of work.
        alert("You\'re off work. Go to sleep!");
    }
}

$('#laterBreak').on('click', function(){
    defaultTimer.start(ms_defaultTimer); // start countdown
    $('#clock').removeClass('break').addClass('timer-started');
    $('#break, #return-to-home').fadeToggle(500);
    $('#info, #return-to-home').fadeIn(1000);
    $('#info p').html("You should take a break in " + defaultTimer + " minutes.").fadeIn(1000).delay(5000).fadeOut(1000);
});

// -----------------------------------------------------
// Break screen
// -----------------------------------------------------

// Sounds
var timerAudio = new Audio("snd/break.wav");
var breakAudio = new Audio("snd/end-break.wav");

$('#sounds').click(function() {
    $('#sound-settings').toggleClass('on off');
});

// You deserve a break!
function timeout_done(){
    $('#icon, #return-to-home, #settings').hide();
    $('#break').fadeToggle(500);
    $('#clock').delay(2000).addClass('break').removeClass('timer-started');
    defaultTimer.stop();

    if($('#sound-settings').hasClass('on')) {
        timerAudio.play();
    } 
}

// var ms_breakTimer = 9e5; // 15 minute timer in ms
var ms_breakTimer = 6e4; // needs to be in ms

var breakTimer = new Tock({
    countdown: true,
    time: ms_breakTimer,
    interval: 6e4, // one minute
    callback: breakCountdown,
    complete: breakTime_done
});

// Yes Please! button
$('#startBreak').on('click', breakTimeout_init);

function breakCountdown() {
    var minutes_til_end = Math.round(breakTimer.timeToMS(breakTimer.lap()) / 60) / 1000;
    $('.arrow_box span').html(minutes_til_end);
}

function breakTimeout_init() {
    $('#icon, #return-to-home, #icon-settings').show();

    if($('#icon i').hasClass('icon-close')) {
        $('#return-to-home').hide();
    }

    if($('#icon i').hasClass('icon-settings')) {
        $('#return-to-home').show();
    }

    breakTimer.start(ms_breakTimer); // start countdown
    $('#break').fadeToggle(500);
    $('#clock').addClass('break');
    $('#info p').fadeIn(1000).delay(5000).fadeOut(1000);
}

// -----------------------------------------------------
// Return // Ending Break
// -----------------------------------------------------

// Feeling refreshed?
function breakTime_done(){
    $('#icon, #return-to-home').hide();
    $('#end-break').fadeToggle(500);
    $('#clock').delay(2000).removeClass('break');
    breakTimer.stop();

    if($('#sound-settings').hasClass('on')) {
        breakAudio.play();
    } 
}

// -----------------------------------------------------
// Return Home
// -----------------------------------------------------

// Heading out early?
 $('#return-to-home').click(function() {
    $('#icon, #return-to-home').hide();
    $('#return-home').fadeIn();
 });

 // Still here
 $('#still-here').click(function() {
    $('#icon, #return-to-home').show();
    $('#return-home').fadeOut();
 });

// Closing up shop
$('#leaving-now').click(function() {
    $('#endBreak, #break, #info, #return-to-home, #return-home').fadeOut();
    $('.good-day h3, .good-day p, #startDay, #icon').fadeIn(1000);
    $('#clock').removeClass('break');
    defaultTimer.stop();
    breakTimer.stop();
});

