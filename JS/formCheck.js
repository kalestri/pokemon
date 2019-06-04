function validate() {

	var name = document.forms["form"]["name"].value;
	var lastName = document.forms["form"]["lastName"].value;
	var email = document.forms["form"]["email"].value;
	var message = document.forms["form"]["message"].value;
	
	validateName(name);
	validateLastName(lastName);
	validateEmail(email);
	validateMessage(message);

	if(validateName(name) == true && validateLastName(lastName) == true && validateEmail(email) == true && validateMessage(message)== true) {
		console.log("Message SENT!");
	}
	else{
		alert("Some of your fields are invalid!");
	}
}
function validateName(name){
	if(name !=null && name.length >= 2 && name.length <= 15){
		document.forms["form"]["name"].style.boxShadow = null;
		return true;
	}
	else {
		document.forms["form"]["name"].placeholder = "Error: 2-15 characters allowed!";
		document.forms["form"]["name"].style.boxShadow = "0px 0px 30px red" 
	}
}

function validateLastName(lastName){
	
	if(lastName !=null && lastName.length >= 2 && lastName.length <= 15){
		document.forms["form"]["lastName"].style.backgroundColor = "white";
			document.forms["form"]["lastName"].style.boxShadow = null;
		return true;
	}
	else {
		document.forms["form"]["lastName"].placeholder = "Error: 2-15 characters allowed!";
		document.forms["form"]["lastName"].style.boxShadow = "0px 0px 30px red" 
	}
}

function validateEmail(email) {
	
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.match(mailformat)) {
		document.forms["form"]["email"].style.boxShadow = null;
		return true;
		}
	else {
		document.forms["form"]["email"].placeholder = "Error: Incorrect email format!";
		document.forms["form"]["email"].style.boxShadow = "0px 0px 30px red" 
	}
}

function validateMessage(message){
	
	if(message !=null && message.length > 0 && name.length <= 100){
		document.forms["form"]["message"].style.boxShadow = null;
		return true;
	}
	else {
		document.forms["form"]["message"].placeholder = "Error: 100 characters limit!";
		document.forms["form"]["message"].style.boxShadow = "0px 0px 30px red" 
	}
}