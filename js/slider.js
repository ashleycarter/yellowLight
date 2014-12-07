var beginday = moment().hour(9).minute(0).second(0);
var endday = moment().hour(17).minute(0).second(0);
  $(function() {
    $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [ 540, 1020 ], //or whatever default time you want
            slide: function(e, ui) {
                baseh1 = Math.floor(ui.values[0] / 60);
                basem1 = ui.values[0] - (baseh1 * 60);
                baseh2 = Math.floor(ui.values[1] / 60);
                basem2 = ui.values[1] - (baseh2 * 60);


                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);
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

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);
                if(hours2.length == 1) hours2 = '0' + hours2;
                if(minutes2.length == 1) minutes2 = '0' + minutes2;
                if(minutes2 == 0) minutes2 = '00';
                if(hours2 >= 12){
                    if (hours2 == 12){
                        hours2 = hours2;
                        minutes2 = minutes2 + " PM";
                    }else if (hours2 == 24){
                        hours2 = 11;
                        minutes2 = "59 PM";
                    }else{
                        hours2 = hours2 - 12;
                        minutes2 = minutes2 + " PM";
                    }
                }else{
                    hours2 = hours2;
                    minutes2 = minutes2 + " AM";
                }

                $('#start').text(hours1+':'+minutes1);
                $( "#end" ).text(hours2+':'+minutes2);

                beginday = moment().hour(baseh1).minute(basem1).second(0);
                endday = moment().hour(baseh2).minute(basem2).second(0);
            }
    });
    $( "#start" ).text('9:00 AM');
    $( "#end" ).text('5:00 PM');

    $('#set').click(function() {
        $.removeCookie('start', beginday);
        $.removeCookie('end', endday);
        $.cookie('start', beginday);
        $.cookie('end', endday);
        $('#work-day').css('display', 'none');
        console.log($.cookie());

    })

    
  });