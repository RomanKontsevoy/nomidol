let reviewPopupBtn = document.querySelector(".review-popup-btn");
let thanksPopupBtn = document.querySelectorAll(".thanks-popup-btn");
let closeReviewPopup = document.querySelectorAll(".review-popup-close");
let closeThanksPopup = document.querySelectorAll(".thanks-popup-close");
let revPop = document.querySelector(".review-popup");
let thPop = document.querySelector(".thanks-popup");

for(let i = 0; i < closeReviewPopup.length; i++) {
    closeReviewPopup[i].addEventListener("click", function () {
        revPop.classList.remove("show");
    });
}

for(let i = 0; i < closeThanksPopup.length; i++) {
    closeThanksPopup[i].addEventListener("click", function () {
        thPop.classList.remove("show");
        console.log("ThancksPopup must be closed!");
    });
}

reviewPopupBtn.addEventListener("click", function () {
    revPop.classList.add("show");
});

for(let i = 0; i < thanksPopupBtn.length; i++) {
    thanksPopupBtn[i].addEventListener("click", function () {
        revPop.classList.remove("show");
        thPop.classList.add("show");
    });
}