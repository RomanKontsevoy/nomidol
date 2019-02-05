let counter = 0;

let selectorsToChangeText = [document.querySelectorAll("*")]; // Перебираем все существующие виды селекторов без разбора!

let arrOfBedAttributes = ['onclick', 'tppabs'];

function replaceOnclick(arrOfSels) {
    for (let i = 0; i < arrOfSels.length; i++) {    // Берем массив с селекторами, проходим его циклом
        for (let k = 0; k < arrOfSels[i].length; k++) { // Проходим циклом все экземляры с выбранного селектора
            for (let j = 0; j < arrOfBedAttributes.length; j++) {
                if (arrOfSels[i][k].hasAttribute(arrOfBedAttributes[j])) {
                    arrOfSels[i][k].removeAttribute(arrOfBedAttributes[j]);
                }
            }
            if (arrOfSels[i][k].tagName === "a") {
                console.log(arrOfSels[i][k]);
            }
        }
    }
}

function createButtons() {
    let btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "space-evenly";
    btnContainer.style.width = "100%";
    btnContainer.style.padding = "15px";
    btnContainer.id = "buttonChangeContainer";
    document.body.insertBefore(btnContainer, document.body.firstChild);
    let btnRemOnclicks = document.createElement("button");
    btnRemOnclicks.id = "btnRemOnclicks";
    btnRemOnclicks.style.width = '150px';
    btnRemOnclicks.style.cursor = 'pointer';
    btnRemOnclicks.innerHTML = 'Удалить все лишние атрибуты'
    btnContainer.insertBefore(btnRemOnclicks, btnContainer.firstChild);
    let btnWhiteSpaces = document.createElement("button");
    btnWhiteSpaces.id = "btnWhiteSpaces";
    btnWhiteSpaces.style.width = '150px';
    btnWhiteSpaces.style.cursor = 'pointer';
    btnWhiteSpaces.innerHTML = 'Убрать все неверные переносы'
    btnContainer.insertBefore(btnWhiteSpaces, btnContainer.firstChild);
}

createButtons();

document.getElementById("btnRemOnclicks").addEventListener('click', function () {
    replaceOnclick(selectorsToChangeText);
    alert("Успех! Удалены все лишние атрибуты");
}, false);


// for wrapping

let wrappingWords = ['и', 'в', 'а', 'я', 'при', 'за', 'с', 'у', 'к', 'от', 'до', 'но', 'на', 'не', 'ну', 'ни', 'по', "для", "что"];

function findElement(arrOfSels) {
    for (let i = 0; i < arrOfSels.length; i++) {    // Берем массив с селекторами, проходим его циклом
        for (let k = 0; k < arrOfSels[i].length; k++) { // Проходим циклом все экземляры с выбранного селектора
            findText(arrOfSels[i][k]);
        }
    }
}

let someNode = document.querySelector('.understand-col__item:first-child p');

function createFragment(sel, n) {
    let thisSel = sel.childNodes[n];
    let inneredText = optimizeText(setNoWrap(thisSel));
    // console.log(inneredText);
    let tempDiv = document.createElement('div');
    let fr = document.createDocumentFragment();
    tempDiv.innerHTML = inneredText;
    // console.dir(tempDiv);
    let counter = 1;
    for (let i = 0; i < tempDiv.childNodes.length; i++) {
        fr.appendChild(tempDiv.childNodes[i].cloneNode(true));
    }
    return fr;
}

function addWhiteSpaces(sel) {
    for (let i = 0; i < sel.childNodes.length; i++) {
        if (sel.childNodes[i].nodeType === 3) {
            sel.childNodes[i].data = ' ' + sel.childNodes[i].data + ' ';
        } else {
            let arr = sel.childNodes[i];
            for (let k = 0; k < arr.childNodes.length; k++) {
                if (arr.childNodes[k].nodeType === 3) {
                    arr.childNodes[k].data = arr.childNodes[k].data + ' ';
                }
            }
        }
    }
}

function findText(selector) {
    if (selector.nodeName != 'BUTTON') {
        for (let n = 0; n < selector.childNodes.length; n++) { //Проходим циклом всех детей каждого DOM-элемента
            if (selector.childNodes[n].nodeType == 3) { // Если ребенок является текстовым узлом, работаем с ним
                let fr = createFragment(selector, n);
                selector.replaceChild(fr, selector.childNodes[n]);
            }
        }
        addWhiteSpaces(selector);
    }
}
function optimizeText(wrongText) { // оптимизация текста, удаление линих пробелов, переносов и т. д.
    let string
    wrongText.textContent ? string = wrongText.textContent : string = wrongText;
    let newLine = string.match(/\n/ig);
    if (newLine) { // Удаление всех переносов на новую строку
        string = string.replace(/\n/g, " ");
    }
    let tab = string.match(/\t/ig);
    if (tab) { // Удаление всех табуляций
        string = string.replace(/\t/g, " ");
    }
    let doubleWhs = string.match(/  /ig);
    while (doubleWhs) { // Удаление всех двойных пробелов
        string = string.replace(/  /g, " ");
        doubleWhs = string.match(/  /ig);
    }
    string = string.trim(); // Обрезка пробелов в начале и конце
    return (string);
}

function setNoWrap(text) {
    string = optimizeText(text);
    let arr = string.split(' ');
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < wrappingWords.length; j++) {
            if (arr[i] === wrappingWords[j] && arr[i+1]) {
                let replacedFragment = '<span class="nw">' + arr[i] + ' ' + arr[i + 1] + '</span>';
                arr.splice(i, 2, replacedFragment + ' ');
            }
        }
    }
    let installedText = arr.join(' ');
    return (installedText);
}


document.getElementById("btnWhiteSpaces").addEventListener('click', function () {
    findElement(selectorsToChangeText);
    // findText(someNode);
}, false);