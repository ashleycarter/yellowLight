function setGreeting(){refTime=new Date,refH=refTime.getHours(),refH>=5&&12>refH?($("#clock").attr("class","morning"),$(".good-day h3").html("Good Morning!"),$(".good-day .greeting").html("Grab a cup of coffee and start your day off right!")):refH>=12&&18>refH?($("#clock").attr("class","afternoon"),$(".good-day h3").html("Good Afternoon!"),$(".good-day .greeting").html("Grab a cup of coffee and continue your day off right!")):(refH>=18||5>refH)&&($("#clock").attr("class","evening"),$(".good-day h3").html("Good Evening!"),$(".good-day .greeting").html("Grab a cup of coffee and end your day right!"));var t=setTimeout(setGreeting,1e4)}function setMethods(){$("#sup").on("click",{input:inputstart,timediv:begintimediv},inputUp),$("#sdown").on("click",{input:inputstart,timediv:begintimediv},inputDown),$("#eup").on("click",{input:inputend,timediv:endtimediv},inputUp),$("#edown").on("click",{input:inputend,timediv:endtimediv},inputDown),$("#lsup").on("click",{input:inputstart,timediv:begintimediv},inputUp),$("#lsdown").on("click",{input:inputstart,timediv:begintimediv},inputDown),$("#leup").on("click",{input:inputend,timediv:endtimediv},inputUp),$("#ledown").on("click",{input:inputend,timediv:endtimediv},inputDown),$("#setwork, #setlunch").on("click",setCookie)}function inputUp(t){b=$(this),v=parseInt(t.data.input.val()),v+=15,t.data.input.val(v),format=formatTime(v),t.data.timediv.html(format),buttonPress(b,v)}function inputDown(t){b=$(this),v=parseInt(t.data.input.val()),v-=15,t.data.input.val(v),format=formatTime(v),t.data.timediv.html(format),buttonPress(b,v)}function buttonPress(t,e){t.hasClass("startw")?(valueh1=Math.floor(e/60),valuem1=e-60*valueh1,beginwork=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm")):t.hasClass("endw")&&(valueh1=Math.floor(e/60),valuem1=e-60*valueh1,endwork=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm")),t.hasClass("startl")?(valueh1=Math.floor(e/60),valuem1=e-60*valueh1,beginlunch=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm")):t.hasClass("endl")&&(valueh1=Math.floor(e/60),valuem1=e-60*valueh1,endlunch=moment(moment().hour(valueh1).minute(valuem1)).format("H:mm"))}function setCookie(){"setwork"==$(this).attr("id")?($.removeCookie("startwork",beginwork),$.removeCookie("endwork",endwork),$.cookie("startwork",beginwork),$.cookie("endwork",endwork),$("#confirmwork em").text("Work has been set")):"setlunch"==$(this).attr("id")&&($.removeCookie("startlunch",beginwork),$.removeCookie("endlunch",endwork),$.cookie("startlunch",beginlunch),$.cookie("endlunch",endlunch),$("#confirmlunch em").text("Lunch has been set"))}function formatTime(t){var e=Math.floor(t/60),n=t-60*e;return 1==e.length&&(e="0"+e),1==n.length&&(n="0"+n),0==n&&(n="00"),e>=12?12==e?(e=e,n+=" PM"):(e-=12,n+=" PM"):(e=e,n+=" AM"),0==e&&(e=12,n=n),e+":"+n}var currentTime=null,time=null,update=function(){time=moment(new Date),currentTime.html(time.format("h:mm a"))};$(document).ready(function(){currentTime=$("#time"),update(),setInterval(update,1e3)}),setGreeting(),$("#info").hide(),$("#info").hide(),$("#icon").on("click",function(){$(".home, #settings").fadeToggle(200),$("#icon i").toggleClass("icon-settings icon-close")}),$("#worklink").on("click",function(){b=$(this),$("#settings, .icon-bar").fadeOut(200),$("#work-day").fadeIn(200),$("#work-day").css("position","absolute"),begintimediv=$("#work-day #start"),endtimediv=$("#work-day #end"),$("#work-day").append('<input id="inputstart">'),$("#work-day").append('<input id="inputend">'),inputstart=$("#inputstart"),inputend=$("#inputend"),inputstart.attr({type:"range",min:0,max:1440,step:15,value:540,hidden:!0}),inputend.attr({type:"range",min:0,max:1440,step:15,value:1020,hidden:!0}),setMethods(),begintimediv.html("9:00 AM"),endtimediv.html("5:00 PM")}),$("#lunchlink").on("click",function(){b=$(this),$("#settings, .icon-bar").fadeOut(200),$(".icon-bar").fadeOut(200),$("#lunch").fadeIn(200),$("#lunch").append('<input id="inputstart">'),$("#lunch").append('<input id="inputend">'),begintimediv=$("#lunch #start"),endtimediv=$("#lunch #end"),inputstart=$("#inputstart"),inputend=$("#inputend"),inputstart.attr({type:"range",min:0,max:1440,step:15,value:720,hidden:!0}),inputend.attr({type:"range",min:0,max:1440,step:15,value:780,hidden:!0}),setMethods(),begintimediv.html("12:00 AM"),endtimediv.html("1:00 PM")}),$("#aboutlink").on("click",function(){$("#settings, .icon-bar").fadeOut(200),$("#about").fadeIn(200)}),$(".back").on("click",function(){$("#inputstart, #inputend").detach(),$(".icon-bar, #settings").fadeIn(200),$("#work-day, #about, #lunch").fadeOut(200)}),$(".close").on("click",function(){$(".icon-bar, #main-screen").fadeIn(200),$("#settings, #work-day, #about, #lunch").fadeOut(200),$("#icon i").toggleClass("icon-settings icon-close")});var beginwork=moment(moment().hour(9).minute(0)).format("H:mm"),endwork=moment(moment().hour(17).minute(0)).format("H:mm"),beginlunch=moment(moment().hour(12).minute(0)).format("H:mm"),endlunch=moment(moment().hour(13).minute(0)).format("H:mm");