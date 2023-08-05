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

    $("#newFoodForm").on('submit', function (e) {
        e.preventDefault();

        var dataFromForm = $(this).serialize().split("&");
        var dataToSend = {};
        for (var key in dataFromForm) {
            dataToSend[dataFromForm[key].split("=")[0]] = dataFromForm[key].split("=")[1];
        }

        dataToSend.menuId = menuId;
        console.log(JSON.stringify(dataToSend));

        $.ajax({
            type: $(this).prop('method'),
            url: $(this).prop('action'),
            contentType: "application/json",
            data: JSON.stringify(dataToSend)
        }).done(function () {
            alert("Pozycja została dodana!");
            window.location.reload();
        });
    });
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
            '<input type="hidden" id="foodName' + data[i].foodId + '" value="' + data[i].name + '"></input>' +
            '</div>' +
            '</div>';
    }
    $(".mainContext").html(htmlToInsert);
}