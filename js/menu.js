let basicUrl = 'http://localhost:8080';
let orderList = [];

$(document).ready(function () {

    let urlParams = new URLSearchParams(window.location.search);
    let menuId = urlParams.get("menuId");
    let menuName = urlParams.get("name");

    $("#menuTitle").html("Menu: " + menuName);

    $.get({
        url: basicUrl + "/food-app/food/" + menuId
    }).done(function (data) {
        generateFoodList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });

    $("#makeOrder").on("click", makeOrderToBackend);
});

generateFoodList = function (data) {
    let htmlToInsert = '';
    for (let i = 0; i < data.length; i++) {
        foodNumber = data[i].foodId;
        htmlToInsert += '<div class="card mx-3" style="width: 18rem;">' +
            '<img src="resources/img/logo.jpg" class="card-img-top" alt="...">' +
            '<div class="card-body text-center">' +
            '<h5 class="card-title">' + data[i].name + ' - ' + data[i].price + ' zł/szt</h5>' +
            '<p class="card-text">' + data[i].description + '</p>' +
            '<button type="button" class="btn btn-primary orderButton" value="' + data[i].foodId + '">Dodaj do zamówienia</button>' +
            '<input type="hidden" id="foodName' + data[i].foodId + '" value="' + data[i].name + '"></input>' +
            '</div>' +
            '</div>';
    }
    $(".mainContext").html(htmlToInsert);
    handleOrderButton();
}

handleOrderButton = function () {
    $(".orderButton").on("click", function () {
        let foodId = $(this).val();
        let foodName = $("#foodName" + foodId).val();

        let newOrderObject = {
            "foodId": foodId,
            "name": foodName
        };

        orderList = orderList.filter(order => order.foodId != newOrderObject.foodId);
        orderList.push(newOrderObject);

        if (orderList.length > 0) {
            $("#makeOrder").removeAttr("hidden");
        }

        $("#orderList").html('');

        for (let key in orderList) {
            let content =
                '<div class="input-group mb-2" id="orderFormGroup' + orderList[key].foodId + '">' +
                '<div class="input-group-prepend w-50">' +
                '<span class="input-group-text">' + orderList[key].name + ' </span>' +
                '</div>' +
                '<input ' +
                'type="number" ' +
                'id="quantity' + orderList[key].foodId + '"' +
                'class="form-control"' +
                'placeholder="ilość" required' +
                '/><button ' +
                'type="button"' +
                'class="btn btn-danger deleteOrder"' +
                'value="' + orderList[key].foodId + '"' +
                '>Usuń' +
                '</button>' +
                '</div>';

            $("#orderList").append(content);
        }
        $(".deleteOrder").on("click", deleteOrder);

    });
}

deleteOrder = function () {
    let currentValue = $(this).val();
    $("#orderFormGroup" + currentValue).remove();
    orderList = orderList.filter(order => order.foodId != currentValue);

    if (orderList.length <= 0) {
        $("#makeOrder").attr("hidden", true);
    }

}

makeOrderToBackend = function () {
    for (let key in orderList) {
        let foodId = orderList[key].foodId;
        orderList[key].quantity = $("#quantity" + foodId).val();
    }

    let tableToOrder = [];

    orderList.forEach(value => {
        tableToOrder.push({
            foodId: value.foodId,
            quantity: value.quantity
        });
    })

    const settings = {
        url: basicUrl + "/food-app/app-order/new",
        data: JSON.stringify(orderList),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            alert('Twoje zamówienie: [' + response.number + '] zostało utworzone. Możesz je sprawdzić w sekcji "Moje Zamówienia"');
        },
        error: function (error) {
            alert('Nie udało się utworzyć zamówienia');
        }
    };


    $.post(settings);
}