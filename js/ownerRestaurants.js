$(document).ready(function(){
    let basicUrl = 'http://localhost:8080';

    $.get({
        // TODO: to replace 1 with owner data
        url: basicUrl + '/food-app/restaurants/owner/1'
    }).done(function (data) {
        console.log(data);
        generateRestaurantList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });

    $("#addRestaurant").on("click", function () {
        // TODO: to replace 1 with owner data
        window.location = 'newRestaurant.html?userId=1'
    });
});

generateRestaurantList = function (data) {
    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span class="w-25">' + data[i].name +'</span>' +

            '<a href="restaurantMenuList.html?restaurantId=' + data[i].restaurantId + '">' +
            '<button type="button" class="btn btn-primary" value="' + data[i].restaurantId + '">Wyświetl Menu</button>' +
            '</a>' +

            '<a href="deliveryAddressList.html?restaurantId=' + data[i].restaurantId + '">' +
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