$(document).ready(function(){
    let basicUrl = 'http://localhost:8080';

    let urlParams = new URLSearchParams(window.location.search);
    let menuId = urlParams.get("menuId");
    let menuName = urlParams.get("name");

    $("#menuTitle").html("Menu: " + menuName);

    $.get({
        url: basicUrl + "/food-app/food/" + menuId
    }).done(function (data) {
        console.log(data);
        generateFoodList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });
});

generateFoodList = function (data) {
    let htmlToInsert = '';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<div class="card mx-3" style="width: 18rem;">' +
            '<img src="resources/img/logo.jpg" class="card-img-top" alt="...">' +
            '<div class="card-body text-center">' +
            '<h5 class="card-title">' + data[i].name + '</h5>' +
            '<p class="card-text">' + data[i].description +'</p>' +
            '<button type="button" class="btn btn-primary">Zamów</button>' +
            '</div>' +
            '</div>';
    }
    $(".mainContext").html(htmlToInsert);
    handleShowFoodsButton();
}

handleShowFoodsButton = function () {

    $(".openFoods").on("click", function () {
        let restaurant = $(this).val();
        window.location = 'foods.html?menuId=' + restaurant;
    });
}