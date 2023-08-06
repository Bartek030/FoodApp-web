let basicUrl = 'http://localhost:8080';
$(document).ready(function () {
    
    let urlParams = new URLSearchParams(window.location.search);
    let restaurantId = urlParams.get("restaurantId");
    let restaurantName = urlParams.get("name");

    $("#menuOrdersTitle").html("Złożone zamówienia - Restauracja: " + restaurantName);

    $.get({
        url: basicUrl + "/food-app/app-order/restaurant/" + restaurantId
    }).done(function (data) {
        console.log(data);
        generateOrderList(data);
    }).fail(function () {
        alert("cos poszlo nie tak");
    });

});

generateOrderList = function (data) {

    let content = '<table class="table">' +
        '<thead>' +
        '<tr>' +
        '<th scope="col">Number</th>' +
        '<th scope="col">Status</th>' +
        '<th scope="col">Planned Delivery Time</th>' +
        '<th scope="col">Total cost</th>' +
        '<th scope="col">Restaurant</th>' +
        '<th scope="col"></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    for (let i = 0; i < data.length; i++) {
        content += '<tr>' +
            '<th scope="col">' + data[i].number + '</th>' +
            '<th scope="col">' + data[i].status + '</th>' +
            '<th scope="col">' + generateDate(data[i].plannedDeliveryTime) + '</th>' +
            '<th scope="col">' + data[i].totalCost + ' zł</th>' +
            '<th scope="col">' + data[i].restaurant.name + '</th>';
            if (data[i].status != "DELIVERED") {
                content += '<th scope="col"><button type="button" class="btn btn-success deliveredButton" value ="' + data[i].appOrderId + '">Potwierdź dostawę</button></th>';
            } else {
                content += '<th scope="col"><button type="button" class="btn btn-secondary" value ="' + data[i].appOrderId + '">Potwierdź dostawę</button></th>';
            }
            content += '</tr>';
    }
    content += '</tbody>' +
        '</table>';


    $("#orderListContent").html(content);
    $(".deliveredButton").on("click", handleDeliveredButton);
};

generateDate = function (text) {
    let date = new Date(text);
    return date.toLocaleString('pl-PL');
};

handleDeliveredButton = function () {
    let orderId = $(this).val();

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: basicUrl + "/food-app/app-order/delivered/" + orderId,
        type: 'PATCH'
    }).done(function (data) {
        console.log(data);
        window.location.reload();
    }).fail(function () {
        alert("Nie udało się anulować zamówienia");
    });
}