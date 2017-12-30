$(function (){
    $.ajax({
        url:"http://localhost:8080/image",
        method: "GET",
        dataType:"json"
    })
    .done(res =>{
        console.log(res);
        res.forEach(i =>{
            $(".image-list").append("<li><img src=/" + i.URL + "></li>")
        })
    })
})