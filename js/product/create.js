
function showAddNewProduct() {

    // clear all input values
    $('#modalIntput__producer').val("").prop('disabled', false);
    $('#modalIntput__model').val("").prop('disabled', false);
    $('#modalIntput__price').val("").prop('disabled', false);
    getAllCategories(null);
    $("#modalIntput__category").prop('disabled', false);

    $('#modalImage').val("").prop("src", "");
    $("#modalInput__imageFilename--hidden").val("");
    $("#modalIntput__image").val(null);

    // re-assign modalButton__ok 's click event and visual
    $("#modalButton__ok").off('click').attr('class', 'btn btn-success').html("Add new product")
        .click(function () {
            addNewSmartPhone();
        });

    // change modalTittle
    $("#modalTitle").html("Add new product");
}

function addNewSmartPhone() {
    //lay du lieu
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

    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProduct),
        //tên API
        url: PRODUCTS_WEBSERVICE_ROOT,
        //xử lý khi thành công
        success: showAllProduct
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}