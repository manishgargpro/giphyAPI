console.log("linked");

var gifsURL = "";

$(".search-button").click(function() {
	var gifsSearch = $("input").val();
	console.log(gifsSearch);
	gifsURL = encodeURIComponent(gifsSearch);
	console.log(gifsURL);
	getGifs(gifsURL, pageNum);
	createButtons(gifsSearch);
});

var pageNum = 0;

var buttonArray = [];

function getGifs(searchTerm, page) {
	$(".gif-container").empty();

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.giphy.com/v1/gifs/search?api_key=54f4043575b14e258a8647789f238224&q=" + searchTerm + "&limit=10&offset=" + page + "",
		"method": "GET",
	}

	$.ajax(settings).done(function(response) {
		console.log(response);
		for (i = 0; i < response.data.length; i++) {
			var staticGif = createResults(response.data[i]);
			$(".gif-container").append(staticGif);
		}
		$(".page").html(page);
	});
}

$("body").on("click", ".key-button", function(){
	gifsURL = encodeURIComponent($(this).html())
	getGifs(gifsURL);
})

$("body").on("click", ".search-result", function() {
	console.log("clicking result works");
	if ($(this).attr("data-animated") == "false") {
		var pictureID = $(this).attr("id")
		console.log(pictureID);
		$(this).replaceWith(createGifs(pictureID));
	} else if ($(this).attr("data-animated") == "true") {
		var pictureID = $(this).attr("id")
		console.log(pictureID);
		console.log("works")
		$(this).replaceWith(createStills(pictureID));
	}
});

function createResults(data) {
	var container = document.createElement('div');
	var gifStatic = document.createElement('img');
	var gifRating = document.createElement('span');
	$(gifStatic).attr({
			"class": "img-responsive search-result",
			"src": data.images.downsized_still.url,
			"id": data.id,
			"data-animated": false
		}),
		gifRating.innerHTML = "Rating: " + data.rating;

	container.appendChild(gifStatic);
	container.appendChild(gifRating);
	$(container).addClass("panel-body")
	return container;
}

function createButtons(text) {
	var buttons = buttonArray[text]
	if (!buttonArray[text]){
		buttonArray[text] = true;
		var button = document.createElement('button');
		$(button).html(text);
		$(button).addClass("btn btn-default key-button");
	}
	$(".button-container").append(button);
}

function createGifs(stillID) {
	var gifMoving = document.createElement('img');
	$(gifMoving).attr({
		"class": "img-responsive search-result",
		"id": stillID,
		"src": "https://media1.giphy.com/media/" + stillID + "/giphy.gif",
		"data-animated": "true"
	});
	return gifMoving;
}

function createStills(gifID) {
	var gifStatic = document.createElement('img');
	$(gifStatic).attr({
		"class": "img-responsive search-result",
		"id": gifID,
		"src": "https://media1.giphy.com/media/" + gifID + "/giphy_s.gif",
		"data-animated": "false"
	});
	return gifStatic;
}

//function paginate()