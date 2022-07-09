function startAgain(event) {
  localStorage.clear()
  event.target.parentElement.onclick = null
  event.target.parentElement.click()
}
