// input

let form = document.querySelector("#addTaskForm");
let input = document.querySelector("#input");
let btnDeleteAll = document.querySelector("#btnDeleteAll");
let taskList = document.querySelector("#task-list");

let items;

let listComp = (value) => `
  <div
  class="container d-flex justify-content-between align-items-center"
  >
  ${value}
  <a>
    <i class="fa-solid fa-circle-xmark"></i>
  </a>
  </div>
`;

// load ıtems
loadItems(items);

function loadItems(items) {
  items = getItemsFormLocalStorage();

  items.forEach((item) => {
    console.log(item);
    createElement(item);
  });
}

function getItemsFormLocalStorage() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// set item to local storage

function setItemToLocalStorage(text) {
  items = getItemsFormLocalStorage();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemsLocalStorage(text) {
  items = getItemsFormLocalStorage();
  items.forEach((item, index) => {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

eventListeners();

function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem);

  // delete an item with event capturing
  taskList.addEventListener("click", deleteItem);

  // delete item with forEach
  // const deleteItems = document.querySelector(".fa-solid fa-circle-xmark")
  // deleteItems.forEach((item) => {
  //   item.addEventListener("click", function(e) {
  //     console.log(e.target)
  //   })
  // })

  // delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function deleteAllItems() {
  // solition 1
  if (confirm("emin misin?")) {
    taskList.innerHTML = "";
    localStorage.clear();
  }
  //solition 2
  //console.log(taskList.children[0]); // no foreach html collection
  //console.log(taskList.childNodes); // yes foreach text+elemen
  // if (confirm("emin misiniz")) {
  //   taskList.childNodes.forEach((item) => {
  //     if (item.nodeType === 1) {
  //       //1 element demek
  //       console.log(item);
  //       item.remove();
  //     }
  //   });
  // }
  // solition 3
  /*while(taskList.firstChild) {  //taskListin ilk elemanı olduğu sürece
    taskList.removeChild(taskList.firstChild);
  }*/
}

function deleteItem(e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.className === "fa-solid fa-circle-xmark") {
    if (confirm("Silme İşlemini Onaylıyor musun")) {
      e.target.parentNode.parentNode.parentNode.remove();

      // delete item from local storage
      console.log(e.target.parentNode.parentNode.parentNode.innerText);
      deleteItemsLocalStorage(
        e.target.parentNode.parentNode.parentNode.textContent
      );
    }
  }
}

function createElement(value) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  // li.appendChild(document.createTextNode(input.value));
  li.innerHTML = listComp(value);
  taskList.appendChild(li);
}

function addNewItem(e) {
  e.preventDefault();

  if (input.value === "") {
    alert("Eksik Bilgi");
  } else {
    createElement(input.value);
    // save to local storage
    setItemToLocalStorage(input.value);
  }

  input.value = "";
}
