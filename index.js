let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");    //Найди на странице элемент по CSS-селектору, чтобы в дальнейшем работать с ним
const formElement = document.querySelector(".to-do__form");    // кнопка добавить
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
  
  deleteButton.addEventListener("click", function() // удалить
  {
    clone.remove()    // Удаляется сама задача со страницы
    const items = getTasksFromDOM()    // Страница перечитывает все оставшиеся задачи
    saveTasks(items) // Сохраняет их 
  })

  duplicateButton.addEventListener("click", function()  // копировать
  {
    const itemName = textElement.textContent
    const newItem = createItem(itemName)
    listElement.prepend(newItem)
    const items = getTasksFromDOM()
    saveTasks(items)
  });

  editButton.addEventListener("click", function()   // редактировать
  {
    textElement.setAttribute("contenteditable", "true")     // добавляет или изменяет атрибут (contenteditable) у html элемента
    textElement.focus()  // ставит курсор внутрь текста 
  })

  textElement.addEventListener("blur", function() // клик вне редактируемой области (редактирование закончено)
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

items = loadTasks()  // инициализация актуального списка задач 
items.forEach(function(item) 
{
  const newItem = createItem(item)   //создаёт HTML-элемент для этой задачи
  listElement.append(newItem)        //добавляет его в список на странице
})

formElement.addEventListener("submit", function(event) // Назначает действие на отправку формы (когда пользователь нажимает «Добавить» или Enter в поле ввода)
{
  event.preventDefault()  // отменяет перезагрузку
  const newItem = createItem(inputElement.value)
  listElement.prepend(newItem)
  const items = getTasksFromDOM()
  saveTasks(items)
  formElement.reset()  // очищает поле ввода после отправки формы
})
