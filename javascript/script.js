// Local Storage digi ma'lumotlani(Arrayi) JSON orqali olinvotti
let localStorageArr = JSON.parse(window.localStorage.getItem("todo"));
// Local Storage da ma'lumot bo'sa shu ma'lumoti bo'masa bo'sh arrayi ol dib shatr qo'yilvoti
let todoArray = localStorageArr ? localStorageArr : [];
// Elementlani document dan qidirib olinvotti
let findEl = (className) => document.querySelector(className);
// Olingan elementla
let myForm = findEl(".js-form");
let myInput = findEl(".js-input");
let myUl = findEl(".js-box");

let myOlAll = findEl(".js-all");
let myOlFulfilled = findEl(".js-fulfilled");
let myOlUnfulfilled = findEl(".js-unfulfilled");
// Template olinvotti
let templateList = findEl("template").content;

let myBtnBajarilgan = findEl(".btn--fulfilled");
let myBtnBajarilmagan = findEl(".btn--unfulfilled");

let todo = findEl(".todo");
let lightmod = findEl(".lightmod");

// Fonni rangi rasmini (lightmod,darkmod) qiberadigon function
let lightDarkMod = () => {
  todo.classList.toggle("todo--dark");
  lightmod.classList.toggle("darkmod");

  if (lightmod.classList.contains("darkmod")) {
    lightmod.innerHTML = "&#9788;";
  } else {
    lightmod.innerHTML = "&#9790;";
  }
};
lightmod.addEventListener("click", lightDarkMod);

// Li ni ichidigi input:checkbox bosilganda array>object>is_complated ni false bo'sa true yoki true bo'sa false qiberadigon function
let listLiniyaCheck = (event) => {
  let findListChek = todoArray.find(
    (todo) => event.currentTarget.dataset.id == todo.id
  );
  findListChek.is_complated = !findListChek.is_complated;
  // O'zgargan arrayi Locale Storagega joylanvotti
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  // O'zgargan arrayi renderTodo ga berilvotti UL ichiga soladigin functionga
  renderTodo(todoArray);
};

// Li ni ichidigi btn click bo'ganda Li ni o'chirib tashidigon function
let listClear = (event) => {
  // btn bosilganda Arraydigi index sini oberadi
  let btnDelet = todoArray.findIndex(
    (todo) => event.currentTarget.dataset.id == todo.id
  );
  // Olingan index orqali Arraydan usha element o'chirib tashaladi
  todoArray.splice(btnDelet, 1);
  // O'zgargan arrayi Locale Storagega joylanvotti
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  // O'zgargan arrayi renderTodo ga berilvotti UL ichiga soladigin functionga
  renderTodo(todoArray);
};

// Tayyor Li lani Ul ichida soladigin function
let renderTodo = (todoArray) => {
  myUl.innerHTML = "";

  // Arrayda Objectlani is_complatedi nechta true nechta false ligini aniqlaberadi
  let bajarilgan = 0;
  let bajarilmagan = 0;

  todoArray.forEach((todo) => {
    if (todo.is_complated === true) {
      bajarilgan += 1;
    } else {
      bajarilmagan += 1;
    }
  });

  // OL>LI>SPAN lani textContent iga tenglashtirilvotti
  myOlAll.textContent = todoArray.length;
  myOlFulfilled.textContent = bajarilgan;
  myOlUnfulfilled.textContent = bajarilmagan;

  // Arrayi aylanib shuncha TEMPLATE ni cloneNode qilib LI ni UL ichiga sovotti
  todoArray.forEach((todo) => {
    let listClone = templateList.cloneNode(true);

    let cloneSpanList = listClone.querySelector(".js-list__text");
    let cloneBtn = listClone.querySelector(".js-btn_x");
    let cloneInputCheck = listClone.querySelector(".js-check");

    cloneSpanList.textContent = todo.todo_name;
    cloneBtn.dataset.id = todo.id;
    cloneInputCheck.dataset.id = todo.id;
    cloneInputCheck.checked = todo.is_complated;

    // Array>OBJ>is_complated true bo'sa UL>LI>SPAN ga "check" digan clas qo'shadi
    if (todo.is_complated === true) {
      cloneSpanList.classList.add("check");
    }

    cloneBtn.addEventListener("click", listClear);
    cloneInputCheck.addEventListener("change", listLiniyaCheck);

    myUl.append(listClone);
  });
};
// Tashqarida chaqirilganga sabab Form submit bo'masayam agar LISTla bo'sa chiqib turishiga
renderTodo(todoArray);

// Form submit bo'ganda inputti.valuesini olib newTodo objectga solib objecti arrayga push qiladigin function
let createTodo = (evt) => {
  evt.preventDefault();

  let inputValue = myInput.value;

  // 1-usul id bir xil
  // let todoArrayId = todoArray[todoArray.length - 1]
  //   ? todoArray[todoArray.length - 1].id
  //   : 0;

  // 2-usul id har xil
  // let newSortTodoArr = todoArray.sort((a, b) => a.id - b.id);
  // let todoArrayId = todoArray[todoArray.length - 1]
  //   ? newSortTodoArr[todoArray.length - 1].id
  //   : 0;

  // 3-usul id 2-usul bn bir xil
  // Arrayi id lari orqali sortlab oxirgi elementini id sini oladigon function agar arrayda element bo'masa 0 beradi
  let sortFunc = (todoArray) => {
    if (todoArray[todoArray.length - 1]) {
      let newSortTodoArr = todoArray.sort((a, b) => a.id - b.id);
      return newSortTodoArr[newSortTodoArr.length - 1].id;
    } else {
      return 0;
    }
  };
  let todoArrayId = sortFunc(todoArray);

  // OBJ ga unique id va inputi.valuesini qo'shib arrayga push qiladi
  let newTodo = {
    id: todoArrayId + 1,
    todo_name: inputValue,
    is_complated: false,
  };
  todoArray.push(newTodo);
  // O'zgargan arrayi Locale Storagega joylanvotti
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  // O'zgargan arrayi renderTodo ga berilvotti UL ichiga soladigin functionga
  renderTodo(todoArray);

  myInput.value = "";
};
myForm.addEventListener("submit", createTodo);

// btn click bo'ganda bajarilganligiga qarab ya'ni true yoki false ligiga qarab sortlidi
let sortBajarilgan = () => {
  let newTodoArray = todoArray.sort((a, b) => {
    if (a.is_complated > b.is_complated) {
      return -1;
    }
    if (a.is_complated < b.is_complated) {
      return 1;
    }
    return 0;
  });
  // O'zgargan arrayi Locale Storagega joylanvotti
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  // O'zgargan arrayi renderTodo ga berilvotti UL ichiga soladigin functionga
  renderTodo(newTodoArray);
};
myBtnBajarilgan.addEventListener("click", sortBajarilgan);

// btn click bo'ganda bajarilmaganligiga qarab ya'ni true yoki false ligiga qarab sortlidi
let sortBajarilmagan = () => {
  let newTodoArray = todoArray.sort((a, b) => {
    if (a.is_complated > b.is_complated) {
      return 1;
    }
    if (a.is_complated < b.is_complated) {
      return -1;
    }
    return 0;
  });
  // O'zgargan arrayi Locale Storagega joylanvotti
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  // O'zgargan arrayi renderTodo ga berilvotti UL ichiga soladigin functionga
  renderTodo(newTodoArray);
};
myBtnBajarilmagan.addEventListener("click", sortBajarilmagan);
