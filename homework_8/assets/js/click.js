//jQuery ".ready function alias is $function()"

$(function(){
    //on click, remove id
    $("#message").click(function(){
        $("#message").remove()
    });
    
    //on load
    $(window).on("load",function(){
        console.log("loaded")
    })
})






