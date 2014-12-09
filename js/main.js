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

//----------------
// VARS
//----------------

var breaktime, endbreak,nextbreak;
var breakduration = 10;

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

$('#icon').click(function(){
	$('.home').fadeToggle(200);
	$('#settings').fadeToggle(200);
	$('#icon i').toggleClass('icon-settings icon-close');
});

$('#worklink').click(function(){
	$('#settings').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	$('#work-day').fadeIn(200);
	$('#work-day').css('position', 'absolute');
})
$('#lunchlink').click(function(){
	$('#settings').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	$('#lunch').fadeIn(200);
	$('#lunch').css('position', 'absolute');
})
$('#aboutlink').click(function(){
	$('#settings').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	$('#about').fadeIn(200);
	$('#about').css('position', 'absolute');
})
$('.back').click(function(){
	$('.icon-bar').fadeIn(200);
	$('#settings').fadeIn(200);
	$('#work-day').fadeOut(200);
	$('#about').fadeOut(200);
	$('#lunch').fadeOut(200);
})
$('.close').click(function(){
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

$('#startDay').click(function(){
	$('.good-day h3, .good-day p, #startDay').css('display', 'none');
	$('#info').fadeIn(500);
	breaktime = moment(moment().add(2, 'h')).format('h:mm');
	endbreak = moment(moment().add(2, 'h').add(breakduration, 'm')).format('h:mm');
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



