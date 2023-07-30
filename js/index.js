let userSigningButtons =
    '<div class="my-4 d-flex justify-content-center mx-auto userButtons"> ' +
    '<button ' +
    '   id="userButton"' +
    '   type="button"' +
    '   class="btn btn-success mx-5 w-25"' +
    '   data-bs-toggle="modal"' +
    '   data-bs-target="#userLoginModal"' +
    '>' +
    '   Logowanie użytkownika' +
    '</button>' +
    '<button' +
    '    id="ownerButton"' +
    '    type="button"' +
    '    class="btn btn-success mx-5 w-25"' +
    '    data-bs-toggle="modal"' +
    '    data-bs-target="#ownerModal"' +
    '>' +
    '    Rejestracja użytkownika' +
    '</button>' +
    '</div>';

let ownerSigningButtons =
    '<div class="my-4 d-flex justify-content-center mx-auto ownerButtons"> ' +
    '<button ' +
    '   id="ownerButton"' +
    '   type="button"' +
    '   class="btn btn-success mx-5 w-25"' +
    '   data-bs-toggle="modal"' +
    '   data-bs-target="#ownerLoginModal"' +
    '>' +
    '   Logowanie właściciela' +
    '</button>' +
    '<button' +
    '    id="ownerButton"' +
    '    type="button"' +
    '    class="btn btn-success mx-5 w-25"' +
    '    data-bs-toggle="modal"' +
    '    data-bs-target="#ownerModal"' +
    '>' +
    '    Rejestracja właściciela' +
    '</button>' +
    '</div>';

$("#userButton").on("click", function () {

    let areOwnerButtonsVisible = $(".mainBox").hasClass("ownerSigningButtons");
    let areUserButtonsVisible = $(".mainBox").hasClass("userSigningButtons");

    if (areOwnerButtonsVisible) {
        $(".ownerButtons").remove();
        $(".mainBox").removeClass("ownerSigningButtons")
    }
    if (!areUserButtonsVisible) {
        $(userSigningButtons)
            .appendTo(".mainBox");
        $(".mainBox").addClass("userSigningButtons")
    } else {
        $(".userButtons").remove();
        $(".mainBox").removeClass("userSigningButtons")
    }
})

$("#ownerButton").on("click", function () {

    let areOwnerButtonsVisible = $(".mainBox").hasClass("ownerSigningButtons");
    let areUserButtonsVisible = $(".mainBox").hasClass("userSigningButtons");

    if (areUserButtonsVisible) {
        $(".userButtons").remove();
        $(".mainBox").removeClass("userSigningButtons")
    }
    if (!areOwnerButtonsVisible) {
        $(ownerSigningButtons)
            .appendTo(".mainBox");
        $(".mainBox").addClass("ownerSigningButtons")
    } else {
        $(".ownerButtons").remove();
        $(".mainBox").removeClass("ownerSigningButtons")
    }
})