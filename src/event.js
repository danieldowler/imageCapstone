let current_image= null;

function drop_handler(e) {
    console.log("drop_image");
    e.preventDefault();
    var dt = e.dataTransfer;
    if (dt.items) {
        for (i = 0; i < dt.items.length; i++) {
            if (dt.items[i].kind == "file") {
                var f = dt.items[i].getAsFile();
                var formData = new FormData();
                formData.append('file', f);

                $.ajax({
                    url: 'http://localhost:8080/image/',
                    type: 'POST',
                    data: formData,
                    processData: false,  
                    contentType: false,  
                    success: function (data) {
                        console.log('image returned', data);
                        current_image = data;
                        $('.last-image').css({
                            'background-image': `url("http://localhost:8080/${data.URL}")`,
                            'background-size': 'cover'
                        });
                        $('.tag-name').show()
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
        load_tags();
        $('.new-tag').click(function(){
            let tag = $('#tag-item').val();
            let image_id = current_image._id;
            console.log('Data to send to server: ', tag, image_id);
            let data = {tag:tag, image_id:image_id}
            $.ajax({
                url:"http://localhost:8080/tag",
                method: "POST",
                data: data
            })
            .done(res => {
                console.log("tag saved", res)
                $(".last-upload").append("Tag saved to server")
                load_tags()
            }).fail(function(err){
                console.log(err);
            });
        });
    }
)
function load_images(e) {
    e.preventDefault();
    console.log("loading next image");
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

