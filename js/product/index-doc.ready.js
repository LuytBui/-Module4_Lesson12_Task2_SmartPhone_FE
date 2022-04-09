$(document).ready(function () {
    if (currentUser == null)
        location.href = '/Lesson12_Task_2_Smartphone_FE/html/login.html';

    showAllProduct();

    $("#btnAdd").click(function () {
        showAddNewProduct();
    });

    $("#modalIntput__image").change(function () {
        uploadFile();
    });
});