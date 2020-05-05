var linkItems = document.querySelectorAll(".modal-button");
var popup = document.querySelector(".modal-popup");
var back = document.querySelector(".modal--back");;
var form = popup.querySelector("form");

linkItems.forEach(function (linkItem) {
  linkItem.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal--show");
    back.classList.add("modal--show");
  });
});

back.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal--show");
  back.classList.remove("modal--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal--show")) {
      evt.preventDefault();
      popup.classList.remove("modal--show");
    }
    if (back.classList.contains("modal--show")) {
      evt.preventDefault();
      back.classList.remove("modal--show");
    }
  }
});
