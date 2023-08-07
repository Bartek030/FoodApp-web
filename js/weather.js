$(document).ready(function () {
    let basicUrl = 'http://localhost:8080';
    $("#weatherInfo").on("click", function () {
        let cityName = $("#cityName").val();

        $.get({
            url: basicUrl + '/food-app/api/weather/' + cityName
        }).done(function (data) {
            generateWeatherCard(data);
        }).fail(function () {
            alert("cos poszlo nie tak");
        });
    });
});

generateWeatherCard = function (data) {
    let htmlToInsert = '<div class="card mx-3" style="width: 18rem;">' +
        '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png" class="card-img-top h-75 mx-auto" alt="Nie znaleziono obrazka">' +
        '<div class="card-body text-center">' +
        '<h5 class="card-title">' + data.weather[0].description + '</h5>' +
        '<p class="card-text">Temperatura: ' + data.main.temp + ' &deg;C</p>' +
        '<p class="card-text">Wiatr: ' + data.wind.speed + ' m/s</p>' +
        '<p class="card-text">Ciśnienie: ' + data.main.pressure + ' hPa</p>' +
        '<p class="card-text">Wilgotność: ' + data.main.humidity + ' %</p>' +
        '</div>' +
        '</div>';

    $(".mainContext").html(htmlToInsert);
};