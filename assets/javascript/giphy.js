$(document).ready(function(){
  // Initial array of Foods
  var foods = ["Pizza", "Tacos", "Ramen", "Sushi", "Pho", "Hamburgers", "Gyros"];

  function displayFoods() {

    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=d46HBa0HKMt4wdzOV7u9wG1f1fFXEBTX&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      $("#foodDis").empty();
      
      console.log(response);

      for(var i = 0; i < response.length; i++) {
        $(document).ready(function(){

      console.log(response[i]);
        
        var foodDiv = $("<div>");

        foodDiv.addClass("foodpictures");

        var rating = response.data[i].rating;
        var p = $("<h2>").text("Rating: " + rating);

        var foodImage = $("<img>");
        foodImage.attr("src", results[i].images.fixed_height_still.url);
        foodImage.attr("data-still", results[i].images.fixed_height_still.url);
        foodImage.attr("data-animate", results[i].images.fixed_height.url);
        foodImage.attr("data-state", "still");
        foodImage.addClass('foodImage');

        foodDiv.prepend(p);

        foodDiv.prepend(foodImage);
        $("#foodDis").prepend(foodDiv);
        });
      }

      $(".foodImage").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });        
  }

  function renderButtons() {

    $("#foodButtons").empty();

    for(var i = 0; i < foods.length; i++) {

      var foodAdd = $("<button>");

      foodAdd.addClass("eatFood");

      foodAdd.attr("data-name", foods[i]);

      foodAdd.text(foods[i]);

      $("#foodButtons").append(foodAdd);
    }
  }

  $("#add-food").on("click", function(event){
    event.preventDefault();

    var food = $("#food-input").val().trim();

    foods.push(food);

    renderButtons();
  });

  $(document).on("click", ".eatFood", displayFoods);

  renderButtons();
});