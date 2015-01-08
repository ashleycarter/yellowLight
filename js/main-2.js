// -----------------------------------------------------
// Display Current Time
// -----------------------------------------------------

var currentTime = null,
    time = null;

var update = function () {
    time = moment(new Date());
    currentTime.html(time.format('h:mm a'));
};

$(document).ready(function(){
    currentTime = $('#time');
    update();
    setInterval(update, 1000);
});


// -----------------------------------------------------
// Open App Screen
// -----------------------------------------------------

// Greeting based on time of day

function setGreeting(){
	refTime = new Date();
	refH = refTime.getHours();
	if (refH>=5 && refH<12){
		$('#clock').attr('class', 'morning');
		$('.good-day h3').html('Good Morning!');
		$('.good-day .greeting').html('Grab a cup of coffee and start your day off right!');
	} else if (refH>=12 && refH<18){
		$('#clock').attr('class', 'afternoon');
		$('.good-day h3').html('Good Afternoon!');
		$('.good-day .greeting').html('Grab a cup of coffee and continue your day off right!');
	}else if (refH>=18 || refH<5){
		$('#clock').attr('class', 'evening');
		$('.good-day h3').html('Good Evening!');
		$('.good-day .greeting').html('Grab a cup of coffee and end your day right!');
	}
	var greetTimeout = setTimeout(setGreeting, 10000);
}
setGreeting();
$('#info').hide();


// -----------------------------------------------------
// Toggle Visibility Of Different Templates
// -----------------------------------------------------

$('#info').hide();

$('#icon').on('click',function(){
	$('.home, #settings').fadeToggle(200);
	$('#icon i').toggleClass('icon-settings icon-close');
});

$('#worklink').on('click',function(){
	b = $(this)
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
})
$('#lunchlink').on('click',function(){
	b = $(this)
	$('#settings, .icon-bar').fadeOut(200);
	$('.icon-bar').fadeOut(200);
	// $('#work-day').hide();
	$('#lunch').fadeIn(200);

	$('#lunch').append('<input id="inputstart">');
	$('#lunch').append('<input id="inputend">');

	begintimediv = $('#lunch #start')
	endtimediv = $('#lunch #end');
	inputstart = $('#inputstart');
	inputend = $('#inputend');
	inputstart.attr({type: 'range',min: 0,max: 1440,step: 15,value: 720,hidden: true});
	inputend.attr({type: 'range',min: 0,max: 1440,step: 15,value: 780,hidden: true});
	setMethods();
    begintimediv.html('12:00 AM')
    endtimediv.html('1:00 PM')
})
$('#aboutlink').on('click', function(){
	$('#settings, .icon-bar').fadeOut(200);
	$('#about').fadeIn(200);
})
$('.back').on('click',function(){
	$('#inputstart, #inputend').detach();
	$('.icon-bar, #settings').fadeIn(200);
	$('#work-day, #about, #lunch').fadeOut(200);
})
$('.close').on('click',function(){
	$('.icon-bar, #main-screen').fadeIn(200);
	$('#settings, #work-day, #about, #lunch').fadeOut(200);
	$('#icon i').toggleClass('icon-settings icon-close');
})

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
    v = v + 15;
    e.data.input.val(v);
    format = formatTime(v);
    e.data.timediv.html(format);
    buttonPress(b, v);
}
function inputDown(e){
    b = $(this);
    v = parseInt(e.data.input.val());
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

// -----------------------------------------------------
// Entering Main App Section (starting the day)
// -----------------------------------------------------

