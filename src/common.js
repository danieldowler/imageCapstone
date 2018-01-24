function load_tags(e){
    $.ajax({
        url:"http://localhost:8080/tag",
        method: "GET",
        dataType:"json"
    })
    .done(res =>{
        console.log(res);
        $(".tag-list").html("")
        res.forEach(i =>{
            $(".tag-list").append("<button href='#' class= 'image-tags' data-id='" + i._id + "'>" + i.name + "</button>")
        })
    })
};
