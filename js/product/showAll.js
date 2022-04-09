
function showAllProduct() {
    $.ajax({
        type: 'GET',
        url: PRODUCTS_WEBSERVICE_ROOT,
        headers: {
            'Authorization': currentUser.token
        },
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                            <td>${data[i].producer}</td>
                            <td>${data[i].model}</td>
                            <td>${data[i].price}</td>
                            <td><img src="${IMAGE_FOLDER + data[i].image}" alt="ảnh SP" style="height:150px"></td>
                            <td>${data[i].category != null ? data[i].category.name : " - "}</td>
                            <td><button type="button" class="btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#productModal"
                                onclick="showEditProduct(${data[i].id})"
                                >Edit</button>
                            </td>
                            <td><button type="button" class="btn btn-danger" 
                                data-bs-toggle="modal" data-bs-target="#productModal"
                                onclick="showDeleteProduct(${data[i].id})"
                                >Delete</button>
                            </td>
                            </tr>`
            }
            $("#productList__table-body").html(content);

        }
    })
}

// parameter selected_id: specify category id to make selected
// pass a null parameter to display default
function getAllCategories(selected_id) {
    $.ajax({
        type: "GET",
        url: CATEGORIES_WEBSERVICE_ROOT,
        headers:{
            "Authorization": currentUser.token
        },
        success: function (data) {
            let categoryOptionsHtml = "";
            for (let category of data) {
                categoryOptionsHtml += `<option value="${category.id}" ${(selected_id != null && selected_id == category.id) ? 'selected' : ''} >${category.name}</option>`
            }
            $("#modalIntput__category").html(categoryOptionsHtml);
        },
        error: function () {
        }
    });
}
