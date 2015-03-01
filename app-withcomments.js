//artApp = is a namespace
//declare a namespace, called artApp
var artApp = {};
artApp.colour = "";
//saving the api key so we don't have to hard code
artApp.key = "DuHVObzL";

//init is the thing that kicks it off
//runs and gets the art
artApp.init = function() {
	//console.log('this has been clicked');
	//SO. on clich of the link, create a var called colour to
	//go to the html, find the data-attribute, 
	//and store in the colour var, the color that was set in the attribute
	//call getPieces (putting everything together) + pass it the the HEX code set in the HTML
	$('a.color-choice').on('click', function(e){
		e.preventDefault();
		//console.log("this works");
		var name = $(this).data('colname');
		$('.the-color').text(name);
		artApp.colour = name;
		var colour = $(this).data('colour');
		artApp.getPieces(colour);

		
	});
};

//this is getting stuff from the api
//declare a method to go and get the artwork
//getPieces = what is getting the art 
artApp.getPieces = function(colour) {
	// console.log('going to fetch the art');
	$.ajax({
		//url + type = standard in ajax requests
		url : "https://www.rijksmuseum.nl/api/en/collection",
		type : "GET",
		//this is a data object -- these options are specific to the rijksmuseum api
		//changes with each api -- see docs for other options
		data : {
			key : artApp.key,
			//go get jsonp
			format : "jsonp",
			ps : "25", 
			// q : query,
			f : {
				normalized32Colors : {
					hex : colour //so can pass color elsewhere
				}
			}
		},
		//be ready for jsonp
		dataType : "jsonp",
		//success = callback
		//when the ajax request comes back, run this code (success func)
		success : function(result){
			//make sure it works! (it works.)
			$('#artwork').empty();
			//console.log(result);
			artApp.displayPieces(result.artObjects);	
		},	
	});
};

// this shows the stuff from the api
artApp.displayPieces = function(pieces){
	//console.log('display pieces is called'); 
	//we call it pieces because we pass it as the variable above (pieces)
	//doens't matter what is was called in a previous function since -- it is getting passed here
	//console.log(pieces);
	//loop over each piece

	for (var i = 0; i < pieces.length; i++) {
		//console.log("Here is a piece");
		//console.log(pieces[i]);
		//let's inject an image into the page
		//creates an image, sets an attribute and then
		//need to put it onto the page (var img = )s
		// console.log(pieces[i]);
		var img = "";
		if (pieces[i].webImage != null) {
			img = $("<img>").attr("src", pieces[i].webImage.url);
		}

		var artext = $("<p class='title'>").text(pieces[i].title);
		var artist = $("<p class='artist'>").text(pieces[i].principalOrFirstMaker);
		// var oneContain = $("<div class='wrapper'>").append(artext, artist);
		var oneContain = $("<div class='wrapper " + artApp.colour + "'>").append(img, artext, artist);
		$(".container").append(oneContain);
	}//end the for loop
};


$('a.color-choice.cc-1').on('click', function(){
	// console.log('selected a tag')
	$('.container').find('p.title').css('background', '#333333');
	// console.log('found the wrapper');
});

//this is what actaully runs the init
//runs when the doc is readys
$(function(){
	artApp.init();
});