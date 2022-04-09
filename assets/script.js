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

let brandSelection = document.getElementById("car-brand-select");
let modelSelection = document.getElementById("car-model-select");
let driveSelection = document.getElementById("type-of-drive-select");
let salonSelection = document.getElementById("salon-select");
let yearSelection = document.getElementById("year-select");

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
        // скрыть все calculatorSections после 0-й
        hideSections(0);
    }
    // console.log(modelSelection.lastElementChild);

} );

modelSelection.addEventListener( 'change', (event) => {
    console.log("modelSelection " + event.target.value);  
    let checkedModel = event.target.value;
    if ( checkedModel ) {
        console.log("there is a checked model " + checkedModel);
        for ( let driveType in typeOfDrive ) {
            createItemOfList(
                {
                    name: "drive-radio",
                    value: driveType,
                    textContent: typeOfDrive[driveType].name,
                    elemType: "input",
                    type: "radio"
                },
                driveSelection
            );
            console.log(driveSelection);
        }
        // показать оставшиеся 3 секции
        calculatorSections[2].style.display = "";
        calculatorSections[3].style.display = "";
        calculatorSections[4].style.display = "";
        
    } else {
        console.log("there is no checked model");
        // скрыть и очистить список с приводами, салоном и годом выпуска
    }
});

// console.log(modelSelection.lastElementChild);
// clearList(modelSelection);

function clearList ( parentElem ) {
    while ( parentElem.lastElementChild ) {
        parentElem.removeChild(parentElem.lastElementChild);
    }
}

function removeLastItemFromList ( parentElem ) {
    parentElem.removeChild( parentElem.lastElementChild );
}

function createItemOfList ( item, parentElem ) {
    // item.name - что в атрибуте name
    // item.value - что в атирибуте value
    // item.textContent - что в подписи
    // item.elemType - какой тип элемента
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

// console.log("==> " + priceByYearOfIssue("2006") );

function priceByYearOfIssue( yyyy ) {
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
    return "Слишком старый автомобиль";
   }

   return "Не корректно определен возраст абтомобиля";
}

