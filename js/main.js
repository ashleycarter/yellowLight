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
//VARS
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
    var s = today.getSeconds();
    var ampm = h >= 12 ? 'pm' : 'am';
    // add a zero in front of numbers<10
    m = checkTime(m);
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " " + ampm;
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
		$('#content').attr('class', 'morning')
		$('.good-day h3').html('Good Morning!')
		$('.good-day p').html('Grab a cup of coffee and start your day off right!')
	} else if (refH>=12 && refH<18){
		$('#content').attr('class', 'afternoon')
		$('.good-day h3').html('Good Afternoon!')
		$('.good-day p').html('Grab a cup of coffee and continue your day off right!')
	}else if (refH>=18 || refH<5){
		$('#content').attr('class', 'evening')
		$('.good-day h3').html('Good Evening!')
		$('.good-day p').html('Grab a cup of coffee and end your day right!')
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
	$('#settings').hide(200);
	$('#work-day').css('display', 'block');
	$('#work-day').css('position', 'absolute');
	$('body').css('overflow', 'hidden');
})
$('#lunchlink').click(function(){
	$('#settings').hide(200);
	$('#lunch').css('display', 'block');
	$('#lunch').css('position', 'absolute');
	$('body').css('overflow', 'hidden');
})
$('#aboutlink').click(function(){
	$('#settings').hide(200);
	$('#about').css('display', 'block');
	$('#about').css('position', 'absolute');
	$('body').css('overflow', 'hidden');
})
$('.back').click(function(){
	$('#settings').show(200);
	$('#work-day').css('display', 'none');;
	$('#about').css('display', 'none');;
	$('#lunch').css('display', 'none');
})

//---------------------------------
//Get and set break time for user
//---------------------------------

$('#startDay').click(function(){
	$('.good-day h3, .good-day p, #startDay').css('display', 'none');
	$('#info').show();
	breaktime = moment(moment().add(breakduration, 's')).format('h:mm:ss');
	endbreak = moment(moment().add((breakduration*2), 's')).format('h:mm:ss');
	$('#info p').html("You should take a break in two hours at "+breaktime).fadeIn(1000).delay(5000).fadeOut(1000);
	breakTime();
	var breaktimeinterval = setInterval(breakTime, 1000)
});

$('#icon-info').click(function(){
	$('#info p').fadeToggle();
});



function breakTime(){
	d = moment().format('h:mm:ss');
	if(d == breaktime){
		$('#content').attr('class', 'break')
		clearInterval(greetInterval);
		$('#info p').html('BREAK! take a load off').fadeIn(1000).delay(5000).fadeOut(1000);
	}else if(d == endbreak){
		setGreeting();
		greetInterval = setInterval(setGreeting, 10000);
		nextbreak = moment().add(2, 's').format('h:mm:ss')
		$('#info p').html('break is over. take your next break at '+nextbreak).fadeIn(1000).delay(5000).fadeOut(1000);
	}else if(d == nextbreak){
		breaktime = moment(moment().add(breakduration, 's')).format('h:mm:ss');
		endbreak = moment(moment().add((breakduration*2), 's')).format('h:mm:ss');
	}
}



