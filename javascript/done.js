let url = "https://chess-tournament-api.devtest.ge/api/grandmasters";

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  return data;
}

fetchAsync(url);

var selectBox, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
selectBox = document.getElementsByClassName("custom-select");
l = selectBox.length;
for (i = 0; i < l; i++) {
  selElmnt = selectBox[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  selectBox[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      /* localStorage is a global object that can be used to store data locally, */
      let newInfo = localStorage.getItem("personInformation");
      let newInfoObj = JSON.parse(newInfo);
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          let personInformation = {
            name: newInfoObj.name,
            email: newInfoObj.email,
            phone: newInfoObj.phone,
            date_of_birth: newInfoObj.date_of_birth,
            experience_level: h.innerHTML,
            already_participated: true,
            character_id: 2,
          };
          localStorage.setItem(
            "personInformation",
            JSON.stringify(personInformation)
          );
          //   console.log("ეს დაგვჭიერედება რომ დატას გავაყოლოთ", h.innerHTML);
          y = this.parentNode.getElementsByClassName("same-as-selected");
          console.log("y is ", y);
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  selectBox[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
