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
// Toggle Visibility
// ----------------------------------------

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}




