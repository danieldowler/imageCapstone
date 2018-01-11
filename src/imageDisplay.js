var tagImages= []
$(function (){
    $.ajax({
        url:"http://localhost:8080/image",
        method: "GET",
        dataType:"json"
    })
    .done(res =>{
        console.log(res);
        tagImages= res;
        displayImages(tagImages);
    })
    load_tags();
    $('.tag-list').on('click', '.image-tags', function(e){
        e.preventDefault();
        var id = $(e.target).data('id');
        var images = tagImages.filter(function(image){
            
        });
    });
})
function displayImages(images){
    $(".image-list").empty();
    images.forEach(i =>{
        $(".image-list").append('<li><img src="http://localhost:8080/' + i.URL + '"></li>')
    })
};
