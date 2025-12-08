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

}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

}

function getTasksFromDOM() {

}


function saveTasks(tasks) {

}


// не изначальные данные - (переделать если не правильно)
//let items = [
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
  const savedTasks = localStorage.getItem('todoTasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return items;
  }
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  textElement.textContent = item;

  deleteButton.addEventListener('click', () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener('click', () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
  textElement.setAttribute('contenteditable', 'false');
  const items = getTasksFromDOM();
  saveTasks(items);
});

textElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    textElement.blur();
  }
});

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
  const tasks = [];
  
  itemsNamesElements.forEach(element => {
    tasks.push(element.textContent);
  });
  
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function renderTasks() {
  listElement.innerHTML = '';
  items.forEach(item => {
    const taskElement = createItem(item);
    listElement.append(taskElement);
  });
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = inputElement.value.trim();
  
  if (taskText !== '') {
    const taskElement = createItem(taskText);
    listElement.prepend(taskElement);
    items = getTasksFromDOM();
    saveTasks(items);
    inputElement.value = '';
  }
});

items = loadTasks();
renderTasks();


