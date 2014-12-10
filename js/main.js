// ----------------------------------------
// SVG images
// ----------------------------------------

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

			setUpClickHandlers();
			setUpTooltips();
		}, 'xml');

	});
}

$(function() {
  svgReplace();
});

$(function(){
//----------------
// VARS
//----------------

var breaktime, endbreak,nextbreak,input,inputstart,inputend;
var breakduration = 10;
var begintimediv = $('#start')
var endtimediv = $('#end')

// ----------------------------------------
// Display Time
// ----------------------------------------

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    // var s = today.getSeconds();
    var ampm = h >= 12 ? 'pm' : 'am';
    // add a zero in front of numbers<10
    m = checkTime(m);
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    document.getElementById('time').innerHTML = h + ":" + m + " " + ampm;
    t = setTimeout(function () {
        startTime()
    }, 500);
}

startTime();

// ----------------------------------------
// Keep track of time
// ----------------------------------------

function setGreeting(){
	refTime = new Date();
	refH = refTime.getHours();
	if (refH>=5 && refH<12){
		$('#clock').attr('class', 'morning')
		$('.good-day h3').html('Good Morning!')
		$('.good-day .greeting').html('Grab a cup of coffee and start your day off right!')
	} else if (refH>=12 && refH<18){
		$('#clock').attr('class', 'afternoon')
		$('.good-day h3').html('Good Afternoon!')
		$('.good-day .greeting').html('Grab a cup of coffee and continue your day off right!')
	}else if (refH>=18 || refH<5){
		$('#clock').attr('class', 'evening')
		$('.good-day h3').html('Good Evening!')
		$('.good-day .greeting').html('Grab a cup of coffee and end your day right!')
	}
}
setGreeting();
var greetInterval = setInterval(setGreeting, 10000);

// ----------------------------------------
// Toggle Visibility Of Different Templates
// ----------------------------------------

$('#info').hide();

$('#icon').on('click',function(){
	$('.home').fadeToggle(200);
	$('#settings').fadeToggle(200);
	$('#icon i').toggleClass('icon-settings icon-close');
});

$('#worklink').on('click',function(){
	b = $(this)
	$('#settings').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	$('#lunch').hide();
	$('#work-day').fadeIn(200);
	$('#work-day').css('position', 'absolute');
	begintimediv = $('#work-day #start')
	endtimediv = $('#work-day #end')
	$('#work-day').append('<input id="inputstart">')
	$('#work-day').append('<input id="inputend">')
	inputstart = $('#inputstart');
	inputend = $('#inputend');
	inputstart.attr({type: 'range',min: 0,max: 1440,step: 15,value: 540,hidden: true});
	inputend.attr({type: 'range',min: 0,max: 1440,step: 15,value: 1020,hidden: true});
	setMethods();
    begintimediv.html('9:00 AM')
    endtimediv.html('5:00 PM')
})
$('#lunchlink').on('click',function(){
	b = $(this)
	$('#settings').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	$('#work-day').hide();
	$('#lunch').fadeIn(200);
	$('#lunch').css('position', 'absolute');
	$('#lunch').append('<input id="inputstart">')
	$('#lunch').append('<input id="inputend">')
	begintimediv = $('#lunch #start')
	endtimediv = $('#lunch #end')
	inputstart = $('#inputstart');
	inputend = $('#inputend');
	inputstart.attr({type: 'range',min: 0,max: 1440,step: 15,value: 720,hidden: true});
	inputend.attr({type: 'range',min: 0,max: 1440,step: 15,value: 780,hidden: true});
	setMethods();
    begintimediv.html('12:00 AM')
    endtimediv.html('1:00 PM')
})
$('#aboutlink').on('click', function(){
	$('#settings').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	$('#about').fadeIn(200);
	$('#about').css('position', 'absolute');
})
$('.back').on('click',function(){
	$('#inputstart').detach();
	$('#inputend').detach();
	$('.icon-bar').fadeIn(200);
	$('#settings').fadeIn(200);
	$('#work-day').fadeOut(200);
	$('#about').fadeOut(200);
	$('#lunch').fadeOut(200);
})
$('.close').on('clcik',function(){
	$('.icon-bar').fadeIn(200);
	$('#settings').fadeOut(200);
	$('#work-day').fadeOut(200);
	$('#about').fadeOut(200);
	$('#lunch').fadeOut(200);
	$('#main-screen').fadeIn(200);
	$('#icon i').toggleClass('icon-settings icon-close');
})

//---------------------------------
// Get and set break time for user
//---------------------------------

$('#startDay').on('click',function(){
	$('.good-day h3, .good-day p, #startDay').css('display', 'none');
	$('#info').fadeIn(500);
	breaktime = moment(moment().add(2, 'h')).format('h:mm');
	endbreak = moment(moment().add(2, 'h').add(breakduration, 'm')).format('h:mm');
	// change to take a break in 'two hours' or 'half a hour'
	$('#info p').html("You should take a break in two hours at "+breaktime).fadeIn(1000).delay(5000).fadeOut(1000);
	breakTime();
	var breaktimeinterval = setInterval(breakTime, 1000)
});

function breakTime(){
	d = moment().format('h:mm');
	if(d == breaktime){
		$('#clock').attr('class', 'break')
		clearInterval(greetInterval);
		$('#info p').html('BREAK! take a load off').fadeIn(1000).delay(5000).fadeOut(1000);
	}else if(d == endbreak){
		setGreeting();
		greetInterval = setInterval(setGreeting, 10000);
		nextbreak = moment().add(2, 'h').format('h:mm')
		$('#info p').html('break is over. take your next break at '+nextbreak).fadeIn(1000).delay(5000).fadeOut(1000);
	}else if(d == nextbreak){
		breaktime = moment(moment().add(2, 'h')).format('h:mm');
		endbreak = moment(moment().add(2, 'h').add(breakduration, 'm')).format('h:mm');
	}

	endWorkDay = $.cookie('endwork');
	timearray = endWorkDay.split(':');
	endWorkMoment = moment(moment().hour(timearray[0]).minute(timearray[1])).format('h:mm');
	if (d == endWorkMoment){
		$('#info p').html('Your day is done').fadeIn(1000).delay(5000).fadeOut(1000);
		clearInterval(breaktimeinterval);
	}
}

//---------------------------------
// Fade info icon content onclick
//---------------------------------

var fade_out = function() {
	$('#info p').fadeOut();
}

$('#icon-info').click(function(){
	$('#info p').fadeToggle();
	setTimeout(fade_out, 5000);
});

//---------------------------------
// Inputs for work and lunch
//---------------------------------

var beginwork = moment(moment().hour(9).minute(0)).format('H:mm');
var endwork = moment(moment().hour(17).minute(0)).format('H:mm');
var beginlunch = moment(moment().hour(12).minute(0)).format('H:mm');
var endlunch = moment(moment().hour(13).minute(0)).format('H:mm');

function setMethods () {
	$('#sup').on('click',{input: inputstart, timediv: begintimediv}, inputUp)
	$('#sdown').on('click',{input: inputstart, timediv: begintimediv}, inputDown)
	$('#eup').on('click',{input: inputend, timediv: endtimediv}, inputUp)
	$('#edown').on('click',{input: inputend, timediv: endtimediv}, inputDown)
	$('#lsup').on('click',{input: inputstart, timediv: begintimediv}, inputUp)
	$('#lsdown').on('click',{input: inputstart, timediv: begintimediv}, inputDown)
	$('#leup').on('click',{input: inputend, timediv: endtimediv}, inputUp)
	$('#ledown').on('click',{input: inputend, timediv: endtimediv}, inputDown)
	$('#setwork, #setlunch').on('click', setCookie)
}

function inputUp(e){
    b = $(this)
    v = parseInt(e.data.input.val());
    v = v + 15
    e.data.input.val(v)
    format = formatTime(v)
    e.data.timediv.html(format)
    buttonPress(b, v)
}
function inputDown(e){
    b = $(this)
    v = parseInt(e.data.input.val());
    v = v - 15
    e.data.input.val(v)
    format = formatTime(v)
    e.data.timediv.html(format)
    buttonPress(b, v)
}

function buttonPress (m, v) {
    if(m.hasClass('startw')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        beginwork = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    }else if(m.hasClass('endw')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        endwork = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    }

    if(m.hasClass('startl')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        beginlunch = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    }else if(m.hasClass('endl')){
        valueh1 = Math.floor(v / 60);
        valuem1 = v - (valueh1 * 60);
        endlunch = moment(moment().hour(valueh1).minute(valuem1)).format('H:mm');
    }
}

function setCookie() {
	if($(this).attr('id') == 'setwork'){
	    $.removeCookie('startwork', beginwork);
	    $.removeCookie('endwork', endwork);
	    $.cookie('startwork', beginwork);
	    $.cookie('endwork', endwork);
	    $('#confirmwork em').text('Work has been set');
	}else if($(this).attr('id') == 'setlunch'){
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
    if(hours1.length == 1) hours1 = '0' + hours1;
    if(minutes1.length == 1) minutes1 = '0' + minutes1;
    if(minutes1 == 0) minutes1 = '00';
    if(hours1 >= 12){
        if (hours1 == 12){
            hours1 = hours1;
            minutes1 = minutes1 + " PM";
        }else{
            hours1 = hours1 - 12;
            minutes1 = minutes1 + " PM";
        }
    }else{

        hours1 = hours1;
        minutes1 = minutes1 + " AM";
    }
    if (hours1 == 0){
        hours1 = 12;
        minutes1 = minutes1;
    }
    return hours1+':'+minutes1;
}

});