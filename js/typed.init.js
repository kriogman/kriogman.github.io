
// Typed Text
var typedEl = document.querySelector(".element");
if (typedEl) {
    new Typed(".element", {
        strings: typedEl.getAttribute("data-elements").split(","),
        typeSpeed: 100,
        backDelay: 3000,
        loop: true
    });
}