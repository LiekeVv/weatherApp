// Deze functie wordt uitgevoerd wanneer de pagina geladen wordt.
$(document).ready(function () {
    // Deze regel haalt het huidige weer op uit Amsterdam. Deze informatie, de response, gebruik ik om informatie te selecteren
    $.get("http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&appid=0214ad7217d76619de76a215d89afd1d", function (response) {
        // Hier wordt de div met het bijbehorende id gevuld met de informatie van de api.
        $('#city').text(JSON.stringify(response.name));
        $('#type').text(JSON.stringify(response.weather[0].main));
        $('#temperature').text(JSON.stringify(parseInt(response.main.temp)));
        $('#image').attr('src', 'images/icons/' + response.weather[0].icon + '.png');
        console.log((Date.now() / 1000) - response.sys.sunrise);
        
        if (((Date.now() / 1000) - response.sys.sunrise) < 0) {
            $(".box-today").css("background-color", "#001435");
        }

        else if (((Date.now() / 1000) - response.sys.sunrise) > 0 && ((Date.now() / 1000) - response.sys.sunrise) < 7500){
            $(".box-today").css("background-color", "#121991");
        }

        else if (((Date.now() / 1000) - response.sys.sunrise) > 7500 && ((Date.now() / 1000) - response.sys.sunrise) < 15000 ){
            $(".box-today").css("background-color", "#2b5191");
        }

        else if (((Date.now() / 1000) - response.sys.sunrise) > 15000 && ((Date.now() / 1000) - response.sys.sunrise) < 19000){
            $(".box-today").css("background-color", "#89b5ff");
        }

        else if (((Date.now() / 1000) - response.sys.sunrise) > 19000 && ((Date.now() / 1000) - response.sys.sunrise) < 30226){
            $(".box-today").css("background-color", "#2b5191");
        }

        else if (((Date.now() / 1000) - response.sys.sunrise) > 30226){
            $(".box-today").css("background-color", "#001435");
        }
    });

    // Haal het weer voor de komende 5 dagen op in Amsterdam. Hier wordt gebruik gemaakt van response2 zodat deze resultaten gescheiden blijven.
    $.get("http://api.openweathermap.org/data/2.5/forecast?q=Amsterdam&units=metric&appid=0214ad7217d76619de76a215d89afd1d", function (response2) {
        // Hier wordt door elk "moment" gelopen. Om de drie uur is er namelijk een voorspelling
        $.each(response2.list, function(index, data) {
            // Hier wordt alle informatie in een variabele gestopt waar de string dt_txt 12:00:00 bevat.
            // Elke dag wordt namelijk de temperatuur etc weergegeven van 12:00:00.
            var arraycontainsMidday = (data.dt_txt.substring(10).indexOf("12:00:00") > -1);

            var day = JSON.stringify(data.dt_txt).substring(9, 11);
            var month = JSON.stringify(data.dt_txt).substring(6, 8);
            var year = JSON.stringify(data.dt_txt).substring(1, 5);

            // Als dat het geval is wordt in de div met id #forecast een nieuwe div aangemaakt "box-day" met daarin het bijbehorende icon + de temperatuur + de dag en tijd.
            if (arraycontainsMidday) {
                console.log(data.weather[0].icon);
                $('#forecast').append('<div class="box-day"><img src="images/icons/' + data.weather[0].icon + '.png">' + '<p>' + day + '-' + month + '-' + year + '</p>' + ' ' + '<p>' + JSON.stringify(parseInt(data.main.temp)) + '&#8451' + '</p>' + '</div>');
            }
        });
    });

    // Als er op de zoek knop wordt geklikt wordt de waarde van het tekstveld in de variabele cityOutput gestopt.
    $('#searchButton').click(function() {
        var cityOutput = $('#searchField').val();

        // Haal het huidige weer op in de ingevulde stad
        // Dit wordt gedaan door de stad in de url aan de passen aan de variabele
        $.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityOutput + "&units=metric&appid=0214ad7217d76619de76a215d89afd1d", function (response) {
            // Hier gebeurt weer hetzelfde als bovenin
            $('#city').text(JSON.stringify(response.name));
            $('#type').text(JSON.stringify(response.weather[0].main));
            $('#temperature').text(JSON.stringify(parseInt(response.main.temp)));
            $('#image').attr('src', 'images/icons/' + response.weather[0].icon + '.png');
        });

        // Haal de forecast leeg zodat alleen het weer van de huidige stad getoond wordt.
        $('#forecast').html('');

        // Haal het weer voor de komende 5 dagen op
        // Dit is ook hetzelfde als wat bovenin gebeurt.
        $.get("http://api.openweathermap.org/data/2.5/forecast?q=" + cityOutput + "&units=metric&appid=0214ad7217d76619de76a215d89afd1d", function (response2) {
            $.each(response2.list, function(index, data) {
                var arraycontainsMidday = (data.dt_txt.substring(10).indexOf("12:00:00") > -1);

                if (arraycontainsMidday) {
                    console.log(data.weather[0].icon);
                    console.log("hallo");

                    var day = JSON.stringify(data.dt_txt).substring(9, 11);
                    var month = JSON.stringify(data.dt_txt).substring(6, 8);
                    var year = JSON.stringify(data.dt_txt).substring(1, 5);

                    // $('#forecast').append('<div class="box-day"><img src="images/icons/' + data.weather[0].icon + '.png">' + '<p>' + JSON.stringify(data.dt_txt) + '</p>' + ' ' + '<p>' + JSON.stringify(data.main.temp) + '&#8451' + '</p>' + '</div>');
                    $('#forecast').append('<div class="box-day"><img src="images/icons/' + data.weather[0].icon + '.png">' + '<p>' + day + '-' + month + '-' + year + '</p>' + ' ' + '<p>' + JSON.stringify(parseInt(data.main.temp)) + '&#8451' + '</p>' + '</div>');

                    console.log(JSON.stringify(data.dt_txt));
                    console.log(day);
                    console.log(month);
                    console.log(year);

                }
            });
        });
    });
});
