let basicUrl = 'http://localhost:8080';
$(document).ready(function () {
    

    $.get({
        //TODO: Replace number with current user
        url: basicUrl + "/food-app/app-order/user/1"
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
            '<th scope="col">' + data[i].restaurant.name + '</th>' +
            '<th scope="col"><button type="button" class="btn btn-danger cancelButton" value ="' + data[i].appOrderId + '">Anuluj</button></th>' +
            '</tr>';
    }
    content += '</tbody>' +
        '</table>';


    $("#orderListContent").html(content);
    $(".cancelButton").on("click", handleCancelButton);
};

generateDate = function (text) {
    let date = new Date(text);
    return date.toLocaleString('pl-PL');
};

handleCancelButton = function () {
    let orderId = $(this).val();

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: basicUrl + "/food-app/app-order/cancelled/" + orderId,
        type: 'PATCH'
    }).done(function (data) {
        console.log(data);
        window.location.reload();
    }).fail(function () {
        alert("Nie udało się anulować zamówienia");
    });
}