var cardId = document.location.href.split('?').pop();
function fetchData(cardId) {
	fetch('https://api.pokemontcg.io/v1/cards')
		.then(function (response) {
			return response.json();
		
		})
		
		.then(function (data) {
			appendData(data, cardId);
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
}

function appendData(data, cardId) {
	var mainContainer = document.getElementById("container");
	var footer = document.getElementById("footer");
	var att = "";
	var res = "";
	var weak = "";
		for (var i = 0; i < data.cards.length; i++) {
			if(i == cardId){
			var div = document.createElement("div");
			div.className= "cardProfile";
			
			if(data.cards[i].attacks != null) {
				for(var x = 0; x < data.cards[i].attacks.length; x++){
					if(x+1 >= data.cards[i].attacks.length){
					att+=data.cards[i].attacks[x].name;
					}
					else{ att+=data.cards[i].attacks[x].name+", ";}
						
				}
			}
			else{ att = "None";}
			
			if(data.cards[i].resistances != null) {
				for(var x = 0; x < data.cards[i].resistances.length; x++){
					if(x+1 >= data.cards[i].resistances.length){
					res+=data.cards[i].resistances[x].type+" "+data.cards[i].resistances[x].value;
					}
					else{ att+=data.cards[i].resistances[x].type+" "+data.cards[i].resistances[x].value+", ";}
						
				}
			}
			else{ res = "None";}
			
			if(data.cards[i].weaknesses != null) {
				for(var x = 0; x < data.cards[i].weaknesses.length; x++){
					if(x+1 >= data.cards[i].weaknesses.length){
					weak+=data.cards[i].weaknesses[x].type+" "+data.cards[i].weaknesses[x].value;
					}
					else{ weak+=data.cards[i].weaknesses[x].type+" "+data.cards[i].weaknesses[x].value+", ";}
						
				}
			}
			else{ weak = "None";}
			
			
			div.innerHTML =
				'<div class="pic" id="pic' + i + '">' +
					'<img src="' + data.cards[i].imageUrlHiRes +
					'" alt="' + data.cards[i].name + '">' + 
				'</div>' +
				'<div class="infoDet">' + 
					'<p>Name: '+ data.cards[i].name + '</p>' + 
					'<p>Type: '+ data.cards[i].types + '</p>' + 
					'<p>Subtype: '+ data.cards[i].subtype + '</p>' + 
					'<p>Rarity: '+ data.cards[i].rarity + '</p>' + 
					'<p>Set: '+ data.cards[i].set + '</p>' + 
					'<p>Series: '+ data.cards[i].set + '</p>' + 
					'<p>Artist: '+ data.cards[i].artist + '</p>' + 
					'<p>Attacks: '+ att + '</p>' + 
					'<p>Resistances: '+ res + '</p>' + 
					'<p>Weaknesses: '+ weak + '</p>' + 
				'</div>';
			mainContainer.insertBefore(div,footer);
			}
		}
}
if(isNaN(cardId)){
	alert("Please pick a card from All Cards");
	window.location.href="index.html";
}
else{
	fetchData(cardId);
	}