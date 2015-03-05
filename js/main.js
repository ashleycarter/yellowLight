// -----------------------------------------------------
// Display Current Time
// -----------------------------------------------------

var currentTime = null,
time = null;

var update = function () {
    time = moment(new Date());
    currentTime.html(time.format('h:mm')).append('<span id="ampm">' + time.format('a') + '</span>');;
};

currentTime = $('#time');
update();
setInterval(update, 1000);


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

    if($('#icon i').hasClass('icon-settings')) {
        $('#return-to-home').show();
    }
});

$('#worklink').on('click',function(){
    $('#settings, .icon-bar').fadeOut(200);
    // $('#lunch').hide();
    $('#work-day').fadeIn(200);
    $('#work-day').css('position', 'absolute');
    begintimediv = $('#work-day #start');
    endtimediv = $('#work-day #end');

    $('#work-day').append('<input id="inputstart">');
    $('#work-day').append('<input id="inputend">');

    inputstart = $('#inputstart');
    inputend = $('#inputend');
    inputstart.attr({type: 'range',min: 0,max: 1440,step: 15,value: 540,hidden: true});
    inputend.attr({type: 'range',min: 0,max: 1440,step: 15,value: 1020,hidden: true});
    setMethods();
    begintimediv.html('9:00 AM');
    endtimediv.html('5:00 PM');
});

$('#lunchlink').on('click',function(){
    $('#settings, .icon-bar').fadeOut(200);
    $('.icon-bar').fadeOut(200);
    // $('#work-day').hide();
    $('#lunch').fadeIn(200);

    $('#lunch').append('<input id="inputstart">');
    $('#lunch').append('<input id="inputend">');

    begintimediv = $('#lunch #start');
    endtimediv = $('#lunch #end');
    inputstart = $('#inputstart');
    inputend = $('#inputend');
    inputstart.attr({type: 'range',min: 0,max: 1440,step: 15,value: 720,hidden: true});
    inputend.attr({type: 'range',min: 0,max: 1440,step: 15,value: 780,hidden: true});
    setMethods();
    $('.icon-bar').fadeOut(200);
    $('.icon-bar').fadeOut(200);
    // $('#work-day').hide();
    $('#lunch').fadeIn(200);

    $('#lunch').append('<input id="inputstart">');
    $('#lunch').append('<input id="inputend">');

    begintimediv = $('#lunch #start');
    endtimediv = $('#lunch #end');
    inputstart = $('#inputstart');
    inputend = $('#inputend');
    inputstart.attr({type: 'range',min: 0,max: 1440,step: 15,value: 720,hidden: true});
    inputend.attr({type: 'range',min: 0,max: 1440,step: 15,value: 780,hidden: true});
    setMethods();
    begintimediv.html('12:00 AM');
    endtimediv.html('1:00 PM');
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
    $('#work-day, #about, #lunch').fadeOut(200);
});

$('.close').on('click',function(){
    $('.icon-bar, #main-screen, .home').fadeIn(200);
    $('#settings, #work-day, #about, #lunch').fadeOut(200);
    $('#icon i').toggleClass('icon-settings icon-close');
});

//---------------------------------
// Inputs for work and lunch
//---------------------------------

var beginwork = moment(moment().hour(9).minute(0)).format('H:mm');
var endwork = moment(moment().hour(17).minute(0)).format('H:mm');
var beginlunch = moment(moment().hour(12).minute(0)).format('H:mm');
var endlunch = moment(moment().hour(13).minute(0)).format('H:mm');

function setMethods () {
    $('#sup').on('click',{input: inputstart, timediv: begintimediv}, inputUp);
    $('#sdown').on('click',{input: inputstart, timediv: begintimediv}, inputDown);
    $('#eup').on('click',{input: inputend, timediv: endtimediv}, inputUp);
    $('#edown').on('click',{input: inputend, timediv: endtimediv}, inputDown);
    $('#lsup').on('click',{input: inputstart, timediv: begintimediv}, inputUp);
    $('#lsdown').on('click',{input: inputstart, timediv: begintimediv}, inputDown);
    $('#leup').on('click',{input: inputend, timediv: endtimediv}, inputUp);
    $('#ledown').on('click',{input: inputend, timediv: endtimediv}, inputDown);
    $('#setwork, #setlunch').on('click', setCookie);
}

function inputUp(e){
    b = $(this);
    v = parseInt(e.data.input.val(), 10);
    v = v + 15;
    e.data.input.val(v);
    format = formatTime(v);
    e.data.timediv.html(format);
    buttonPress(b, v);
}

function inputDown(e){
    b = $(this);
    v = parseInt(e.data.input.val(), 10);
    v = v - 15;
    e.data.input.val(v);
    format = formatTime(v);
    e.data.timediv.html(format);
    buttonPress(b, v);
}

function buttonPress (m, v) {
    if(m.hasClass('startw')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        beginwork = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    } else if(m.hasClass('endw')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        endwork = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    }

    if(m.hasClass('startl')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        beginlunch = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    } else if(m.hasClass('endl')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        endlunch = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    }
}

function setCookie() {
    if($(this).attr('id') === 'setwork'){
        $.removeCookie('startwork', beginwork);
        $.removeCookie('endwork', endwork);
        $.cookie('startwork', beginwork);
        $.cookie('endwork', endwork);
        $('#confirmwork em').text('Work has been set');
    } else if($(this).attr('id') === 'setlunch'){
        $.removeCookie('startlunch', beginwork);
        $.removeCookie('endlunch', endwork);
        $.cookie('startlunch', beginlunch);
        $.cookie('endlunch', endlunch);
        $('#confirmlunch em').text('Lunch has been set');
    }
}

function formatTime(v){
    var hours1 = Math.floor(v / 60);
    var minutes1 = v - (hours1 * 60);
    if(hours1.length === 1) hours1 = '0' + hours1;
    if(minutes1.length === 1) minutes1 = '0' + minutes1;
    if(minutes1 === 0) minutes1 = '00';
    if(hours1 >= 12){
        if (hours1 === 12){
            minutes1 = minutes1 + " PM";
        } else{
            hours1 = hours1 - 12;
            minutes1 = minutes1 + " PM";
        }
    } else {
        minutes1 = minutes1 + " AM";
    }
    if (hours1 === 0){
        hours1 = 12;
    }
    return hours1+':'+minutes1;
}

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
    if (true){ // checkCookies('work') || checkCookies('lunch')  add in if stmt
        defaultTimer.start(ms_defaultTimer, 'MM:SS'); // start countdown
        $('#clock').removeClass('break');
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
    $('#clock').removeClass('break');
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
    $('#clock').delay(2000).addClass('break');
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

// -----------------------------------------------------
// Cookie functions to test
// -----------------------------------------------------

// Check cookies to see if timer is trying to start outside of work hours or during lunch.
// params bool, bool
function checkCookies(timeOfDay){
    (timeOfDay == "work") ? w = true : w = false;
    (timeOfDay == "lunch") ? l = true : l = false;

    if (w){
        var sw = moment($.cookie('startwork'), 'H:mm');
        var ew = moment($.cookie('endwork'), 'H:mm');
        return moment(moment(), 'H:mm').isBetween(sw,ew);
    }
    if(l){
        var sl = moment($.cookie('startlunch'), 'H:mm');
        var el = moment($.cookie('endlunch'), 'H:mm');
        return moment(moment(), 'H:mm').isBetween(sl,el);
    }
}
