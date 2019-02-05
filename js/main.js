$(document).ready(function () {
    var resizedParagraph;

    //запишим в атрибут 'data-total_height оригинальную высоту каждого елемента
    function setHeight() {
        resizedParagraph = $('.review-text');
        for (var i = 0; i < resizedParagraph.length; i++) {
            var current = $(resizedParagraph[i]);
            current.css('height', '290px');
        }
    };
    setHeight()


    function changeHeigth(button) {

        var block = $(button).parent().siblings('.review-text');
        var height = block[0].scrollHeight + 'px';
        var beforeBlock = $(button).parent('.show-btn__wrap');
        var beforeBlock = $(button).parent('.show-btn__wrap');

        if (!block.hasClass('auto_h')) {
            block.css('height', height);
        } else {
            block.css('height', '290px');
        }
        $(button).toggleClass('button180');
        block.toggleClass('auto_h');
        beforeBlock.toggleClass('before-block');
    }

    $('.show-btn__item').on('click', function () {
        changeHeigth(this);
    })

});

let recomPhotos = document.querySelectorAll('.recoms-photos__item');
let recomTexts = document.querySelectorAll('.recoms-text__item');
let recomDots = document.querySelectorAll('.recoms-dots__item');

function changeRecomText(checkedId) {
    recomPhotos = document.querySelectorAll('.recoms-photos__item');
    recomTexts = document.querySelectorAll('.recoms-text__item');
    recomDots = document.querySelectorAll('.recoms-dots__item');
    for (let i = 0; i < recomTexts.length; i++) {
        if (checkedId == i) {
            recomPhotos[i].classList.add('active');
            recomTexts[i].classList.add('active');
            recomDots[i].classList.add('active');
        } else {
            recomPhotos[i].classList.remove('active');
            recomTexts[i].classList.remove('active');
            recomDots[i].classList.remove('active');
        }
    }
}

let slider1 = $('.text-rev__wrap');

function initSlider(slider, options) {
    slider.on('init', function () {
        setTimeout(function () {
            slider.addClass('is-ready');
        }, 100);
    });
    slider.not('.slick-initialized').slick(options);
}


function destroySlider(slider) {
    if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
    }
}


function showSlider() {
    var tablet = ($(window).width()) < 1024;
    let revItems = document.querySelectorAll('.text-rev__item');
    let higherElement;
    for (let i = 0; i < revItems.length; i++) {
        if (revItems[i].hasAttribute('data-higher')) {
            higherElement = revItems[i];
        }
    }
    if (tablet) {
        higherElement.classList.remove('center');
        initSlider(slider1, {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            infinite: true,
            focusOnSelect: true,
            variableWidth: true,
            centerMode: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                        centerMode: true
                    }
                }]
        });
    } else {
        higherElement.classList.add('center');
        destroySlider(slider1);
    }
};
showSlider();
$(window).on('resize', showSlider);

let arrows = document.querySelectorAll(".arrow-grey"); // collection of arrows items
let index = 0;

function blickarrows() {
    for (var j = 0; j < arrows.length; j++) {  // all pictures become grey
        arrows[j].classList.remove('arrow-green');
    }
    arrows[index].classList.add('arrow-green');  // one picture becomes colored
    index < arrows.length - 1 ? index++ : index = 0;
}

function blickingInterval() {
    setInterval(blickarrows, 100);
}

// window.addEventListener("DOMContentLoaded", blickingInterval);

let redDots = document.getElementsByClassName('under-dot');
let leftBlocks = document.getElementsByClassName('understand-col__item');
let leftParent = document.querySelector('.understand-col:first-child');
let symptoms = document.getElementsByClassName('symptom');
let stopFunction = true;

function showLeftBlocks(a) {
    for (let i = 0; i < leftBlocks.length; i++) {
        if (leftBlocks[i].classList.contains(a)) {
            leftBlocks[i].classList.add('active');
        } else {
            leftBlocks[i].classList.remove('active');
        }
    }
}

function highlightSymptoms(a) {
    for (let i = 0; i < symptoms.length; i++) {
        if (symptoms[i].classList.contains(a)) {
            symptoms[i].classList.add('active');
        } else {
            symptoms[i].classList.remove('active');
        }
    }
}

function highlightSymptoms2(a) {
    for (let i = 0; i < symptoms.length; i++) {
        if (symptoms[i] == a) {
            symptoms[i].classList.add('active');
        } else {
            symptoms[i].classList.remove('active');
        }
    }
}

function pickDot(a) {
    for (let i = 0; i < redDots.length; i++) {
        if (redDots[i].classList.contains(a)) {
            redDots[i].classList.add('active');
        } else {
            redDots[i].classList.remove('active');
        }
    }
}


/* for monitorWidth < 768 [ */

let footCentralCol = document.querySelector('.understand-col:nth-child(2)');
let textCloud;
let sympDescribe = document.querySelectorAll('.understand-col:nth-child(3) ul .symptom p');

function createTextCloud () {
    textCloud = document.createElement('div');
    textCloud.id = 'textCloud';
    textCloud.classList.add('text-cloud');
    textCloud.innerHTML = 'потеют ноги и ногти меняют цвет';
    footCentralCol.appendChild(textCloud);

}
createTextCloud();

function fillCloud (bacNumber) {
    let tempArr = [];
    for (let i = 0; i < sympDescribe.length; i++) {
        if (sympDescribe[i].parentNode.classList.contains(bacNumber)) {
            tempArr.push(sympDescribe[i].innerHTML);
        }
    }
    console.log(tempArr);
    textCloud.innerHTML = tempArr[0] + ' и ' + tempArr[1];
    console.log(textCloud);
}

/* ] for monitorWidth < 768 */

function redDotsClick () {
    for (let i = 0; i < redDots.length; i++) {
        redDots[i].addEventListener('mouseover', function (e) {
            let currentClass;
            let dataBac = e.target.getAttribute('data-bac');
            if (dataBac) {
                currentClass = 'bac' + dataBac;
                showLeftBlocks(currentClass);
                highlightSymptoms(currentClass);
                pickDot(currentClass);
                fillCloud(currentClass);
            }
            // let tablet = ($(window).width());
            // $(window).on('resize', function () {
            //     tablet = ($(window).width());
            // });
            // if (tablet < 768) {
            //     fillCloud(currentClass);
            // }
        })
    }
}

redDotsClick();

function toggleLeftParent(el) { // Показать или скрыть левый блок с описанием бактерии
    if (el.hasAttribute('data-left-active')) {
        leftParent.classList.remove('activated');
        el.removeAttribute('data-left-active');
    } else {
        // console.log('data-left-active is absend');
        for (let j = 0; j < symptoms.length; j++) {
            symptoms[j].removeAttribute('data-left-active');
        }
        leftParent.classList.add('activated');
        el.dataset.leftActive = 1;
    }
    console.log(el.dataset);
}

function symptomsOnmouseover(i) {  // функция отслеживающая наведение мыши на симптомы
    symptoms[i].addEventListener('mouseover', function (e) {
        let tablet = ($(window).width());
        $(window).on('resize', function () {
            tablet = ($(window).width());
        });
        if (tablet >= 1024) {
            let currentClass;
            let dataBac = e.target.getAttribute('data-bac');
            if (dataBac) {
                currentClass = 'bac' + dataBac;
                showLeftBlocks(currentClass);
                pickDot(currentClass);
                highlightSymptoms2(e.target);
            }
        }
    })
}

function symptomsClick(i) { // функция, отслеживающая нажатие на симптом
    symptoms[i].addEventListener('click', function (e) {
        let tablet = ($(window).width());
        $(window).on('resize', function () {
            tablet = ($(window).width());
        });
        function someFunction(e) {
            let target = e.target;
            if (target.classList.contains('active')) {
                target.classList.remove('active');
            } else {
                target.classList.add('active');
            }
            toggleLeftParent(target);
            let currentClass;
            let dataBac = e.target.getAttribute('data-bac');
            if (dataBac) {
                currentClass = 'bac' + dataBac;
                showLeftBlocks(currentClass);
                pickDot(currentClass);
                highlightSymptoms2(target);
            }
        }
        if (tablet < 1024) {
            someFunction(e);
        }
    });

}

function symptomFunc() {
    for (let i = 0; i < symptoms.length; i++) {
        symptomsClick(i);
        symptomsOnmouseover(i);
    }
}
symptomFunc();

let closeUnder = document.querySelectorAll('.close-under');

function removeActivated() {
    for (let i = 0; i < closeUnder.length; i++) {
        closeUnder[i].addEventListener('click', function () {
            if(leftParent.classList.contains('activated')) {
                leftParent.classList.remove('activated');
            }
        })
    }
}

removeActivated();

let foots = document.querySelectorAll('.howwork-item__img');

function adaptive() {
    let tablet = ($(window).width());
    let tapOrHover = document.querySelector('.understand-col2__img p');
    if (tablet < 1169) {
        for (let i = 0; i < foots.length; i++) {
            if (foots[i].classList.contains('animated_foot') == false) {
                foots[i].classList.add('animated_foot');
            }
        }
        tapOrHover.innerHTML = 'нажми <span class="nw">на кнопки</span>';
    } else {
        for (let i = 0; i < foots.length; i++) {
            if (foots[i].classList.contains('animated_foot')) {
                foots[i].classList.remove('animated_foot');
            }
        }
        tapOrHover.innerHTML = 'наведи <span class="nw">на кнопки</span>';
    }
    let symptomsHead = document.querySelector('.understand-col:nth-child(3) .black');
    console.log('works');
    if (tablet < 768) {
        symptomsHead.innerHTML = 'Выберите симптом, нажмите на картинку';
        symptomsHead.classList.add('grey')
    } else {
        symptomsHead.innerHTML = 'Симптомы грибка:';
        symptomsHead.classList.remove('grey')
    }

};
adaptive();

$(window).on('resize', adaptive);

