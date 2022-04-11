// автомобили: название бренда; модели: название модели, цена базовой комплектации

let cars = {
    audi: {
        name: "Audi",
        models: {
            id100: {
                name: "100",
                price: 1_000_000
            },
            idA3: {
                name: "A3",
                price: 2_000_000
            },
            idA1: {
                name: "A1",
                price: 1_040_000
            },
            idA4: {
                name: "A4",
                price: 3_000_000
            },
            idA5: {
                name: "A5",
                price: 2_600_000
            }
        }
    },
    skoda: {
        name: "Skoda",
        models: {
            idFabia: {
                name: "Fabia",
                price: 103_000
            },
            idOctavia: {
                name: "Octavia",
                price: 223_000
            },
            idKodiaq: {
                name: "Kodiaq",
                price: 1_000_111
            },
            idRapid: {
                name: "Rapid",
                price: 30_000
            }
        }

    },
    lada: {
        name: "Lada (ВАЗ)",
        models: {
            id2101: {
                name: "2101",
                price: 10_000
            },
            id2104: {
                name: "2104",
                price: 22_000
            },
            idKalina: {
                name: "Kalina",
                price: 1_000_777
            },
            idGranta: {
                name: "Granta",
                price: 34_000
            },
            idLargus: {
                name: "Largus",
                price: 388_000
            }
        }
    }
};



// let b = "audi";
// let m = "idA1";

// console.log( cars );
// console.log( cars[b] );
// console.log( cars[b].name );

// console.log( cars[b].models );
// console.log( cars[b].models[m] );
// console.log( "--> " + cars[b].models[m].price );
// console.log( cars[b].models[m].name );

// привод - только один вариант, из этого списка сделаем radio
let typeOfDrive = {
    fourWeel: {
        name: "Полный привод",
        price: 33_000
    },
    rear: {
        name: "Задний привод",
        price: 15_000
    },
    frontWeel: {
        name: "Передний привод",
        price: 20_000
    }

};

// let d = "rear";
// console.log(typeOfDrive);
// console.log(typeOfDrive[d]);
// console.log(typeOfDrive[d].name);
// console.log(typeOfDrive[d].price);

// эти опции подразумевают множественный выбор checkbox
let vehicleInterior = {
    sunroof: {
        name: "Люк на крыше",
        price: 1_000
    },
    wheelHeating: {
        name: "Обогрев руля",
        price: 2_000
    },
    airCond: {
        name: "Бразильский кондиционер",
        price: 500
    },
    seatHeating: {
        name: "Подогрев сидений",
        price: 11_000
    },
    foldingTable: {
        name: "Складной столик",
        price: 4_000
    },
    leatherWheel: {
        name: "Отделка руля кожей",
        price: 22_000
    },
    leatherInt: {
        name: "Кожаный салон",
        price: 33_000
    }
};

// let rr = "leatherInt";
// console.log(vehicleInterior);
// console.log(vehicleInterior[rr]);
// console.log(vehicleInterior[rr].name);
// console.log(vehicleInterior[rr].price);
// let now = new Date();
// alert( now.getFullYear() );

let calculatorSections = document.querySelectorAll(".calculator__section");
// console.log(calculatorSections[2]);

// спрячем все блоки формы, кроме первого - марки авто
hideSections(0);

// здесь будем собирать ошибки при проверке корректности заполнения полей
let errors = [];

let brandSelection = document.getElementById("car-brand-select");
let modelSelection = document.getElementById("car-model-select");
let driveSelection = document.getElementById("type-of-drive-select");
let salonSelection = document.getElementById("salon-select");
// let yearSelection = document.getElementById("year-select");

let errorBlock = document.querySelector(".calculator__err-box");
removeErrors();

console.log("errorBlock " + errorBlock.style.display);

// блок для показа рассчета
let resultBlock = document.querySelector(".result");
// сначала скроем его
let results = [];
removeResults();

// итоговая стоимость
let totalPrice = 0;

// заполним список марок авто
// сначала пустая 
createItemOfList(
    {
        name: "brand-option",
        value: "",
        textContent: "Выберите марку",
        elemType: "option"
    },
    brandSelection
);

for ( let brand in cars ) {
    createItemOfList(
        {
            name: "brand-option",
            value: brand,
            textContent: cars[brand].name,
            elemType: "option"
        },
        brandSelection
    );
}

brandSelection.addEventListener( 'change', (event) => {
    // при изменении подгружаем нужный список моделей или скрываем все calculatorSections после 0-й
    console.log("--> " + event.target.value.length);  
    let checkedBrand = event.target.value;
    let modelList = cars[checkedBrand] ? cars[checkedBrand].models : undefined;
    // тут нужно очистить все списки, которые после бренда
    clearList(modelSelection);
    // и очистить ошибки
    removeErrors();
    removeResults()
    if (modelList) {
        console.log(modelList);
        createItemOfList(
            {
                name: "model-option",
                value: "",
                textContent: "Выберите модель",
                elemType: "option"
            },
            modelSelection
        );
        // clearList(modelSelection);
        for ( let model in modelList ) {
            createItemOfList(
                {
                    name: "model-option",
                    value: model,
                    textContent: cars[checkedBrand].models[model].name,
                    elemType: "option"
                },
                modelSelection
            );
        }
        // открыть секцию со списком моделей
        calculatorSections[1].style.display = "";
    } else {
        console.log("no list");
        // скрыть секцию со списком моделей
        hideSection(1);
    }
    // console.log(modelSelection.lastElementChild);

} );

modelSelection.addEventListener( 'change', (event) => {
    console.log("modelSelection " + event.target.value);  
    let checkedModel = event.target.value;
    removeErrors();
    removeResults();
    if ( checkedModel ) {
        console.log("there is a checked model " + checkedModel);
        // заполняем список типов двигателей
        for ( let driveType in typeOfDrive ) {
            createItemOfList1(
                {
                    name: "drive-radio",
                    value: driveType,
                    textContent: typeOfDrive[driveType].name,
                    elemType: "input",
                    type: "radio"
                },
                driveSelection
            );
            // console.log(driveSelection);
        }
        // заполняем список опций салона
        for ( let interiorOption in vehicleInterior ) {
            createItemOfList1(
                {
                    name: "salon-checkbox",
                    value: interiorOption,
                    textContent: vehicleInterior[interiorOption].name,
                    elemType: "input",
                    type: "checkbox"
                },
                salonSelection
            );
            // console.log(salonSelection);
        }

        // показать оставшиеся 3 секции
        calculatorSections[2].style.display = "";
        calculatorSections[3].style.display = "";
        calculatorSections[4].style.display = "";
        
    } else {
        console.log("there is no checked model");
        // скрыть и очистить список с приводами, салоном и годом выпуска
    }
},  {once: true});

// обработка события нажатие на кнопку "оценить автомобиль"

let button = document.querySelector(".calculator__button");
console.log("calculator__button --> " + button);

button.addEventListener( 'click', (event) => {
    let driveRadioSelection = document.getElementsByName("drive-radio");
    // console.log("event " + event.target);
    // console.log("driveRadioSelection --> " + driveRadioSelection);
    // for ( let d of driveRadioSelection ) {
    //     console.log(">> " + d.checked);
    // }
    let salonChboxSelection = document.getElementsByName("salon-checkbox");
    let yearSelection = document.getElementById("year-select");

    // проверить корректность заполнения полей
    // запонены должны быть все секции, кроме опций салона
    errors = [];
    let selectedBrand = "";
    let selectedModel = "";
    let selectedDrive = "";
    let selectedYear = yearSelection ? yearSelection.value : "";
    console.log("selectedYear " + yearSelection);
    // опции салона, которые были выбраны в форме
    let selectedSalon = [];

    totalPrice = 0;
    // let results = [];
    if ( !brandSelection.value ) {
        errors.push("Не указана марка автомобиля");
    } else {
        selectedBrand = brandSelection.value;
    }
    if ( !modelSelection.value ) {
        errors.push("Не указана модель автомобиля");
    } else {
        selectedModel = modelSelection.value ;
    }
    for ( let d of driveRadioSelection ) {
        if ( d.checked ) {
            selectedDrive = d.value;
            break;
        } 
    }
    if ( !selectedDrive ) {
        errors.push("Не выбран тип привода");
    } 
    // проверка поля Год выпуска функцией. Если "" - ошибок нет.
    let errorYear = checkYearOfIssue(selectedYear);
    if ( errorYear ) {
        errors.push(errorYear);
    } 

    // соберем все выбранные опции салона (их выбирать  не обязательно)
    for ( let s of salonChboxSelection ) {
        if ( s.checked ) {
            selectedSalon.push(s.value);
        }
    }

    // если есть ошибки, вывести их
    // console.log("errs --> " + errors);

    if ( errors.length ) {
        // показать блок с ошибками
        showErrors();
    } else {
    // если нет ошибок, то...
        removeErrors();
        removeResults();
        // набираем строки для вывода результата и считаем итог totalPrice
        results.push(
            {
                title: "Автомобиль марки " + cars[selectedBrand].name,
                price: 0
            }
        );
        totalPrice += 0;
        results.push(
            {
                title: "Модель " + cars[selectedBrand].models[selectedModel].name,
                price: cars[selectedBrand].models[selectedModel].price
            }
        );
        totalPrice += cars[selectedBrand].models[selectedModel].price;
        results.push(
            {
                title: "Тип привода " + typeOfDrive[selectedDrive].name,
                price: typeOfDrive[selectedDrive].price
            }
        );
        totalPrice += typeOfDrive[selectedDrive].price;
        for ( let s of selectedSalon ) {
            results.push(
                {
                    title: vehicleInterior[s].name,
                    price: vehicleInterior[s].price
                }
            );
            totalPrice += vehicleInterior[s].price;
        }
        results.push(
            {
                title: "Год выпуска " + selectedYear,
                price: priceByYearOfIssue( selectedYear )
            }
        );
        totalPrice += priceByYearOfIssue( selectedYear );
        // console.log("results " + results);
        // for ( let i of results ) {
        //     console.log("results i" + i.title + " " + i.price );
        // }
        // console.log("total " + totalPrice);
        // показать результат
        showResults();
    }
});

function showErrors() {
    errorBlock.style.display = ( errors.length ) ? "" : "none";
    errorBlock.innerHTML = ( errors.length ) ? errors.join('<br>') : "";
}

function removeErrors() {
    errors = [];
    errorBlock.style.display = "none";
    errorBlock.innerHTML = "";
}

function showResults() {
    resultBlock.style.display = ( results.length ) ? "" : "none";
    // resultBlock.textContent = ( results.length ) ? results.join('<br>') : "";
    let resTitle = document.createElement("h2");
    resTitle.textContent = "Результаты рассчетов";
    resultBlock.appendChild(resTitle);
    
    for ( let i = 0; i < results.length; i++ ) {
        let divRow = createResCell("");
        resultBlock.appendChild(divRow);

        // let divColLeft = document.createElement("div");
        // let divColRight = document.createElement("div");
        // divColLeft.textContent = results[i].title;
        // divColRight.textContent = results[i].price;

        divRow.appendChild(createResCell(results[i].title));
        divRow.appendChild(createResCell(results[i].price));
    }
    let divRowTotal = createResCell("");
    resultBlock.appendChild(divRowTotal);

    divRowTotal.appendChild(createResCell("Итого: "));
    divRowTotal.appendChild(createResCell(totalPrice));
}

function createResCell( text ) {
    let div = document.createElement("div");
    div.textContent = text;
    return div;
}

function removeResults() {
    results = [];
    resultBlock.style.display = "none";
    resultBlock.innerHTML = "";
}


function clearList ( parentElem ) {
    while ( parentElem.lastElementChild ) {
        parentElem.removeChild(parentElem.lastElementChild);
    }
}

function removeLastItemFromList ( parentElem ) {
    parentElem.removeChild( parentElem.lastElementChild );
}

function createItemOfList1 ( item, parentElem ) {
    // для создания radio & checkbox
    // item.name - что в атрибуте name
    // item.value - что в атирибуте value
    // item.textContent - что в подписи
    // item.elemType - какой тип элемента - radio or checkbox
    // item.parentElem - в какой элемент добавляем

    let divBox = document.createElement("div");
    parentElem.appendChild(divBox);

    let newItem = document.createElement(item.elemType);
    newItem.setAttribute("name", item.name);
    newItem.setAttribute("value", item.value);
    newItem.setAttribute("id", item.value);
    // newItem.textContent = item.textContent;
    newItem.setAttribute("type", item.type);
    divBox.appendChild(newItem);

    let labelElem = document.createElement("label");
    labelElem.setAttribute("for", item.value);
    labelElem.textContent = item.textContent;
    divBox.appendChild(labelElem);
}


function createItemOfList ( item, parentElem ) {
    // для создания пункта в выпадающем списке
    // item.name - что в атрибуте name
    // item.value - что в атирибуте value
    // item.textContent - что в подписи
    // item.elemType - какой тип элемента - option
    // item.parentElem - в какой элемент добавляем
    let newOption = document.createElement(item.elemType);
    newOption.setAttribute("name", item.name);
    newOption.setAttribute("value", item.value);
    newOption.textContent = item.textContent;
    newOption.setAttribute("type", item.type);
    parentElem.appendChild(newOption);
}

// скрыть calculator__section после n-ого
function hideSections ( n ) {
    for ( let i = 0; i < calculatorSections.length; i++ ) {
        // console.log("--> " + calculatorSections[i].style);
        if ( i > n ) { 
            calculatorSections[i].style.display = "none";
        }
    }
}

// скрыть n-ю секцию
function hideSection ( n ) {
    calculatorSections[n].style.display = "none";
}

// console.log("==> " + priceByYearOfIssue("2006") );

function checkYearOfIssue( yyyy ) {
    if ( !/^\d{4}$/.test(String(yyyy).trim()) ) {
        return "Год задан не корректно";
    } 
    let now = new Date();
    let curYear = now.getFullYear();

    // console.log( typeof yyyy);

    if ( curYear < Number(yyyy) ) {
        return "Год выпуска не может быть больше " + curYear;
    }

    // console.log("cur " + curYear);
    let issueYear = new Date(yyyy);
    
    let carAge = Math.floor((now.getTime() - issueYear.getTime()) / (1000 * 3600 * 24 * 365));
    
    if ( carAge >= 100 ) {
    return "Слишком старый автомобиль";
   }

   return "";
}


function priceByYearOfIssue( yyyy ) {
    let now = new Date();
    let curYear = now.getFullYear();

    let issueYear = new Date(yyyy);
    
    let carAge = Math.floor((now.getTime() - issueYear.getTime()) / (1000 * 3600 * 24 * 365));
   if ( carAge < 1 && carAge >= 0 ) {
        return 300_000;
   } else if ( carAge >= 1 && carAge < 5 ) {
        return 250_000;
   } else if ( carAge >= 5 && carAge < 10 ) {
        return 150_000;
   } else if ( carAge >= 10 && carAge < 20 ) {
        return 50_000;
   } else if ( carAge >= 20 && carAge < 100 ) {
        return 1;
   } else if ( carAge >= 100 ) {
    return 0.5;
   }

   return 0.3;
}
