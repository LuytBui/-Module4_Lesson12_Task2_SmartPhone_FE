$(document).ready(function () {
    $("#button-login").click(function (){
        doLogin();
    });
})

function doLogin(){
    let username = $("#input-username").val();
    let password = $("#input-password").val();
    let user = {
        username: username,
        password: password
    }

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        type: "POST",
        url: USERS_WEBSERVICE_ROOT,
        data: JSON.stringify(user),
        success: function (currentUser){
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            location.href = '/Lesson12_Task_2_Smartphone_FE/html/index.html';
        },
        error: function (){

        }

    })
}