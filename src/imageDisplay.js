var tagImages = []
$(function () {
    let token = window.localStorage.getItem("token");
    if (!token) {
        window.location = "/"
    }
    loadImages();
    load_tags();
    $('.tag-list').on('click', '.image-tags', function (e) {
        e.preventDefault();
        var id = $(e.target).data('id');
        var images = tagImages.filter(function (image) {
            return image.tags.includes(id);
        });
        displayImages(images);
    });
    $('.show-all').click(function () {
        displayImages(tagImages);
    });
    $('.add-tag').click();
})

function loadImages() {
    $.ajax({
        url: "http://localhost:8080/image",
        method: "GET",
        dataType: "json"
    })
        .done(res => {
            console.log(res);
            tagImages = res;
            displayImages(tagImages);
        })
}

function displayImages(images) {
    $(".image-list").empty();
    images.forEach(i => {
        $(".image-list").append('<a href= "#" class= "add-tag img-list" data-featherlight="http://localhost:8080/' + i.URL + '"><img data-id="' + i._id + '" src="http://localhost:8080/' + i.URL + '"></a>')
    })
   $('.img-list').each(function(e){
        $(this).featherlight($(this).find('img'), {});
    });
};
var tagImages = [{}];
$(function () {

    displayImages(tagImages);

    $('.image-list').on('click', '.img-list', (e) => {
        e.preventDefault();
        console.log(e.target)
        let form = $('.form_template').clone();
        form.removeClass('form_template');
        $(e.target).parent().append(form);
        let image_id = $(e.target).data('id');
        console.log(image_id)
        $(e.target).parent().find(".img-id").val(image_id);
    });

    $('.image-list').on('click', '.tagForm', e => {
        e.stopPropagation();
    });

    $('.image-list').on('click', '#cancel', e => {
        $(e.target).closest('.tagForm').remove();

    });


    $('.image-list').on('click', '#add-tag', e => {
        let tag = $('#tag').val();
        let image_id = $(".img-id").val();
        console.log(image_id)
        let data = { tag: tag, image_id: image_id }
        console.log('anyone home?')
        $.ajax({
            url: "http://localhost:8080/tag",
            method: "POST",
            data: JSON.stringify(data), processData: false, contentType: "application/json"
        })
            .done(res => {
                loadImages();
                load_tags();
            }).fail(function (err) {
                console.log(err);
            });
    });
})
