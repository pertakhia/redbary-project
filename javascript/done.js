const customSelecter = document.querySelector(".custom-select")
const listContainer = document.querySelector(".list-container")
const dataTotal = document.querySelector(".data-total")
const dataImagContainer = document.querySelector(".image-container")
const customSelectData = document.querySelector(".custom-select-data")
const customSelectedName = document.querySelector(".select-selected-data")
const radioGroup = document.querySelector(".radio-group")
const finished = document.querySelector(".btn-done")
let url = "https://chess-tournament-api.devtest.ge/api/grandmasters"

finished.addEventListener("click", function (event) {
  event.preventDefault()
  let newInfo = localStorage.getItem("personInformation")
  newInfoEl = JSON.parse(newInfo)
  let personInformation = {
    name: newInfoEl.name,
    email: newInfoEl.email,
    phone: newInfoEl.phone,
    date_of_birth: newInfoEl.date_of_birth,
    experience_level: newInfoEl.experience_level,
    already_participated: newInfoEl.already_participated,
    character_id: newInfoEl.character_id,
  }
  if (
    newInfoEl.experience_level !== null &&
    newInfoEl.already_participated !== null &&
    newInfoEl.character_id !== null
  ) {
    fetch("https://chess-tournament-api.devtest.ge/api/register", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personInformation),
    })
      .then(function (response) {
        if (response.ok == true) {
          alert("You have successfully registered")
          event.target.parentElement.onclick = null
          event.target.parentElement.click()
        }
      })
      .catch(function (error) {
        console.log("Request failed", error)
      })
  } else {
    alert("Please fill all the fields")
  }
})

let radioVal
let characterId
let experience_level_glob
let charachterName

let experiencLevel = document.querySelector(".select-selected")

const radios = document.querySelectorAll('input[name="contact"]')
radios.forEach((radio) => {
  radio.addEventListener("click", function () {
    radioVal = radio.value
    if (radioVal === "true") {
      radioVal = true
    } else {
      radioVal = false
    }
    let newInfo = localStorage.getItem("personInformation")
    newInfoEl = JSON.parse(newInfo)
    let personInformation = {
      name: newInfoEl.name,
      email: newInfoEl.email,
      phone: newInfoEl.phone,
      date_of_birth: newInfoEl.date_of_birth,
      experience_level: newInfoEl.experience_level,
      already_participated: radioVal,
      character_id: newInfoEl.character_id,
      character_name: newInfoEl.character_name,
    }
    localStorage.setItem("personInformation", JSON.stringify(personInformation))
  })
})

var selectBox, i, j, l, ll, selElmnt, a, b, c

var listItem, listItemId, listItemName, listItemImage, listItemData

function createLIst() {
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      dataTotal.innerHTML = data.length
      for (let i = 0; i < data.length; i++) {
        listItem = document.createElement("div")
        listItem.classList.add("list-character-id")
        listItem.setAttribute("id", data[i].id)
        listContainer.appendChild(listItem)
        listItemName = document.createElement("h1")
        listItemName.classList.add("character-name")
        listItemName.innerHTML = data[i].name
        imageContainer = document.createElement("div")
        imageContainer.classList.add("image-container")
        listItemImage = document.createElement("img")
        listItemImage.classList.add("character-image")
        listItemImage.src = data[i].image
        listItem.appendChild(listItemName)
        imageContainer.appendChild(listItemImage)
        listItem.appendChild(imageContainer)
      }
    })
    .catch(function () {
      console.log("error")
    })
}

createLIst()

listContainer.addEventListener("click", function (e) {
  e.stopPropagation()
  const dataListId = document.querySelectorAll(".list-character-id")
  for (let i = 0; i < dataListId.length; i++) {
    dataListId[i].addEventListener("click", function () {
      customSelectedName.innerHTML = this.children[0].innerHTML
      listContainer.classList.remove("show-list")
    })
  }
})

window.addEventListener("load", function () {
  let newInfo = localStorage.getItem("personInformation")
  let newInfoObj = JSON.parse(newInfo)
  if (
    newInfoObj.character_id === null &&
    newInfoObj.character_name === null &&
    newInfoObj.already_participated === null &&
    newInfoObj.experience_level === null
  ) {
    return
  } else {
    a.innerHTML = newInfoObj.experience_level
    customSelectedName.innerHTML = newInfoObj.character_name
    if (newInfoObj.already_participated === true) {
      radios[0].checked = true
      console.log("true")
    } else {
      radios[1].checked = true
      console.log("false")
    }
  }
})

customSelectData.addEventListener("click", function (e) {
  const dataListId = document.querySelectorAll(".list-character-id")
  listContainer.classList.toggle("show-list")
  customSelectedName.classList.toggle("select-arrow-active-ch")
  for (let i = 0; i < dataListId.length; i++) {
    dataListId[i].addEventListener("click", function () {
      customSelectedName.innerHTML = this.children[0].innerHTML
      charachterName = this.children[0].innerHTML
      characterId = this.id
      let newInfo = localStorage.getItem("personInformation")
      let newInfoObj = JSON.parse(newInfo)
      let personInformation = {
        name: newInfoObj.name,
        email: newInfoObj.email,
        phone: newInfoObj.phone,
        date_of_birth: newInfoObj.date_of_birth,
        experience_level: newInfoObj.experience_level,
        already_participated: newInfoObj.already_participated,
        character_id: characterId,
        character_name: charachterName,
      }
      localStorage.setItem(
        "personInformation",
        JSON.stringify(personInformation)
      )
      if (
        listContainer.classList.contains("show-list") &&
        customSelectedName.classList.contains("select-arrow-active-ch")
      ) {
        listContainer.classList.remove("show-list")
        customSelectedName.classList.remove("select-arrow-active-ch")
      }
    })
  }
})

selectBox = document.getElementsByClassName("custom-select")
l = selectBox.length
for (i = 0; i < l; i++) {
  selElmnt = selectBox[i].getElementsByTagName("select")[0]
  ll = selElmnt.length
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV")
  a.setAttribute("class", "select-selected")
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  selectBox[i].appendChild(a)
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV")
  b.setAttribute("class", "select-items select-hide")
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV")
    c.innerHTML = selElmnt.options[j].innerHTML
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl
      s = this.parentNode.parentNode.getElementsByTagName("select")[0]
      sl = s.length
      h = this.parentNode.previousSibling
      /* localStorage is a global object that can be used to store data locally, */
      // let newInfo = localStorage.getItem("personInformation")
      // let newInfoObj = JSON.parse(newInfo)
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i
          h.innerHTML = this.innerHTML
          experience_level_glob = h.innerHTML
          let newInfo = localStorage.getItem("personInformation")
          let newInfoObj = JSON.parse(newInfo)
          let personInformation = {
            name: newInfoObj.name,
            email: newInfoObj.email,
            phone: newInfoObj.phone,
            date_of_birth: newInfoObj.date_of_birth,
            experience_level: experience_level_glob,
            already_participated: newInfoObj.already_participated,
            character_id: newInfoObj.character_id,
            character_name: newInfoObj.character_name,
          }
          localStorage.setItem(
            "personInformation",
            JSON.stringify(personInformation)
          )
          y = this.parentNode.getElementsByClassName("same-as-selected")
          yl = y.length
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class")
          }
          this.setAttribute("class", "same-as-selected")
          break
        }
      }
      h.click()
    })
    b.appendChild(c)
  }
  selectBox[i].appendChild(b)
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation()
    closeAllSelect(this)
    this.nextSibling.classList.toggle("select-hide")
    this.classList.toggle("select-arrow-active")
  })
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = []
  x = document.getElementsByClassName("select-items")
  y = document.getElementsByClassName("select-selected")
  xl = x.length
  yl = y.length
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active")
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide")
    }
  }
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
customSelecter.addEventListener("click", closeAllSelect)
