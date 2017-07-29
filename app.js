console.log("linked");

$(".search-button").click(function() {
	var gifsSearch = $("input").val();
	console.log(gifsSearch);
	var gifsURL = encodeURIComponent(gifsSearch);
	console.log(gifsURL);
	$(".gif-container").empty();
	getGifs(gifsURL);
	createButtons();
});

$(".key-button").click(function() {
	console.log("clicking key works")
})

var page = 0;

var buttonArray = [];

function getGifs(searchTerm) {
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
		$(".search-result").click(function() {
			console.log("clicking result works");
			var index = $(this).index();
			console.log(index);
			if ($(this).hasClass("downsized-still")) {
				$(this).replaceWith(createGifs(response.data[index]));
			} else if ($(this).hasClass("original-moving")) {
				console.log("works")
				$(this).replaceWith(createStills(response.data[index]));
			}
		});
	});
}

function createResults(data) {
	var container = document.createElement('div');
	var gifStatic = document.createElement('img');
	var gifRating = document.createElement('span');
	$(gifStatic).attr({
			"class": "img-responsive search-result downsized-still",
			"src": data.images.downsized_still.url,
		}),
		gifRating.innerHTML = "Rating: " + data.rating;

	container.appendChild(gifStatic);
	container.appendChild(gifRating);
	$(container).addClass("panel-body")
	return container;
}

function createButtons() {
	//if (){
	var button = document.createElement('button');
	$(button).html($("input").val());
	$(button).addClass("btn btn-default key-button");
	$(".button-container").append(button);
	//}
}

function createGifs(still) {
	var gifMoving = document.createElement('img');
	$(gifMoving).attr({
		"class": "img-responsive search-result original-moving",
		"src": still.images.original.url,
	});
	return gifMoving;
}

function createStills(gif) {
	var gifStatic = document.createElement('img');
	$(gifStatic).attr({
		"class": "img-responsive search-result downsized-still",
		"src": gif.images.downsized_still.url,
	});
	return gifStatic;
}

//function paginate()