

$(document).ready(function() {
    
    $("#form-gif-request").submit(fetchAndDisplayGif); 
});


function fetchAndDisplayGif(event) {
    
    event.preventDefault();
    
    var searchQuery = $("input[name='tag']").val() ; 
   
    var riddleAnswer = $("input[name='riddle']").val();

    if (riddleAnswer != 5 || searchQuery == "" ) {

        $("#feedback").text("No gifs for you!");
        setGifLoadedStatus(false);
        return;
    }

    var params = { 
        api_key: "dc6zaTOxFJmzC", 
        tag : "jackson 5 " + searchQuery 
    };


    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random",
        data: params, 
        success: function(response) {
            gifUrl = response.data.image_url
            $("#gif").attr("src", gifUrl)
            setGifLoadedStatus(true);
            $("#feedback").text("");
        },
        error: function() {
         
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
    $("#feedback").text("Loading...");
    setGifLoadedStatus(false);
}

function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}