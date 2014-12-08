var beginwork = moment(moment().hour(9).minute(0)).format('H:mm');
var endwork = moment(moment().hour(17).minute(0)).format('H:mm');
var beginlunch = moment(moment().hour(12).minute(0)).format('H:mm');
var endlunch = moment(moment().hour(13).minute(0)).format('H:mm');
  $(function() {
    //---------------------
    //Work slider
    //----------------------
    $( "#slider-range-work" ).slider({
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

                $('#startwork').text(hours1+':'+minutes1);
                $( "#endwork" ).text(hours2+':'+minutes2);

                beginwork = moment(moment().hour(baseh1).minute(basem1)).format('H:mm');

                endwork = moment(moment().hour(baseh2).minute(basem2)).format('H:mm');
            }
    });
    $( "#startwork" ).text('9:00 AM');
    $( "#endwork" ).text('5:00 PM');

    $('#setwork').click(function() {
        $.removeCookie('startwork', beginwork);
        $.removeCookie('endwork', endwork);
        $.cookie('startwork', beginwork);
        $.cookie('endwork', endwork);
        $('#confirmwork').text('Work has been set');

    })
    //----------------------
    //Lunch slider
    //----------------------
    $( "#slider-range-lunch" ).slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [ 720, 780 ], //or whatever default time you want
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

                $('#startlunch').text(hours1+':'+minutes1);
                $( "#endlunch" ).text(hours2+':'+minutes2);

                beginlunch = moment(moment().hour(baseh1).minute(basem1)).format('H:mm');
                endlunch = moment(moment().hour(baseh2).minute(basem2)).format('H:mm');
            }
    });
    $( "#startlunch" ).text('12:00 PM');
    $( "#endlunch" ).text('1:00 PM');

    $('#setlunch').click(function() {
        $.removeCookie('startlunch', beginlunch);
        $.removeCookie('endlunch', endlunch);
        $.cookie('startlunch', beginlunch);
        $.cookie('endlunch', endlunch);
        $('#confirmlunch').text('Lunch has been set');

    })

    
  });