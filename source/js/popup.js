var linkItems = document.querySelectorAll(".modal-button");
if (linkItems.length) {

  var popup = document.querySelector(".modal-popup");
  var back = document.querySelector(".modal-popup--back");
  var form = popup && popup.querySelector("form");

  back.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-popup--show");
    back.classList.remove("modal-popup--show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains("modal-popup--show")) {
        evt.preventDefault();
        popup.classList.remove("modal-popup--show");
      }
      if (back.classList.contains("modal-popup--show")) {
        evt.preventDefault();
        back.classList.remove("modal-popup--show");
      }
    }
  });

  for (var i = 0; i < linkItems.length; i++) {
    linkItems[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.add("modal-popup--show");
      back.classList.add("modal-popup--show");
    });
  }
}
