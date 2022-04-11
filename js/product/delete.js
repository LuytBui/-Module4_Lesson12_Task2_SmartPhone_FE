function deleteProduct(id) {
    $.ajax({
        headers: {
            'Authorization': currentUser.token
        },
        type: "DELETE",
        url: PRODUCTS_WEBSERVICE_ROOT + "/" + id,
        success: function () {
            showAllProduct();
        }
    });
}

function showDeleteProduct(id) {
    $.ajax({
        headers: {
            'Authorization': currentUser.token
        },
        type: "GET",
        url: PRODUCTS_WEBSERVICE_ROOT + "/" + id,
        success: function (data) {
            // fill inputs with object fields and disable them
            $('#modalIntput__producer').val(data.producer).prop('disabled', true);
            $('#modalIntput__model').val(data.model).prop('disabled', true);
            $('#modalIntput__price').val(data.price).prop('disabled', true);
            getAllCategories(data.category != null ? data.category.id : null);
            $("#modalIntput__category").prop('disabled', true);

            $("#modalInput__imageFilename--hidden").val("");
            $("#modalImage").prop("src", IMAGE_FOLDER + data.image);
            $("#modalInput__image").prop('disabled', true);


            // re-assign modalButton__ok 's click event
            // and change btn color
            $("#modalButton__ok").off('click').attr('class', 'btn btn-danger').html("Delete this product")
                .click(function () {
                    deleteProduct(id);
                });

            $("#modalTitle").html("Delete product");
        }
    });
}