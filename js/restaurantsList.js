$(document).ready(function () {
    let basicUrl = 'http://localhost:8080';
    let urlParams = new URLSearchParams(window.location.search);
    let country = urlParams.get("country");
    let city = urlParams.get("city");
    let street = urlParams.get("street");
    let page = urlParams.get("page");

    $.get({
        url: basicUrl + '/food-app/restaurants?country=' + country + '&city=' + city + '&street=' + street + '&page=' + page
    }).done(function (data) {
        console.log(data);
        generateRestaurantList(data, country, city, street, page);
    }).fail(function () {
        alert("cos poszlo nie tak");
    });
});

generateRestaurantList = function (data, country, city, street, page) {
    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span>' +
            data[i].name + ' - ' +
            data[i].addressDTO.city + ', ul. ' + data[i].addressDTO.street + ' ' + data[i].addressDTO.number +
            '</span>' +
            '<button type="button" class="btn btn-primary openMenuList" value="' + data[i].restaurantId + '">Wyświetl Liste Menu</button>' +
            '<input type="hidden" class="restaurantName' + data[i].restaurantId + '" value="' + data[i].name + '"></input>' +
            '</div>' +
            '</li>';
    }
    htmlToInsert += '</ul>';
    $(".mainContext").html(htmlToInsert);

    if (page == 1) {
        $("#previousPage").addClass("disabled");
    } else {
        $("#previousPage").removeClass("disabled");
        $("#previousLink").attr("href", 'restaurantsList.html?country=' + country + '&city=' + city + '&street=' + street + '&page=' + (page - 1));
    }

    if (data.length < 5) {
        $("#nextPage").addClass("disabled");
    } else {
        $("#nextPage").removeClass("disabled");
        $("#nextLink").attr("href", 'restaurantsList.html?country=' + country + '&city=' + city + '&street=' + street + '&page=' + (1 + Number(page)));
    }

    handleShowMenuListButtons();
}

handleShowMenuListButtons = function () {

    $(".openMenuList").on("click", function () {
        let restaurant = $(this).val();
        let restaurantName = $(".restaurantName" + restaurant).val();
        window.location = 'menuList.html?restaurantId=' + restaurant + '&name=' + restaurantName;
    });
}