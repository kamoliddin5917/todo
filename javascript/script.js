let localStorageArr = JSON.parse(window.localStorage.getItem("todo"));
let todoArray = localStorageArr ? localStorageArr : [];
// window.localStorage.setItem("todo", JSON.stringify(todoArray));

let findEl = (className) => document.querySelector(className);

let myForm = findEl(".js-form");
let myInput = findEl(".js-input");
let myUl = findEl(".js-box");

let myOlAll = findEl(".js-all");
let myOlFulfilled = findEl(".js-fulfilled");
let myOlUnfulfilled = findEl(".js-unfulfilled");

let templateList = findEl("template").content;

let myBtnBajarilgan = findEl(".btn--fulfilled");
let myBtnBajarilmagan = findEl(".btn--unfulfilled");

let todo = findEl(".todo");
let lightmod = findEl(".lightmod");

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

let listLiniyaCheck = (event) => {
  let findListChek = todoArray.find(
    (todo) => event.currentTarget.dataset.id == todo.id
  );
  findListChek.is_complated = !findListChek.is_complated;

  window.localStorage.setItem("todo", JSON.stringify(todoArray));

  renderTodo(todoArray);
};

let listClear = (event) => {
  let btnDelet = todoArray.findIndex(
    (todo) => event.currentTarget.dataset.id == todo.id
  );

  todoArray.splice(btnDelet, 1);

  window.localStorage.setItem("todo", JSON.stringify(todoArray));

  renderTodo(todoArray);
};

let renderTodo = (todoArray) => {
  myUl.innerHTML = "";

  let bajarilgan = 0;
  let bajarilmagan = 0;

  todoArray.forEach((todo) => {
    if (todo.is_complated === true) {
      bajarilgan += 1;
    } else {
      bajarilmagan += 1;
    }
  });

  myOlAll.textContent = todoArray.length;
  myOlFulfilled.textContent = bajarilgan;
  myOlUnfulfilled.textContent = bajarilmagan;

  todoArray.forEach((todo) => {
    let listClone = templateList.cloneNode(true);

    let cloneSpanList = listClone.querySelector(".js-list__text");
    let cloneBtn = listClone.querySelector(".js-btn_x");
    let cloneInputCheck = listClone.querySelector(".js-check");

    cloneSpanList.textContent = todo.todo_name;
    cloneBtn.dataset.id = todo.id;
    cloneInputCheck.dataset.id = todo.id;
    cloneInputCheck.checked = todo.is_complated;

    if (todo.is_complated === true) {
      cloneSpanList.classList.add("check");
    }

    cloneBtn.addEventListener("click", listClear);
    cloneInputCheck.addEventListener("change", listLiniyaCheck);

    myUl.append(listClone);
  });
};
renderTodo(todoArray);

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
  let sortFunc = (todoArray) => {
    if (todoArray[todoArray.length - 1]) {
      let newSortTodoArr = todoArray.sort((a, b) => a.id - b.id);
      return newSortTodoArr[newSortTodoArr.length - 1].id;
    } else {
      return 0;
    }
  };
  let todoArrayId = sortFunc(todoArray);

  let newTodo = {
    id: todoArrayId + 1,
    todo_name: inputValue,
    is_complated: false,
  };
  todoArray.push(newTodo);

  window.localStorage.setItem("todo", JSON.stringify(todoArray));

  renderTodo(todoArray);

  myInput.value = "";
};
myForm.addEventListener("submit", createTodo);

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
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  renderTodo(newTodoArray);
};
myBtnBajarilgan.addEventListener("click", sortBajarilgan);

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
  window.localStorage.setItem("todo", JSON.stringify(todoArray));
  renderTodo(newTodoArray);
};
myBtnBajarilmagan.addEventListener("click", sortBajarilmagan);
