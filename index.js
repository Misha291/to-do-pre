let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const tasksFromStorage = localStorage.getItem("events");
  if (tasksFromStorage) {                                     //поиск ячеек написанных пользовтелем, если да то превращение из строки в массив, если нет, то возвращение изначального массива item
    return JSON.parse(tasksFromStorage)
  } 
  return items
}

function createItem(item) {                                                            
  const template = document.getElementById("to-do__item-template");                    //<template id="to-do__item-template">
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);        //<li class="to-do__item">
  const textElement = clone.querySelector(".to-do__item-text");                        //<span class="to-do__item-text"></span>
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");         //<button class="to-do__item-button to-do__item-button_type_delete" aria-label="Удалить"></button>
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");   //<button class="to-do__item-button to-do__item-button_type_duplicate" aria-label="Копировать"></button>
  const editButton = clone.querySelector(".to-do__item-button_type_edit");             //<button class="to-do__item-button to-do__item-button_type_edit" aria-label="Редактировать"></button>

  textElement.textContent = item; // заполняет <span> текстом 
  
  deleteButton.addEventListener("click", function() 
  {
    clone.remove()
    const items = getTasksFromDOM()
    saveTasks(items)
  })

  duplicateButton.addEventListener("click", function() 
  {
    const itemName = textElement.textContent
    const newItem = createItem(itemName)
    listElement.prepend(newItem)
    const items = getTasksFromDOM()
    saveTasks(items)
  });

  editButton.addEventListener("click", function() 
  {
    textElement.setAttribute("contenteditable", "true")
    textElement.focus()
  })

  textElement.addEventListener("blur", function() 
  {
    textElement.setAttribute("contenteditable", "false")
    const items = getTasksFromDOM()
    saveTasks(items)
  })

  return clone
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text")
  const tasks = []                                                                  //находит все элементы <span>, обрезает и записывает в пустой массив 
  
  itemsNamesElements.forEach(function(element) {
    tasks.push(element.textContent)
  })
  
  return tasks
}

function saveTasks(tasks) {
  localStorage.setItem("events", JSON.stringify(tasks))
}

items = loadTasks()
items.forEach(function(item) {
  const newItem = createItem(item)   //создаёт HTML-элемент для этой задачи
  listElement.append(newItem)        //добавляет его в список на странице
})

formElement.addEventListener("submit", function(event) {
  event.preventDefault()
  const newItem = createItem(inputElement.value)
  listElement.prepend(newItem)
  const items = getTasksFromDOM()
  saveTasks(items)
  formElement.reset()
})
