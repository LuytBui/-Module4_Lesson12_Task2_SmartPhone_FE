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
                            <td><button onclick="showEditSmartphone(${data[i].id})">Edit</button></td>
                            <td><button onclick="deleteSmartphone(${data[i].id})">Delete</button></td>
                            </tr>`
            }
            $("#smartphoneList__table-body").html(content);

            let btn = $("#btn-action");
            btn.val("Add new smartphone");
            btn.click(addNewSmartPhone);

        }
    })
}

function showEditSmartphone(id) {

    $.ajax({
        type: "GET",
        url: SMARTPHONES_WEBSERVICE_ROOT + "/" + id,
        success: function (data){

            $("#producer").val(data.producer);
            $("#model").val(data.model);
            $("#price").val(data.price);

            let btn = $("#btn-action");
            btn.val("Edit this smartphone");
            btn.click(function (){
                doEditSmartphone(id);
            });
        }
    });
}

function doEditSmartphone(id) {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
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
        url: SMARTPHONES_WEBSERVICE_ROOT,
        success: function (){
            showAllSmartphone;

            $('#producer').val("");
            $('#model').val("");
             $('#price').val("");

            let btn = $("#btn-action");
            btn.val("Add new smartphone");
            btn.click(addNewSmartPhone);
        }

    });

}

function addNewSmartPhone() {
    //lay du lieu
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
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

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: SMARTPHONES_WEBSERVICE_ROOT + "/" + id,
        success: showAllSmartphone
    });
}

$(document).ready(function () {
    showAllSmartphone();
});