var dataLength = 0;
var firstPageLoad;
//cards per page
var cpp = 10; 

var pagCreated = false;
var page = 1;
var currPage = 1;
var maxPages = 0;
function fetchData(page) {
	fetch('https://api.pokemontcg.io/v1/cards')
		.then(function (response) {
			return response.json();
		
		})
		
		.then(function (data) {
			if(dataLength != data.cards.length) {
				dataLength = data.cards.length;
			}
			paginationCreate(dataLength);
			appendData(data, page);
			console.log(data);
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
}
function appendData(data, page) {
	var mainContainer = document.getElementById("container");
	var pag = document.getElementById("pagination");
	var maxItems = page*cpp
	if(maxItems > data.cards.length){ maxItems = data.cards.length;}
		for (var i = (page*cpp)-cpp; i < maxItems; i++) {
			var div = document.createElement("div");
			var cardId = data.cards[i].id;
			div.className="cards";
			div.id=i;
			div.innerHTML = 
				'<div class="pic" id="pic' + i + '">' +
					'<img class="picc" src="' + data.cards[i].imageUrl +
					'" alt="' + data.cards[i].name + 
					'" onclick="redirect(' + i + ')">' + 
				'</div>' +
				'<div class="info">' + 
					'<p>Name: '+ data.cards[i].name + '</p>' + 
					'<p>Type: '+ data.cards[i].types + '</p>' + 
					'<p>Rarity: '+ data.cards[i].rarity + '</p>' + 
					'<p>Set: '+ data.cards[i].set + '</p>' + 
				'</div>'
			mainContainer.insertBefore(div,pag);
			currPage = page;
			var activePag = document.getElementById("pag"+page);
			activePag.style.backgroundColor = "#F8F8F8";
		}
}
function redirect(cardId){
	if(cardId != null) {
		console.log(cardId);
		window.location.href="profile.html?"+cardId;
	}
}
function paginationCreate(dataLength) {
	var pagination = document.getElementById("pagination");
	maxPages = 0;
	if(pagCreated == true) {
			var element = document.getElementById("prev");
			element.parentNode.removeChild(element);
		}
		
	var prev = document.createElement("a");
	prev.id = "prev";
	prev.innerHTML='<a href="#previous" onclick="previous()" active >&laquo;</a>'
	pagination.appendChild(prev);
	
	if(pagCreated == true) {
			var element = document.getElementById("next");
			element.parentNode.removeChild(element);
		}
		
	var next = document.createElement("next");
	next.innerHTML='<a href="#next" onclick="next()">&raquo;</a>'
	next.id = "next";
	pagination.appendChild(next);
	for(var i=0; i < dataLength/cpp; i++) {
		if(pagCreated == true) {
			var element = document.getElementById("pag"+(i+1));
			element.parentNode.removeChild(element);
		}
		var pag = document.createElement("a");
		pag.id ="pag"+(i+1);
		pag.style.backgroundColor="transparent";
		pag.innerHTML = '<a href="#' + (i+1) + '" onclick="jumpToPage(' + (i+1)+ ');">' + (i+1) + '</a>';
		pagination.insertBefore(pag,next);
		maxPages +=1;
		
	}
	pagCreated = true;

}
function deleteDivs() {
	for(var i = 0; i < dataLength; i++) {
		if(document.getElementById(i) != null){
		var element = document.getElementById(i);
		element.parentNode.removeChild(element);
		}
	}
}
function jumpToPage(page) {
	deleteDivs();
	fetchData(page);
}
function next() {
	
	if(currPage < maxPages){
		jumpToPage(currPage+1);
	}
}

function previous() {
	
	if(currPage>1) {
		jumpToPage(currPage-1);
	}
}
fetchData(page);

