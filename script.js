let SMARTPHONES_WEBSERVICE_ROOT = "http://localhost:8080/smartphones";

function showAllSmartphone() {
    $.ajax({
        type: 'GET',
        url: SMARTPHONES_WEBSERVICE_ROOT,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                            <td>${data[i].producer}</td>
                            <td>${data[i].model}</td>
                            <td>${data[i].price}</td>
                            <td><button type="button" class="btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#smartphoneModal"
                                onclick="showEditSmartphone(${data[i].id})"
                                >Edit</button>
                            </td>
                            <td><button type="button" class="btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#smartphoneModal"
                                onclick="showDeleteSmartphone(${data[i].id})"
                                >Delete</button>
                            </td>
                            </tr>`
            }
            $("#smartphoneList__table-body").html(content);


        }
    })
}

function showEditSmartphone(id) {

    $.ajax({
        type: "GET",
        url: SMARTPHONES_WEBSERVICE_ROOT + "/" + id,
        success: function (data) {

            $("#modalIntput__producer").val(data.producer).prop('disabled', false);
            $("#modalIntput__model").val(data.model).prop('disabled', false);
            $("#modalIntput__price").val(data.price).prop('disabled', false);

            $("#modalButton__ok").off('click').attr('class', 'btn btn-primary').html("Save changes")
                .click(function () {
                    editSmartphone(id);
                });

        },
        error: function () {
            alert("error!");
        }
    });
}

function editSmartphone(id) {
    let producer = $('#modalIntput__producer').val();
    let model = $('#modalIntput__model').val();
    let price = $('#modalIntput__price').val();
    let newSmartphone = {
        id: id,
        producer: producer,
        model: model,
        price: price
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newSmartphone),
        url: SMARTPHONES_WEBSERVICE_ROOT + "/" + id,
        success: function () {
            showAllSmartphone();
        }

    });

}


function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: SMARTPHONES_WEBSERVICE_ROOT + "/" + id,
        success: function(){
            showAllSmartphone();
        }
    });
}

function showDeleteSmartphone(id){
    $.ajax({
        type: "Get",
        url: SMARTPHONES_WEBSERVICE_ROOT + "/" + id,
        success: function (data) {
            $('#modalIntput__producer').val(data.producer).prop('disabled', true);
            $('#modalIntput__model').val(data.model).prop('disabled', true);
            $('#modalIntput__price').val(data.price).prop('disabled', true);

            // re-assign modalButton__ok 's click event
            // and change btn color
            $("#modalButton__ok").off('click').attr('class', 'btn btn-danger').html("Delete this smartphone")
                .click(function () {
                    deleteSmartphone(id);
                });

        }
    });
}

function showAddNewSmartphone() {

    // clear all input values
    $('#modalIntput__producer').val("").prop('disabled', false);
    $('#modalIntput__model').val("").prop('disabled', false);
    $('#modalIntput__price').val("").prop('disabled', false);

    // re-assign modalButton__ok 's click event and visual
    $("#modalButton__ok").off('click').attr('class', 'btn btn-success').html("Add new smartphone")
        .click(function () {
            addNewSmartPhone();
        });

}

function addNewSmartPhone() {
    //lay du lieu
    let producer = $('#modalIntput__producer').val();
    let model = $('#modalIntput__model').val();
    let price = $('#modalIntput__price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: SMARTPHONES_WEBSERVICE_ROOT,
        //xử lý khi thành công
        success: showAllSmartphone
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

$(document).ready(function () {
    showAllSmartphone();

    $("#btnAdd").click(function () {
        showAddNewSmartphone();
    });
});