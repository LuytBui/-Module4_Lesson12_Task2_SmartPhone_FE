$("#formDemo").validate({
    rules: {
        ho: "required",
        ten: "required",
        diachi: {
            required: true,
            minlength: 2
        }
    },
    messages: {
        ho: "Vui lòng nhập họ",
        ten: "Vui lòng nhập tên",
        diachi: {
            required: "Vui lòng nhập địa chỉ",
            minlength: "Địa chỉ ngắn vậy, chém gió ah?"
        }
    }
});