$("#findRestaurants").on("click", function () {
    let country = $("#country").val();
    let city = $("#city").val();
    let street = $("#street").val();

    $.get({
        url: "http://localhost:8080/food-app/restaurants?country=" + country + "&city=" + city + "&street=" + street
    }).done(function (data) {
        console.log(data);
        generateRestaurantList(data);
    }).fail(function () {
        alert("cos poszlo nie tak");
    });

});

generateRestaurantList = function(data) {
    $(".list-group").remove();
    let htmlToInsert = '<ul class="list-group">';

    for (let i = 0; i < data.length; i++) {
        htmlToInsert += '<li class="list-group-item">' + 
            '<div class="d-flex justify-content-between">' +
                '<span>' +
                    data[i].name +  ' - ' +
                    data[i].addressDTO.city + ', ul. ' + data[i].addressDTO.street + ' ' + data[i].addressDTO.number +
                '</span>' +
                '<button type="button" class="btn btn-primary">Wyświetl Menu</button>' +
            '</div>' +
        '</li>';
    }
    htmlToInsert += '</ul>';

    $(".mainBox").append(htmlToInsert);
}