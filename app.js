console.log("linked");

$("button").click(function() {
	var gifsSearch = $("input").val();
	console.log(gifsSearch);
	var gifsURL = encodeURIComponent(gifsSearch);
	console.log(gifsURL);
	getGifs(gifsURL);
});

$(".downsized-still").click(function() {
	console.log("clicking works");
})

var page = 0;

function getGifs(searchTerm) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://api.giphy.com/v1/gifs/search?api_key=54f4043575b14e258a8647789f238224&q=" + searchTerm + "&limit=10&offset=" + page + "",
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

//function paginate()

function createResults(data) {
	var container = document.createElement('div');
	var gifStatic = document.createElement('img');
	var gifRating = document.createElement('span');
	$(gifStatic).attr({
			"class": "img-responsive downsized-still",
			"src": data.images.downsized_still.url,
		}),
		gifRating.innerHTML = "Rating: " + data.rating;

	container.appendChild(gifStatic);
	container.appendChild(gifRating);
	$(container).addClass("panel-body")
	return container;
}