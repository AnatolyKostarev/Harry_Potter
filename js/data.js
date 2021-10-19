"use strict";

const $card = document.querySelector(".js-person-list");
const $schoolSelect = document.querySelector(".js-school");
const $personName = document.querySelector(".js-person-name");
let $option = "";
let $cardByName = "";
let $searchByName = "";
let $searchByHouse = "";
const url = "http://hp-api.herokuapp.com/api/characters";

// Получение данных с сервера с помощью конструкции ASYNC/AWAIT

async function getResponse() {
  // 1 вариант запроса
  // const getPersonData = await fetch(url);
  // const data = await getPersonData.json();

  // 2 вариант запроса (сокращенный в одну строку)
  const data = await fetch(url).then((data) => data.json());

  // Вывод карточек в браузер

  renderList(data);

  // формирование select->option

  $schoolSelect.innerHTML =
    `<option value="all" selected>All</option>` + addSelect(data);

  $personName.addEventListener("input", () => totalSearсh(data)); // слушатель input
  $schoolSelect.addEventListener("change", () => totalSearсh(data)); // слушатель select
}

getResponse();

// Получение данных с сервера с помощью конструкции promise

// let getPersonData = fetch(url);

// getPersonData
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Damn");
//     }
//     return response.json();
//   })
//   .then(
//     function (data) {
//       // Вывод карточек в браузер
//       renderList(data);

//       // формирование select->option
//       $schoolSelect.innerHTML =
//         `<option value="all" selected>All</option>` + addSelect(data);

//       $personName.addEventListener("input", () => totalSearсh(data)); // слушатель input
//       $schoolSelect.addEventListener("change", () => totalSearсh(data)); // слушатель select
//     },
//     () => console.log("Error")
//   );

// Функция для рендеринга

function renderList(arr) {
  $card.innerHTML = "";
  arr.forEach((item) => {
    let divCard = document.createElement("div");
    divCard.classList.add("person-card");
    divCard.innerHTML = `
            <div class="img">
              <img src="${item.image}" width="334" height="400" alt="${
      item.name
    }" loading="lazy"/>
            </div>
            <ul class="person-description">
              <li class="person-title">${
                item.name === "" ? "unknown" : item.name
              }</li>
              <li class="person-item">Actor: ${
                item.actor === "" ? "unknown" : item.actor
              }</li>
              <li class="person-item">Gender: ${
                item.gender === "" ? "unknown" : item.gender
              }</li>
              <li class="person-item">House: ${
                item.house === "" ? "unknown" : item.house
              }</li>
              <li class="person-item">Wand core: ${
                item.wand.core === "" ? "unknown" : item.wand.core
              }</li>
              <li class="person-item">Alive: ${item.alive ? "yes" : "no"}</li>
            </ul>`;
    $card.append(divCard);
  });
}

// Формирование выпадающего списка select>option

function addSelect(arr) {
  const schools = arr.map((item) => item.house).sort();
  const sortedSchools = schools.filter(
    (item, index) => !index || item != schools[index - 1]
  );
  sortedSchools.map(
    (item) =>
      ($option += `<option value="${item}">${item || "Unknown"}</option>`)
  );
  return $option;
}

// Отбор и ренедеринг по имени и по факультету

function totalSearсh(arr) {
  let person = $personName.value.toLowerCase().trim();
  let school = $schoolSelect.value.toLowerCase();
  let filtered = arr
    .filter((item) => item.name.toLowerCase().includes(person))
    .filter((item) => item.house.toLowerCase() === school || school === "all");
  renderList(filtered);
}
