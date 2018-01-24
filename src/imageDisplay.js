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
        $(".image-list").append('<a href= "#" class= "add-tag"><img src="http://localhost:8080/' + i.URL + '"></a>')
    })
};
var tagImages = [{}];
$(function () {

    displayImages(tagImages);

    $('.image-list').on('click', '.img-list', (e) => {
        e.preventDefault();
        let form = $('.form_template').clone();
        form.removeClass('form_template');
        $(e.target).parent().append(form);
    });

    $('.image-list').on('click', '.tagForm', e => {
        e.stopPropagation();
    });

    $('.image-list').on('click', '#cancel', e => {
        $(e.target).closest('.tagForm').remove();

    });


    $('.image-list').on('click', '#add-tag', e => {
        //code to save the tag
        //get the tag entered by the user
        //get the image id
        let new_tag = {
            name: req.body.tag,
            date: Date.now()
        };
        Tag
            .create(new_tag)
            .then(tag => {
                console.log('This tag was saved', tag);
                Image.findById(req.body.image_id, (err, image) => {
                    if (err){
                        console.log(err);
                        return res.json(err);
                    }
                  console.log('This image was loaded', image);
                  if(image.tags){ image.tags.push(tag)} 
                  else {image.tags = [tag]};
                  image.save(() => res.json(tag));
                });
    
            });
        let img_id = $(e.target).closest('.img-list').data('id');
        console.log(img_id);
        //make an AJAX call to save the tag to the image
        $('.new-tag').click(function(){
            $.ajax({
                url:"http://localhost:8080/tag",
                method: "POST",
                data: JSON.stringify(data), processData:false, contentType:"application/json"
            })
            .done(res => {
                console.log("tag saved", res)
                //$(".").append("Tag saved to server")
                load_tags()
            }).fail(function(err){
                console.log(err);
            });
        });
        $(e.target).closest('.tagForm').remove();
    });


})

function displayImages(images) {
    $(".image-list").empty();
    images.forEach(i => {
        $(".image-list").append('<a class="img-list" data-id="' + i._id + '"><img src="' + i.URL + '"></a>')
    })
};
