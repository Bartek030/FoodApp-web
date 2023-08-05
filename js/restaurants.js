let basicUrl = 'http://localhost:8080';
$("#findRestaurants").on("click", function () {
    let country = $("#country").val();
    let city = $("#city").val();
    let street = $("#street").val();

    window.location = 'restaurantsList.html?country=' + country + '&city=' + city + '&street=' + street + '&page=1';
});