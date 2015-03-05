function svgReplace(){$("img.svg").each(function(){var e=jQuery(this),t=e.attr("id"),n=e.attr("class"),i=e.attr("src");jQuery.get(i,function(i){var o=jQuery(i).find("svg");"undefined"!=typeof t&&(o=o.attr("id",t)),"undefined"!=typeof n&&(o=o.attr("class",n+" replaced-svg")),o=o.removeAttr("xmlns:a"),e.replaceWith(o)},"xml")})}function setGreeting(){refTime=new Date,refH=refTime.getHours(),refH>=5&&refH<12?($("#clock").addClass("morning"),$(".good-day h3").html("Good Morning!"),$(".good-day .greeting").html("Let's start your day off right!")):refH>=12&&refH<18?($("#clock").addClass("afternoon"),$(".good-day h3").html("Good Afternoon!"),$(".good-day .greeting").html("Roll up your sleeves and don't slow this awesome day down!")):(refH>=18||refH<5)&&($("#clock").addClass("evening"),$(".good-day h3").html("Good Evening!"),$(".good-day .greeting").html("Burning the midnight oil? Make sure you don't burn yourself out!"));var e=setTimeout(setGreeting,1e4)}function setMethods(){$("#sup").on("click",{input:inputstart,timediv:begintimediv},inputUp),$("#sdown").on("click",{input:inputstart,timediv:begintimediv},inputDown),$("#eup").on("click",{input:inputend,timediv:endtimediv},inputUp),$("#edown").on("click",{input:inputend,timediv:endtimediv},inputDown),$("#lsup").on("click",{input:inputstart,timediv:begintimediv},inputUp),$("#lsdown").on("click",{input:inputstart,timediv:begintimediv},inputDown),$("#leup").on("click",{input:inputend,timediv:endtimediv},inputUp),$("#ledown").on("click",{input:inputend,timediv:endtimediv},inputDown),$("#setwork, #setlunch").on("click",setCookie)}function inputUp(e){b=$(this),v=parseInt(e.data.input.val(),10),v+=15,e.data.input.val(v),format=formatTime(v),e.data.timediv.html(format),buttonPress(b,v)}function inputDown(e){b=$(this),v=parseInt(e.data.input.val(),10),v-=15,e.data.input.val(v),format=formatTime(v),e.data.timediv.html(format),buttonPress(b,v)}function buttonPress(e,t){e.hasClass("startw")?(valueh1=Math.floor(t/60),valuem1=t-60*valueh1,beginwork=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm")):e.hasClass("endw")&&(valueh1=Math.floor(t/60),valuem1=t-60*valueh1,endwork=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm")),e.hasClass("startl")?(valueh1=Math.floor(t/60),valuem1=t-60*valueh1,beginlunch=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm")):e.hasClass("endl")&&(valueh1=Math.floor(t/60),valuem1=t-60*valueh1,endlunch=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm"))}function setCookie(){"setwork"===$(this).attr("id")?($.removeCookie("startwork",beginwork),$.removeCookie("endwork",endwork),$.cookie("startwork",beginwork),$.cookie("endwork",endwork),$("#confirmwork em").text("Work has been set")):"setlunch"===$(this).attr("id")&&($.removeCookie("startlunch",beginwork),$.removeCookie("endlunch",endwork),$.cookie("startlunch",beginlunch),$.cookie("endlunch",endlunch),$("#confirmlunch em").text("Lunch has been set"))}function formatTime(e){var t=Math.floor(e/60),n=e-60*t;return 1===t.length&&(t="0"+t),1===n.length&&(n="0"+n),0===n&&(n="00"),t>=12?12===t?n+=" PM":(t-=12,n+=" PM"):n+=" AM",0===t&&(t=12),t+":"+n}function defaultCountdown(){var e=Math.round(defaultTimer.timeToMS(defaultTimer.lap())/60)/1e3;$(".arrow_box span").html(e)}function timeout_init(){defaultTimer.start(ms_defaultTimer,"MM:SS"),$("#clock").removeClass("break"),$(".good-day h3, .good-day p, #startDay, #end-break").fadeOut(100),$("#info, #return-to-home, #icon").fadeIn(1e3),$("#info p").fadeIn(1e3).delay(5e3).fadeOut(1e3)}function timeout_done(){$("#icon, #return-to-home, #settings").hide(),$("#break").fadeToggle(500),$("#clock").delay(2e3).addClass("break"),defaultTimer.stop(),$("#sound-settings").hasClass("on")&&timerAudio.play()}function breakCountdown(){var e=Math.round(breakTimer.timeToMS(breakTimer.lap())/60)/1e3;$(".arrow_box span").html(e)}function breakTimeout_init(){$("#icon, #return-to-home, #icon-settings").show(),$("#icon i").hasClass("icon-close")&&$("#return-to-home").hide(),$("#icon i").hasClass("icon-settings")&&$("#return-to-home").show(),breakTimer.start(ms_breakTimer),$("#break").fadeToggle(500),$("#clock").addClass("break"),$("#info p").fadeIn(1e3).delay(5e3).fadeOut(1e3)}function breakTime_done(){$("#icon, #return-to-home").hide(),$("#end-break").fadeToggle(500),$("#clock").delay(2e3).removeClass("break"),breakTimer.stop(),$("#sound-settings").hasClass("on")&&breakAudio.play()}function checkCookies(e){if(w="work"==e?!0:!1,l="lunch"==e?!0:!1,w){var t=moment($.cookie("startwork"),"H:mm"),n=moment($.cookie("endwork"),"H:mm");return moment(moment(),"H:mm").isBetween(t,n)}if(l){var i=moment($.cookie("startlunch"),"H:mm"),o=moment($.cookie("endlunch"),"H:mm");return moment(moment(),"H:mm").isBetween(i,o)}}var currentTime=null,time=null,update=function(){time=moment(new Date),currentTime.html(time.format("h:mm")).append('<span id="ampm">'+time.format("a")+"</span>")};if(currentTime=$("#time"),update(),setInterval(update,1e3),!Modernizr.svg){for(var imgs=document.getElementsByTagName("img"),svgExtension=/.*\.svg$/,l=imgs.length,i=0;l>i;i++)imgs[i].src.match(svgExtension)&&(imgs[i].src=imgs[i].src.slice(0,-3)+"png",console.log(imgs[i].src));$("#clock").addClass("no-svg")}$(function(){svgReplace()}),setGreeting(),$("#info").hide(),$("#icon").on("click",function(){$(".home, #settings").fadeToggle(200),$("#icon i").toggleClass("icon-settings icon-close"),$("#icon i").hasClass("icon-close")&&$("#return-to-home").hide(),$("#icon i").hasClass("icon-settings")&&$("#return-to-home").show()}),$("#worklink").on("click",function(){$("#settings, .icon-bar").fadeOut(200),$("#work-day").fadeIn(200),$("#work-day").css("position","absolute"),begintimediv=$("#work-day #start"),endtimediv=$("#work-day #end"),$("#work-day").append('<input id="inputstart">'),$("#work-day").append('<input id="inputend">'),inputstart=$("#inputstart"),inputend=$("#inputend"),inputstart.attr({type:"range",min:0,max:1440,step:15,value:540,hidden:!0}),inputend.attr({type:"range",min:0,max:1440,step:15,value:1020,hidden:!0}),setMethods(),begintimediv.html("9:00 AM"),endtimediv.html("5:00 PM")}),$("#lunchlink").on("click",function(){$("#settings, .icon-bar").fadeOut(200),$(".icon-bar").fadeOut(200),$("#lunch").fadeIn(200),$("#lunch").append('<input id="inputstart">'),$("#lunch").append('<input id="inputend">'),begintimediv=$("#lunch #start"),endtimediv=$("#lunch #end"),inputstart=$("#inputstart"),inputend=$("#inputend"),inputstart.attr({type:"range",min:0,max:1440,step:15,value:720,hidden:!0}),inputend.attr({type:"range",min:0,max:1440,step:15,value:780,hidden:!0}),setMethods(),$(".icon-bar").fadeOut(200),$(".icon-bar").fadeOut(200),$("#lunch").fadeIn(200),$("#lunch").append('<input id="inputstart">'),$("#lunch").append('<input id="inputend">'),begintimediv=$("#lunch #start"),endtimediv=$("#lunch #end"),inputstart=$("#inputstart"),inputend=$("#inputend"),inputstart.attr({type:"range",min:0,max:1440,step:15,value:720,hidden:!0}),inputend.attr({type:"range",min:0,max:1440,step:15,value:780,hidden:!0}),setMethods(),begintimediv.html("12:00 AM"),endtimediv.html("1:00 PM")}),$("#aboutlink").on("click",function(){$("#settings, .icon-bar").fadeOut(200),$("#about").fadeIn(200),$(".icon-bar").fadeOut(200),$("#about").fadeIn(200)}),$(".back").on("click",function(){$("#inputstart, #inputend").detach(),$(".icon-bar, #settings").fadeIn(200),$("#work-day, #about, #lunch").fadeOut(200)}),$(".close").on("click",function(){$(".icon-bar, #main-screen, .home").fadeIn(200),$("#settings, #work-day, #about, #lunch").fadeOut(200),$("#icon i").toggleClass("icon-settings icon-close")});var beginwork=moment(moment().hour(9).minute(0)).format("H:mm"),endwork=moment(moment().hour(17).minute(0)).format("H:mm"),beginlunch=moment(moment().hour(12).minute(0)).format("H:mm"),endlunch=moment(moment().hour(13).minute(0)).format("H:mm"),fade_out=function(){$("#info p").fadeOut()};$("#icon-info").click(function(){$("#info p").fadeToggle(),setTimeout(fade_out,5e3)});var ms_defaultTimer=6e4,defaultTimer=new Tock({countdown:!0,time:ms_defaultTimer,interval:6e4,callback:defaultCountdown,complete:timeout_done});$("#startDay").on("click",timeout_init),$("#returnDay").on("click",timeout_init),$("#laterBreak").on("click",function(){defaultTimer.start(ms_defaultTimer),$("#clock").removeClass("break"),$("#break, #return-to-home").fadeToggle(500),$("#info, #return-to-home").fadeIn(1e3),$("#info p").html("You should take a break in "+defaultTimer+" minutes.").fadeIn(1e3).delay(5e3).fadeOut(1e3)});var timerAudio=new Audio("snd/break.wav"),breakAudio=new Audio("snd/end-break.wav");$("#sounds").click(function(){$("#sound-settings").toggleClass("on off")});var ms_breakTimer=6e4,breakTimer=new Tock({countdown:!0,time:ms_breakTimer,interval:6e4,callback:breakCountdown,complete:breakTime_done});$("#startBreak").on("click",breakTimeout_init),$("#return-to-home").click(function(){$("#icon, #return-to-home").hide(),$("#return-home").fadeIn()}),$("#still-here").click(function(){$("#icon, #return-to-home").show(),$("#return-home").fadeOut()}),$("#leaving-now").click(function(){$("#endBreak, #break, #info, #return-to-home, #return-home").fadeOut(),$(".good-day h3, .good-day p, #startDay, #icon").fadeIn(1e3),$("#clock").removeClass("break"),defaultTimer.stop(),breakTimer.stop()});