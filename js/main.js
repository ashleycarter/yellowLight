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
		$('#content').attr('class', 'morning')
		$('.good-day h3').html('Good Morning!')
		$('.good-day p').html('Grab a cup of coffee and start your day off right!')
	} else if (refH>=12 && refH<18){
		$('#content').attr('class', 'afternoon')
		$('.good-day h3').html('Good Afternoon!')
		$('.good-day p').html('Grab a cup of coffee and start your day off right!')
	}else if (refH>=18){
		$('#content').attr('class', 'evening')
		$('.good-day h3').html('Good Evening!')
		$('.good-day p').html('Grab a cup of coffee and start your day off right!')
	}
}
setGreeting();
setInterval(setGreeting, 10000);

// ----------------------------------------
// Toggle Visibility
// ----------------------------------------

$('#settingsIcon').click(function(){
$('#settings').fadeToggle(200);
});


$('#startDay').click(function(){
	$('.good-day h3, .good-day p, #startDay').css('display', 'none');
	$('.icon-info').css('display', 'block')
	var s = new Date();
	var dayBreak = new Date(s.getFullYear(), s.getMonth(), s.getDay(), (s.getHours()+2), s.getMinutes(), s.getSeconds());
	console.log(s.getHours()+":"+s.getMinutes());
	console.log(dayBreak.getHours()+":"+dayBreak.getMinutes());
	$('#info p').html("You should take a break in two hours at "+dayBreak.getHours()+":"+dayBreak.getMinutes())
});




