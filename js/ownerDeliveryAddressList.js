$(document).ready(function(){
    let basicUrl = 'http://localhost:8080';

    let urlParams = new URLSearchParams(window.location.search);
    let restaurantId = urlParams.get("restaurantId");
    let restaurantName = urlParams.get("name");

    $("#menuListTitle").html("Restauracja: " + restaurantName);

    $.get({
        url: basicUrl + "/food-app/delivery-address/restaurants/" + restaurantId
    }).done(function (data) {
        console.log(data);
        generateDeliveryAddressList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });

    $("#newAddressForm").on('submit', function (e) {
        e.preventDefault();

        var dataFromForm = $(this).serialize().split("&");
        var dataToSend = {};
        for (var key in dataFromForm) {
            dataToSend[dataFromForm[key].split("=")[0]] = dataFromForm[key].split("=")[1];
        }

        dataToSend.restaurantId = restaurantId;
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: $(this).prop('method'),
            url: $(this).prop('action'),
            contentType: "application/json",
            data: JSON.stringify(dataToSend)
        }).done(function () {
            alert("Adres został dodany!");
            window.location.reload();
        });
    });
});

generateDeliveryAddressList = function (data) {
    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span>' + data[i].country + ' - ' + data[i].city + ' - ' + data[i].street +
            '</span>' +
            '</div>' +
            '</li>';
    }
    htmlToInsert += '</ul>';
    $(".mainContext").html(htmlToInsert);
}