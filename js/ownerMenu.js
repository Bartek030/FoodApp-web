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
        htmlToInsert += '<div class="card mx-3" style="width: 18rem;">' +
            '<img id="foodImage' + data[i].foodId + '" class="card-img-top h-75 mx-auto" alt="Nie znaleziono obrazka">' +
            '<div class="card-body text-center">' +
            '<h5 class="card-title">' + data[i].name + ' - ' + data[i].price + ' zł/szt</h5>' +
            '<p class="card-text">' + data[i].description + '</p>' +
            '<input type="hidden" id="foodName' + data[i].foodId + '" value="' + data[i].name + '"></input>' +
            '<button type="button" class="btn btn-primary addPictureButton" value="' + data[i].foodId + '"' +
            'data-bs-toggle="modal" data-bs-target="#pictureModal"' +
            '>Dodaj/Zmień zdjęcie</button>' +
            '</div>' +
            '</div>';
        getImageFromBackend(data[i].foodId);
    }
    $(".mainContext").html(htmlToInsert);

    handleAddPictureButton();
};

getImageFromBackend = function (foodId) {

    let urlAddress = basicUrl + '/food-app/image/' + foodId;

    fetch(urlAddress)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            $("#foodImage" + foodId).attr("src", objectURL);
        })
        .catch(error => console.error('Wystąpił błąd:', error));
}

handleAddPictureButton = function () {
    $(".addPictureButton").on("click", function () {
        let foodIdValue = $(this).val();
        $("#addPictureForm").on('submit', function (e) {
            e.preventDefault();

            const photo = document.getElementById("fileInput").files[0];
            const formData = new FormData();

            formData.append("file", photo);
            fetch(basicUrl + '/food-app/image/new/' + foodIdValue, {method: "POST", body: formData});
            alert("Obrazek został dodany!");
            window.location.reload();
        });
    });
};