$(document).ready(function () {

    // Pre-defined array of emotions
    var emotions = ["love", "joy", "surprise", "anger", "sadness", "fear", "pride", "relief", "rage", "disgust", "envy", "shame", "sympathy", "horror", "nervousness", "bitterness", "cheerfulness", "hope", "sorrow", "humiliation", "loneliness", "panic", "guilt", "excitement"];
  
    // Function for displaying all of the pre-entered emotions in the array above
    function displayGifButton() {
  
      // Deleting the buttons from the function area prior to adding new emotions, this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
  
      // Looping through the array of emotions
      for (var i = 0; i < emotions.length; i++) {
  
        // Then dynamically generating buttons for each emotion in the array
        var gifButton = $("<button>");
        // Adding a class of emotion to our button
        gifButton.addClass("emotion-btn btn btn-primary");
        // Adding a data-attribute
        gifButton.attr("data-name", emotions[i]);
        // Providing the initial button text
        gifButton.text(emotions[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(gifButton);
      }
    }
    // This function handles events when one of the emotion buttons is clicked - keeps page from refreshing
    function addEmotionButton() {
      $("#add-emotion").on("click", function (event) {
        event.preventDefault();
  
        // This line grabs the input from the textbox
        var emotion = $("#emotion-input").val().trim();
  
        if (emotion == "") {
          return false; //keeps user from creating blank button
        }
        emotions.push(emotion);
  
        displayGifButton();
        return false;
      });
    }
  
    // function to display the 10 emotion Gifs from API
    function displayEmotionGif() {
  
      var emotion = $(this).attr("data-name");
      console.log(emotion);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=kdVV9D6IbcW7fDsOIQBioMeCvVmb42cG&limit=10&rating=pg-13";
      //creating ajax call for specific emotion that the button takes from user input
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          $("#emotion-view").empty(); //clears div holding previously searched emotions
  
          var results = response.data;
          console.log(response.data);
  
          //var for holding the Name of the emotion
          var emotionName = $("<div>").text(emotion);
  
          //looping through each result item
          for (var i = 0; i < results.length; i++) {
  
            //creating and storing a div tag for each gif to display
            var emotionDiv = $("<div>");
  
            emotionDiv.addClass("emotionDiv");
  
            //var for holding the rating of gif
            var emotionRating = $("<p>").text("Rating: " + results[i].rating);
            //appending the paragraph and image tag to the emotionDiv
            emotionDiv.append(emotionName);
            emotionDiv.append(emotionRating);
  
            //creating and storing an image tag
            var emotionImage = $("<img>");
  
            //setting the src attribute of the image to the still image pulled from API
            emotionImage.attr("src", results[i].images.fixed_height_small_still.url);//sets the exact image we wish to use for our result
            emotionImage.attr("data-still", results[i].images.fixed_height_small_still.url);//sets the still image as the "still" source
            emotionImage.attr("data-animate", results[i].images.fixed_height_small.url);//sets the animated image as the "animate" source
            emotionImage.attr("data-state", "still");//sets the image state
            emotionImage.addClass("image");
            //attaching the image to the correct div          
            emotionDiv.append(emotionImage);
            //prepending the emotionDiv to the HTML page in the "#emotion-view"//
            $("#emotion-view").prepend(emotionDiv);
          }
        });
    }
    //calling functions & methods
    displayGifButton();
    addEmotionButton();
  
    //document event listeners
    $(document).on("click", ".emotion-btn", displayEmotionGif);
    $(document).on("click", ".image", function () {
      var state = $(this).attr("data-state");
      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
        console.log(this);
        console.log(state);
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
  
      console.log(response);
      }
  
    });
  });
  
  