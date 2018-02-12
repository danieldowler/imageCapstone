let username_valid = false
let password_valid = false
let reEnter_valid = false

function is_valid(){
const is_valid = username_valid&&password_valid&&reEnter_valid
$('.signup').prop("disabled", !is_valid)
}

$(function(){
$('.username').blur(function(){
    const username = $(this).val()
    if (username.trim().length<7){
        $('.username_err').show();
        username_valid = false
    }
    else{
        $('.username_err').hide();
        username_valid = true
    }
    is_valid()
})
$('.password').blur(function(){
    const password = $(this).val()
    if (password.trim().length<10){
        $('.password_err').show();
        password_valid= false
    }
    else{
        $('.password_err').hide();
        password_valid= true
    }
    is_valid()
})
$('.re-enter').blur(function(){
    const reEnter = $(this).val()
    const password = $('.password').val()
    if (reEnter !== password){
        $('.re-enter_err').show();
        reEnter_valid = false
    }
    else{
        $('.re-enter_err').hide();
        console.log('trueenter')
        reEnter_valid = true
    }
    is_valid()
})
$('.sign-button').click(function(){
    const username = $('username').val()
    const password = $('.password').val()
    const reEnter = $('.re-enter').val()

    $.ajax({
        url: "http://localhost:8080/user",
        method: "POST",
        dataType: "json",
        data: {username, password, reEnter}
    })
        .done(res => {
            console.log(res);
        })
})
$('.go-back').click(function(){
    window.location.href='index.html'
})
$('.sign-in').click(function(e){
    e.preventDefault()
    const form = $('.signin-form').clone(true)
    form.removeClass('hidden')
    $('.register').append(form)
    $('.hide').hide()
})
$('.cancel-button').click(function(e){
    e.preventDefault()
    $('.register .signin-form').remove()
    $('.hide').show()
})
$('.signin-user').blur(function(){
    const sigininUser = $(this).val()
    if (sigininUser.trim().length<7){
        $('.username-err').show();
    }
    else{
        $('.username-err').hide();
    }
})
$('.signin-pass').blur(function(){
    const sigininPass = $(this).val()
    if (sigininPass.trim().length<10){
        $('.pass-err').show();
    }
    else{
        $('.pass-err').hide();
    }
})
})
