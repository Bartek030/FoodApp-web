$(document).ready(function () {
    let basicUrl = 'http://localhost:8080';

    $.get({
        // TODO: to replace 1 with owner data
        url: basicUrl + '/food-app/restaurants/owner/1'
    }).done(function (data) {
        generateRestaurantList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });

    $("#newRestaurantForm").on('submit', function (e) {
        e.preventDefault();

        var dataFromForm = $(this).serialize().split("&");
        var dataToSend = {};
        for (var key in dataFromForm) {
            dataToSend[dataFromForm[key].split("=")[0]] = dataFromForm[key].split("=")[1];
        }

        console.log(dataToSend);
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: $(this).prop('method'),
            url: $(this).prop('action'),
            contentType: "application/json",
            data: JSON.stringify(dataToSend)
        }).done(function () {
            alert("Restauracja została dodana!");
            window.location.reload();
        });
    });
});

generateRestaurantList = function (data) {
    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span class="w-25">' + data[i].name + '</span>' +

            '<a href="ownerRestaurantMenuList.html?restaurantId=' + data[i].restaurantId + '">' +
            '<button type="button" class="btn btn-primary" value="' + data[i].restaurantId + '">Wyświetl Menu</button>' +
            '</a>' +

            '<a href="ownerDeliveryAddressList.html?restaurantId=' + data[i].restaurantId + '&name=' + data[i].name + '">' +
            '<button type="button" class="btn btn-warning" value="' + data[i].restaurantId + '">Wyświetl adresy dowozów</button>' +
            '</a>' +

            '<a href="restaurantOrderList.html?restaurantId=' + data[i].restaurantId + '">' +
            '<button type="button" class="btn btn-info" value="' + data[i].restaurantId + '">Wyświetl zamówienia</button>' +
            '</a>' +

            '</div>' +
            '</li>';
    }
    htmlToInsert += '</ul>';
    $(".mainContext").html(htmlToInsert);
}