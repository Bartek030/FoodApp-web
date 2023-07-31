$(document).ready(function(){
    let basicUrl = 'http://localhost:8080';

    let urlParams = new URLSearchParams(window.location.search);
    let restaurantId = urlParams.get("restaurantId");

    $.get({
        url: basicUrl + "/food-app/menu/" + restaurantId
    }).done(function (data) {
        console.log(data);
        generateMenuList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });
});

generateMenuList = function (data) {
    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span>' +
            data[i].name + ' - ' +
            data[i].category + 
            '</span>' +
            '<button type="button" class="btn btn-primary openMenu" value="' + data[i].menuId + '">Wyświetl Menu</button>' +
            '</div>' +
            '</li>';
    }
    htmlToInsert += '</ul>';
    $(".mainContext").html(htmlToInsert);
    handleShowMenuButton();
}

handleShowMenuButton = function () {

    $(".openMenu").on("click", function () {
        let restaurant = $(this).val();
        window.location = 'menuList.html?restaurantId=' + restaurant;
    });
}