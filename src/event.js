function drop_handler(e) {
    console.log("drop_image");
    e.preventDefault();
    var dt = e.dataTransfer;
    if (dt.items) {
        for (i = 0; i < dt.items; i++) {
            if (dt.items[i].kind == "file") {
                var f = dt.items[i].getAsFile();
                var formData = new FormData();
                formData.append('file', f);

                $.ajax({
                    url: 'http://localhost:8080/image/',
                    type: 'POST',
                    data: formData,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,  // tell jQuery not to set contentType
                    success: function (data) {
                        console.log(data);
                        alert(data);
                    }
                });
            }
        }
    }
    else {
        for (var i = 0; i < dt.files.length; i++) {
            console.log("...file[" + i + "].name =" + dt.files[i].name);
        }
    }
}
function dragover_handler(e) {
    console.log("dragOver");
    e.preventDefault();
}
function dragend_handler(e) {
    console.log("drag_end");
    e.preventDefault();
    var dt = e.dataTransfer;
    if (dt.items) {
        for (i = 0; i < dt.items.length; i++) {
            dt.items.remove(i);
        }
    }
    else {
        e.dataTransfer.clearData();
    }
}
$(
    function () {
        $("#load_more").click(load_images)
    }
)
function load_images(e) {
    e.preventDefault();
    console.log("loading next image");
    /*var li = e.load_images;*/
    $.ajax({
        url: "serverimages.js",
        method: "GET",
        dataType: "json"
    }).done(res => {
        console.log(res);
        res.forEach(i => {
            $(".image-list").append("<li><img src='" + i + "'/></li>");
        })
    });
}
