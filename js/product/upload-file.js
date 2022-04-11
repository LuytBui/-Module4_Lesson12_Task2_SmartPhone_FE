
function uploadFile() {
    let file = $("#modalIntput__image").prop("files")[0];
    let formData = new FormData();
    formData.append("image", file);
    $.ajax({
        headers: {
            'Authorization': currentUser.token
        },
        url: FILES_WEBSERVICE_ROOT,
        type: "POST",
        enctype: 'multipart/form-data',
        data: formData,
        contentType: false,
        processData: false,
        success: function (reponse) {
            let filename = reponse;
            $("#modalInput__imageFilename--hidden").val(filename);
            $("#modalLabel__filename").html(filename);
            $("#modalImage").prop("src", IMAGE_FOLDER + filename);
        }
    });
}