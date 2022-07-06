//Variables
let personName = document.getElementById('name')
let personEmail = document.getElementById('email')
let personPhone = document.getElementById('number')
let personDate = document.getElementById('date')


let url = "https://chess-tournament-api.devtest.ge/api/grandmasters";

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

fetchAsync(url);

function validate(name) {
    var regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(name);
}

function validEmail(email) {
    var regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return regex.test(email);
}

function validNumber(number) {
    var regex = /^[0-9]+$/;
    return regex.test(number);
}

function validDate(date) {
    var regex = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})")
    return regex.test(date);
}

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;

	return true;
}

personName.addEventListener('focus', (event) => { 
    personName.style.background = "#ffffff";
    personName.style.boxShadow= "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personName.style.borderRadius ="4px"
    personName.style.color = "#212529"
})



const onPersonInformation = (event) => {
    event.preventDefault();
    if(validate(personName.value)) {
        console.log("validationName", personName.value);
    }else {
        personName.style.background = "#FFEFEF";
        personName.style.boxShadow= "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
        personName.style.borderRadius ="4px"
        personName.style.color = "#DC3545"
    }
    if(validEmail(personEmail.value)) { 
        console.log("validEmail", personEmail.value);
    }else {
        personEmail.style.background = "#FFEFEF";
        personEmail.style.boxShadow= "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
        personEmail.style.borderRadius ="4px"
        personEmail.style.color = "#DC3545"
    }
    if(validNumber(personPhone.value)) {
        console.log("validNumber", personPhone.value);
    }else {
        personPhone.style.background = "#FFEFEF";
        personPhone.style.boxShadow= "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
        personPhone.style.borderRadius ="4px"
        personPhone.style.color = "#DC3545"
    }
    if(validDate(personDate.value)) {
        
    } else { 
        personDate.style.background = "#FFEFEF";
        personDate.style.boxShadow= "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
        personDate.style.borderRadius ="4px"
        personDate.style.color = "#DC3545"
    }
    let personInformation = {
        name: personName.value,
        email: personEmail.value,
        phone: personPhone.value,
        date: personDate.value
    }
    if(validate(personName.value) && validEmail(personEmail.value) && validNumber(personPhone.value) && validDate(personDate.value)) {
        console.log("all valid")
        localStorage.setItem("personInformation", JSON.stringify(personInformation));
        savePersonInformation();
        event.target.parentElement.onclick = null;
        event.target.parentElement.click();
    }
   
    console.log(personInformation);
    console.log(event)
}

const savePersonInformation = () => { 
    let personInformation = localStorage.getItem("personInformation");
    personInformation = JSON.parse(personInformation);
    if(!personInformation ) {
        return;
    }else if(personName.value === personInformation.name &&
         personEmail.value === personInformation.email && personPhone.value === personInformation.phone && personDate.value === personInformation.date) {
        return;
    } else {
    personName.value = personInformation.name;
    personEmail.value = personInformation.email;
    personPhone.value = personInformation.phone;
    personDate.value = personInformation.date;
    
    console.log("is personal",personInformation);
    
    console.log(personInformation);
    }
}

const onResetPersonInformation = (event) => {
    event.preventDefault();
    localStorage.removeItem("personInformation");
    event.target.parentElement.onclick = null;
    event.target.parentElement.click();
}

savePersonInformation();




