var tagImages = []
$(function () {
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
function displayImages(images) {
    $(".image-list").empty();
    images.forEach(i => {
        $(".image-list").append('<a href= "#" class= "add-tag img-list" data-id="' +i._id+ '"><img src="http://localhost:8080/' + i.URL + '"></a>')
    })
};
var tagImages = [{}];
$(function () {

    displayImages(tagImages);

    $('.image-list').on('click', '.img-list', (e) => {
        e.preventDefault();
        console.log("I am working")
        let form = $('.form_template').clone();
        form.removeClass('form_template');
        $(e.target).parent().append(form);
        let image_id= $(e.target).data('id');
        $("#image_id").val(image_id);
    });

    $('.image-list').on('click', '.tagForm', e => {
        e.stopPropagation();
    });

    $('.image-list').on('click', '#cancel', e => {
        $(e.target).closest('.tagForm').remove();

    });


    $('.image-list').on('click', '#add-tag', e => {
        let tag = $('#tag').val();
        console.log('whats going on?', e.target)
        let image_id= $("#image_id").val();
        let data = {tag:tag, image_id:image_id}
        $.ajax({
            url:"http://localhost:8080/tag",
            method: "POST",
            data: JSON.stringify(data), processData:false, contentType:"application/json"                        
        })
        .done(res => {
            console.log("tag saved", res)
            //need to add value for added tags
        }).fail(function(err){
            console.log(err);
        });
    });
})
