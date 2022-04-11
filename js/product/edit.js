function showEditProduct(id) {
    // clear inputs
    $("#modalInput__imageFilename--hidden").val("");

    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': currentUser.token
        },
        type: "GET",
        url: PRODUCTS_WEBSERVICE_ROOT + "/" + id,
        success: function (data) {

            // fill inputs with object fields
            $("#modalIntput__producer").val(data.producer).prop('disabled', false);
            $("#modalIntput__model").val(data.model).prop('disabled', false);
            $("#modalIntput__price").val(data.price).prop('disabled', false);
            getAllCategories(data.category != null ? data.category.id : null);
            $("#modalIntput__category").prop('disabled', false);
            $("#modalImage").prop("src", IMAGE_FOLDER + data.image);
            $("#modalIntput__image").val(null);

            // re-assign modalButton__ok click event
            // change visual
            $("#modalButton__ok").off('click').attr('class', 'btn btn-primary').html("Save changes")
                .click(function () {
                    editProduct(id);
                });

            // change modalTittle
            $("#modalTitle").html("Edit product");
        },
        error: function () {
            alert("error!");
        }
    });
}


function editProduct(id) {
    let producer = $('#modalIntput__producer').val();
    let model = $('#modalIntput__model').val();
    let price = $('#modalIntput__price').val();
    let category = $('#modalIntput__category').val();
    let imageFilename = $("#modalInput__imageFilename--hidden").val();

    let newProduct = {
        producer: producer,
        model: model,
        price: price,
        category: {
            id: category
        },
        image: imageFilename
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': currentUser.token
        },
        type: "PUT",
        data: JSON.stringify(newProduct),
        url: PRODUCTS_WEBSERVICE_ROOT + "/" + id,
        success: function () {
            showAllProduct();
        }
    });

}