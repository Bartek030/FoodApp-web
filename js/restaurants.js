let basicUrl = 'http://localhost:8080';
$("#findRestaurants").on("click", function () {
    let country = $("#country").val();
    let city = $("#city").val();
    let street = $("#street").val();

    $.get({
        url: basicUrl + "/food-app/restaurants?country=" + country + "&city=" + city + "&street=" + street
    }).done(function (data) {
        generateRestaurantList(data);
    }).fail(function () {
        alert("cos poszlo nie tak");
    });

});

generateRestaurantList = function (data) {
    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span>' +
            data[i].name + ' - ' +
            data[i].addressDTO.city + ', ul. ' + data[i].addressDTO.street + ' ' + data[i].addressDTO.number +
            '</span>' +
            '<button type="button" class="btn btn-primary openMenu" value="' + data[i].restaurantId + '">Wyświetl Liste Menu</button>' +
            '</div>' +
            '</li>';
    }
    htmlToInsert += '</ul>';
    $(".mainContext").html(htmlToInsert);
    handleShowMenuButtons();
}

handleShowMenuButtons = function () {

    $(".openMenu").on("click", function () {
        let restaurant = $(this).val();
        window.location = 'menu.html?restaurantId=' + restaurant;
    });
}