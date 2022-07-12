//Variables
let personName = document.getElementById("name")
let personEmail = document.getElementById("email")
let personPhone = document.getElementById("number")
let personDate = document.getElementById("date")
const personInfoBtn = document.querySelector(".person-btn")
const personInfoBtnText = document.querySelector(".person-btn-text")
const personInfoCheckIcon = document.querySelector(".show-checked-btn")
const errorMessage = document.querySelector(".error-modal-message")
const errorHeader = document.querySelector(".error-message-header")
const errordescription = document.querySelector(".error-message-paragrap")

function validate(name) {
  var regex = /^[a-zA-Z ]{2,30}$/
  return regex.test(name)
}

function validEmail(email) {
  var regex = /^\w+([\.-]?\w+)*@redberry\.ge$/
  return regex.test(email)
}

function validNumber(number) {
  var regex = /^[0-9]{9}$/
  return regex.test(number)
}

function validDate(date) {
  var regex = new RegExp(
    "([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})"
  )
  return regex.test(date)
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false
  return true
}

function avtoSavePersonInformation() {
  if (localStorage.getItem("personInformation")) {
    let personInformationIs = localStorage.getItem("personInformation")
    personInformationIs = JSON.parse(personInformationIs)
    let personInformation = {
      name: personName.value,
      email: personEmail.value,
      phone: personPhone.value,
      date_of_birth: personDate.value,
      experience_level: personInformationIs.experience_level,
      already_participated: personInformationIs.already_participated,
      character_id: personInformationIs.character_id,
      character_name: personInformationIs.character_name,
    }
    localStorage.setItem("personInformation", JSON.stringify(personInformation))
  } else {
    let personInformation = {
      name: personName.value,
      email: personEmail.value,
      phone: personPhone.value,
      date_of_birth: personDate.value,
      experience_level: null,
      already_participated: null,
      character_id: null,
      character_name: null,
    }
    localStorage.setItem("personInformation", JSON.stringify(personInformation))
  }
}

const onPersonInformation = (event) => {
  event.preventDefault()
  let errorMessageAll = ""
  let errorMesaageDescription = ""
  if (!validate(personName.value)) {
    personName.style.background = "#FFEFEF"
    personName.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personName.style.borderRadius = "4px"
    personName.style.color = "#DC3545"
    errorMessage.style.display = "flex"
    errorMessageAll += "Error in Name; "
    errorMesaageDescription += "Name is not valid or empty; "
  }
  if (!validEmail(personEmail.value)) {
    personEmail.style.background = "#FFEFEF"
    personEmail.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personEmail.style.borderRadius = "4px"
    personEmail.style.color = "#DC3545"
    errorMessage.style.display = "flex"
    errorMessageAll += "Error in Email;"
    errorMesaageDescription += "Email is example@redberry.ge; "
  }
  if (!validNumber(personPhone.value)) {
    personPhone.style.background = "#FFEFEF"
    personPhone.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personPhone.style.borderRadius = "4px"
    personPhone.style.color = "#DC3545"
    errorMessage.style.display = "flex"
    errorMessageAll += "Error in Phone; "
    errorMesaageDescription += "Phone Number is not valid or empty; "
  }
  if (!validDate(personDate.value)) {
    personDate.style.background = "#FFEFEF"
    personDate.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personDate.style.borderRadius = "4px"
    personDate.style.color = "#DC3545"
    errorMessage.style.display = "flex"
    errorMessageAll += "Error in Date; "
    errorMesaageDescription += "Date is not valid or empty; "
  }
  errorHeader.innerHTML = errorMessageAll
  errordescription.innerHTML = errorMesaageDescription

  if (
    validate(personName.value) &&
    validEmail(personEmail.value) &&
    validNumber(personPhone.value) &&
    validDate(personDate.value)
  ) {
    avtoSavePersonInformation()
    savePersonInformation()
    event.target.parentElement.onclick = null
    event.target.parentElement.click()
  }
}

errorMessage.addEventListener("click", () => {
  errorMessage.style.display = "none"
})

personName.addEventListener("input", (event) => {
  personName.style.setProperty("background-color", "#E9ECEF", "important")
  personName.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
  personName.style.borderRadius = "4px"
  personName.style.color = "#212529"
  if (personName.value === "") {
    personName.nextElementSibling.style.display = "block"
  } else {
    personName.nextElementSibling.style.display = "none"
  }
  if (validate(event.target.value)) {
    personName.nextElementSibling.nextElementSibling.style.display = "block"
    personName.style.setProperty("background-color", "#FFFFFF", "important")
    personInfoBtn.style.setProperty("background-color", "#E9FAF1", "important")
  } else {
    personName.nextElementSibling.nextElementSibling.style.display = "none"
    personInfoBtn.style.setProperty("background-color", "#FFFFFF", "important")
  }
  avtoSavePersonInformation()
  validationAllPersonalInfo()
})

personName.addEventListener("focusout", (event) => {
  if (personName.value === "") {
    personName.nextElementSibling.style.display = "block"
    personName.style.setProperty("background-color", "#FFFFFF", "important")
  } else if (!validate(personName.value)) {
    personName.style.background = "#FFEFEF"
    personName.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personName.style.borderRadius = "4px"
    personName.style.color = "#DC3545"
  }
})

personEmail.addEventListener("input", (event) => {
  personEmail.style.setProperty("background-color", "#E9ECEF", "important")
  personEmail.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
  personEmail.style.borderRadius = "4px"
  personEmail.style.color = "#212529"
  if (personEmail.value === "") {
    personEmail.nextElementSibling.style.display = "block"
  } else {
    personEmail.nextElementSibling.style.display = "none"
  }
  if (validEmail(event.target.value)) {
    personEmail.nextElementSibling.nextElementSibling.style.display = "block"
    personEmail.style.setProperty("background-color", "#FFFFFF", "important")
  } else {
    personEmail.nextElementSibling.nextElementSibling.style.display = "none"
  }
  avtoSavePersonInformation()
  validationAllPersonalInfo()
})

personEmail.addEventListener("focusout", (event) => {
  if (personEmail.value === "") {
    personEmail.nextElementSibling.style.display = "block"
    personEmail.style.setProperty("background-color", "#FFFFFF", "important")
  } else if (!validEmail(personEmail.value)) {
    personEmail.style.background = "#FFEFEF"
    personEmail.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personEmail.style.borderRadius = "4px"
    personEmail.style.color = "#DC3545"
  }
})

personPhone.addEventListener("input", (event) => {
  event.target.value = event.target.value.match(/^([^e+-]{0,9})/)[0]
  personPhone.style.setProperty("background-color", "#E9ECEF", "important")
  personPhone.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
  personPhone.style.borderRadius = "4px"
  personPhone.style.color = "#212529"
  if (personPhone.value === "") {
    personPhone.nextElementSibling.style.display = "block"
  } else {
    personPhone.nextElementSibling.style.display = "none"
  }
  if (validNumber(event.target.value)) {
    personPhone.nextElementSibling.nextElementSibling.style.display = "block"
    personPhone.style.setProperty("background-color", "#FFFFFF", "important")
  } else {
    personPhone.nextElementSibling.nextElementSibling.style.display = "none"
  }
  avtoSavePersonInformation()
  validationAllPersonalInfo()
})

personPhone.addEventListener("focusout", (event) => {
  if (personPhone.value === "") {
    personPhone.nextElementSibling.style.display = "block"
    personPhone.style.setProperty("background-color", "#FFFFFF", "important")
  } else if (!validNumber(personPhone.value)) {
    personPhone.style.background = "#FFEFEF"
    personPhone.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personPhone.style.borderRadius = "4px"
    personPhone.style.color = "#DC3545"
  }
})

personDate.addEventListener("focus", (event) => {
  personDate.type = "date"
  personDate.nextElementSibling.style.display = "none"
})

personDate.addEventListener("input", (event) => {
  personDate.nextElementSibling.style.display = "none"
  event.type = "date"
  personDate.style.setProperty("background-color", "#E9ECEF", "important")
  personDate.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
  personDate.style.borderRadius = "4px"
  personDate.style.color = "#212529"
  if (validDate(event.target.value)) {
    personDate.nextElementSibling.nextElementSibling.style.display = "block"
    personDate.style.setProperty("background-color", "#FFFFFF", "important")
  } else {
    personDate.nextElementSibling.nextElementSibling.style.display = "none"
  }
  avtoSavePersonInformation()
  validationAllPersonalInfo()
})

personDate.addEventListener("focusout", (event) => {
  personDate.setAttribute("type", "text")
  if (personDate.value === "") {
    personDate.nextElementSibling.style.display = "block"
    personDate.style.setProperty("background-color", "#FFFFFF", "important")
  } else if (!validDate(personDate.value)) {
    personDate.style.background = "#FFEFEF"
    personDate.style.boxShadow = "inset 0px -1px 0px rgba(0, 0, 0, 0.125)"
    personDate.style.borderRadius = "4px"
    personDate.style.color = "#DC3545"
  }
})

function validationAllPersonalInfo() {
  if (
    validate(personName.value) &&
    validEmail(personEmail.value) &&
    validNumber(personPhone.value) &&
    validDate(personDate.value)
  ) {
    personInfoBtnText.style.display = "none"
    personInfoCheckIcon.style.display = "block"
    personName.nextElementSibling.nextElementSibling.style.display = "block"
    personEmail.nextElementSibling.nextElementSibling.style.display = "block"
    personPhone.nextElementSibling.nextElementSibling.style.display = "block"
    personDate.nextElementSibling.nextElementSibling.style.display = "block"
    personInfoBtn.style.setProperty("background-color", "#E9FAF1", "important")
  } else {
    personInfoBtnText.style.display = "block"
    personInfoCheckIcon.style.display = "none"
  }
}

const savePersonInformation = () => {
  let personInformation = localStorage.getItem("personInformation")
  personInformation = JSON.parse(personInformation)
  if (!personInformation) {
    return
  } else {
    personName.value = personInformation.name
    personEmail.value = personInformation.email
    personPhone.value = personInformation.phone
    personDate.value = personInformation.date_of_birth
  }
  validationAllPersonalInfo()
}

// const onResetPersonInformation = (event) => {
//   event.preventDefault()
//   localStorage.removeItem("personInformation")
//   event.target.parentElement.onclick = null
//   event.target.parentElement.click()
// }

savePersonInformation()
