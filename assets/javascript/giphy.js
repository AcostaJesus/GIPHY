$(document).ready(function(){
  // Initial array of Foods
  var foods = ["Pizza", "Tacos", "Ramen", "Sushi", "Pho", "Hamburgers", "Gyros"];

  $(document).onload = renderButtons();

  $(document).on("click", ".eatFood", displayFoods);

  $("#add-food").on("click", function(event) {
    event.preventDefault();
    var food = $("#food-input").val().trim();
    foods.push(food);
    renderButtons();
  });

  $("#foodDis").on("click", ".foodImage", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  function displayFoods() {
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=d46HBa0HKMt4wdzOV7u9wG1f1fFXEBTX&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        $("#foodDis").empty();
        buildGifs(response);
    });
  };

  function buildGifs(response) {
    for(var i = 0; i < response.data.length; i++) {
      var data = response.data[i];
      var foodDiv = $("<div>");
      foodDiv.addClass("foodpictures");

      var p = $("<h2>").text("Rating: " + data.rating);
      var foodImage = $("<img>");
      foodImage.attr("src", data.images.fixed_height_still.url);
      foodImage.attr("data-still", data.images.fixed_height_still.url);
      foodImage.attr("data-animate", data.images.fixed_height.url);
      foodImage.attr("data-state", "still");
      foodImage.addClass('foodImage');

      foodDiv.prepend(p);
      foodDiv.prepend(foodImage);
      $("#foodDis").prepend(foodDiv);
    };
  };

  function renderButtons() {
    $("#foodButtons").empty();
    for(var i = 0; i < foods.length; i++) {
      var foodAdd = $("<button>");
      foodAdd.addClass("eatFood");
      foodAdd.attr("data-name", foods[i]);
      foodAdd.text(foods[i]);
      $("#foodButtons").append(foodAdd);
    };
  };

});