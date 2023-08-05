$(document).ready(function(){
    let basicUrl = 'http://localhost:8080';

    let urlParams = new URLSearchParams(window.location.search);
    let restaurantId = urlParams.get("restaurantId");
    let restaurantName = urlParams.get("name");

    $("#menuListTitle").html("Restauracja: " + restaurantName);

    $.get({
        url: basicUrl + "/food-app/menu/" + restaurantId
    }).done(function (data) {
        console.log(data);
        generateMenuList(data);

    }).fail(function () {
        alert("cos poszlo nie tak");
    });

    $("#newMenuForm").on('submit', function (e) {
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
            alert("Menu zostało dodane!");
            window.location.reload();
        });
    });
});

generateMenuList = function (data) {
    $("#menuListTitle").html("Restauracja: " + data[0].restaurant.name);

    let htmlToInsert = '<ul class="list-group">';
    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' +
            '<div class="d-flex justify-content-between">' +
            '<span>' +
            data[i].name + ' - ' +
            data[i].category + 
            '</span>' +
            '<button type="button" class="btn btn-primary openMenu" value="' + data[i].menuId + '">Wyświetl Menu</button>' +
            '<input type="hidden" class="menuName' + data[i].menuId + '" value="' + data[i].name + '"></input>' +
            '</div>' +
            '</li>';
    }
    htmlToInsert += '</ul>';
    $(".mainContext").html(htmlToInsert);
    handleShowMenuButton();
}

handleShowMenuButton = function () {

    $(".openMenu").on("click", function () {
        let menu = $(this).val();
        let menuName = $(".menuName" + menu).val();
        window.location = 'menu.html?menuId=' + menu + '&name=' + menuName;
    });
}