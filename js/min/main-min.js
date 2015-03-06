function analogClock(){var e=moment().format("hhmmssA");rotateHands(e[4]+e[5],e[2]+e[3],e[0]+e[1])}function rotateHands(e,t,o){var n=6*e,a=6*t,i=30*o,r=$(".seconds-container");r.css({"-webkit-transform":"rotate("+n+"deg)","-moz-transform":"rotate("+n+"deg)",transform:"rotate("+n+"deg)"});var s=$(".minutes-container");s.css({"-webkit-transform":"rotate("+a+"deg)","-moz-transform":"rotate("+a+"deg)",transform:"rotate("+a+"deg)"});var c=$(".hours-container");c.css({"-webkit-transform":"rotate("+i+"deg)","-moz-transform":"rotate("+i+"deg)",transform:"rotate("+i+"deg)"})}function svgReplace(){$("img.svg").each(function(){var e=jQuery(this),t=e.attr("id"),o=e.attr("class"),n=e.attr("src");jQuery.get(n,function(n){var a=jQuery(n).find("svg");"undefined"!=typeof t&&(a=a.attr("id",t)),"undefined"!=typeof o&&(a=a.attr("class",o+" replaced-svg")),a=a.removeAttr("xmlns:a"),e.replaceWith(a)},"xml")})}function setGreeting(){refTime=new Date,refH=refTime.getHours(),refH>=5&&refH<12?($("#clock").addClass("morning"),$(".good-day h3").html("Good Morning!"),$(".good-day .greeting").html("Let's start your day off right!")):refH>=12&&refH<18?($("#clock").addClass("afternoon"),$(".good-day h3").html("Good Afternoon!"),$(".good-day .greeting").html("Roll up your sleeves and don't slow this awesome day down!")):(refH>=18||refH<5)&&($("#clock").addClass("evening"),$(".good-day h3").html("Good Evening!"),$(".good-day .greeting").html("Burning the midnight oil? Make sure you don't burn yourself out!"));var e=setTimeout(setGreeting,1e4)}function defaultCountdown(){var e=Math.round(defaultTimer.timeToMS(defaultTimer.lap())/60)/1e3;$(".arrow_box span").html(e)}function timeout_init(){defaultTimer.start(ms_defaultTimer,"MM:SS"),$("#clock").removeClass("break"),$(".good-day h3, .good-day p, #startDay, #end-break").fadeOut(100),$("#info, #return-to-home, #icon").fadeIn(1e3),$("#info p").fadeIn(1e3).delay(5e3).fadeOut(1e3)}function timeout_done(){$("#icon, #return-to-home, #settings").hide(),$("#break").fadeToggle(500),$("#clock").delay(2e3).addClass("break"),defaultTimer.stop(),$("#sound-settings").hasClass("on")&&timerAudio.play()}function breakCountdown(){var e=Math.round(breakTimer.timeToMS(breakTimer.lap())/60)/1e3;$(".arrow_box span").html(e)}function breakTimeout_init(){$("#icon, #return-to-home, #icon-settings").show(),$("#icon i").hasClass("icon-close")&&$("#return-to-home").hide(),$("#icon i").hasClass("icon-settings")&&$("#return-to-home").show(),breakTimer.start(ms_breakTimer),$("#break").fadeToggle(500),$("#clock").addClass("break"),$("#info p").fadeIn(1e3).delay(5e3).fadeOut(1e3)}function breakTime_done(){$("#icon, #return-to-home").hide(),$("#end-break").fadeToggle(500),$("#clock").delay(2e3).removeClass("break"),breakTimer.stop(),$("#sound-settings").hasClass("on")&&breakAudio.play()}var currentTime=null,time=null,update=function(){time=moment(new Date),currentTime.html(time.format("h:mm")).append('<span id="ampm">'+time.format("a")+"</span>")};if(currentTime=$("#current-time"),update(),setInterval(update,1e3),$("#clock-display").click(function(){$("#clock-display-settings").toggleClass("digital analog"),$("#clock-display-settings").hasClass("analog")?($(".analog-clock").show(),$("#current-time").hide()):($(".analog-clock").hide(),$("#current-time").show())}),$(function(){analogClock()}),setInterval(analogClock,1e3),!Modernizr.svg){for(var imgs=document.getElementsByTagName("img"),svgExtension=/.*\.svg$/,l=imgs.length,i=0;l>i;i++)imgs[i].src.match(svgExtension)&&(imgs[i].src=imgs[i].src.slice(0,-3)+"png",console.log(imgs[i].src));$("#clock").addClass("no-svg")}$(function(){svgReplace()}),setGreeting(),$("#info").hide(),$("#icon").on("click",function(){$(".home, #settings").fadeToggle(200),$("#icon i").toggleClass("icon-settings icon-close"),$("#icon i").hasClass("icon-close")&&$("#return-to-home").hide(),$("#icon i").hasClass("icon-settings")&&$("#return-to-home").show()}),$("#aboutlink").on("click",function(){$("#settings, .icon-bar").fadeOut(200),$("#about").fadeIn(200),$(".icon-bar").fadeOut(200),$("#about").fadeIn(200)}),$(".back").on("click",function(){$("#inputstart, #inputend").detach(),$(".icon-bar, #settings").fadeIn(200),$("#about").fadeOut(200)}),$(".close").on("click",function(){$(".icon-bar, #main-screen, .home").fadeIn(200),$("#settings, #about").fadeOut(200),$("#icon i").toggleClass("icon-settings icon-close")});var fade_out=function(){$("#info p").fadeOut()};$("#icon-info").click(function(){$("#info p").fadeToggle(),setTimeout(fade_out,5e3)});var ms_defaultTimer=6e4,defaultTimer=new Tock({countdown:!0,time:ms_defaultTimer,interval:6e4,callback:defaultCountdown,complete:timeout_done});$("#startDay").on("click",timeout_init),$("#returnDay").on("click",timeout_init),$("#laterBreak").on("click",function(){defaultTimer.start(ms_defaultTimer),$("#clock").removeClass("break"),$("#break, #return-to-home").fadeToggle(500),$("#info, #return-to-home").fadeIn(1e3),$("#info p").html("You should take a break in "+defaultTimer+" minutes.").fadeIn(1e3).delay(5e3).fadeOut(1e3)});var timerAudio=new Audio("snd/break.wav"),breakAudio=new Audio("snd/end-break.wav");$("#sounds").click(function(){$("#sound-settings").toggleClass("on off")});var ms_breakTimer=6e4,breakTimer=new Tock({countdown:!0,time:ms_breakTimer,interval:6e4,callback:breakCountdown,complete:breakTime_done});$("#startBreak").on("click",breakTimeout_init),$("#return-to-home").click(function(){$("#icon, #return-to-home").hide(),$("#return-home").fadeIn()}),$("#still-here").click(function(){$("#icon, #return-to-home").show(),$("#return-home").fadeOut()}),$("#leaving-now").click(function(){$("#endBreak, #break, #info, #return-to-home, #return-home").fadeOut(),$(".good-day h3, .good-day p, #startDay, #icon").fadeIn(1e3),$("#clock").removeClass("break"),defaultTimer.stop(),breakTimer.stop()});