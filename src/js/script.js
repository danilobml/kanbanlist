/* Selector for input text*/
const newInput = document.querySelector("#new-input");
/* Selector for area for the list of new tasks */
const taskList = document.querySelector("#tasks");
/* Selector for add task button*/
const buttonAdd = document.querySelector("#addbutton");
/* Selector for area for the list of completed tasks */
const completeTasks = document.querySelector("#comp-tasks");
/*Selectors for complete and delete buttons (icons)*/
const deleteButtons = document.getElementsByClassName("delete");
const completeButtons = document.getElementsByClassName("complete");
/* Icon files*/
const trash = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg>`;
const tick = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`;
/* Selector for clear button*/
const clear = document.getElementById("clear");

const APP_NAME = "WBSKanbanList"; // screaming snake case for "true" constants

let tasks = [];

// console.log(typeof localStorage.getItem(APP_NAME));

// 1. Check if there's anything inside the local storage with our namespace
if (localStorage.getItem(APP_NAME)) {
  // 2. If there's something, parse it back into a js array, and inject that into the tasks array
  // const locallyStoredTasks = localStorage.getItem(APP_NAME)
  // const parsedLocallyStoredTasks = JSON.parse(locallyStoredTasks)
  // tasks = parsedLocallyStoredTasks

  tasks = JSON.parse(localStorage.getItem(APP_NAME));
}

/* Function that excludes to do tasks when delete button (thrash icon) is pressed */
function deleteTask(event) {
  const target = event.currentTarget.closest("li");
  getTaskId(target);
  taskList.removeChild(target);
}

/* Function that sends complete tasks to the "Completed Tasks" list when complete button (checkmark icon) is pressed */
function completeTask(event) {
  // console.log("here");
  const targetLi = event.currentTarget.closest("li"); // html element
  let nameOfTask = targetLi.querySelector(".task-text").innerText; // string

  if (nameOfTask) {
    completeTasks.innerHTML += `${nameOfTask} ${tick}<br>`;
  }

  taskList.removeChild(targetLi);
  // console.log("there");
}

/* Function to assign complete and delete buttons (icons) to each new task */
function applyEventListenersToTasks() {
  for (const completeButton of completeButtons) {
    completeButton.onclick = completeTask;
  }
  for (const deleteButton of deleteButtons) {
    deleteButton.onclick = deleteTask;
  }
}

/* Function to add a new task when add button is pressed */
const addTask = (task) => {
  // if task is ongoing:
  const todoTaskTemplate = `
        <li data-id=${task.id}>
          <span class= "task-text" contenteditable>${task.name}</span>
          <span class="complete">${tick}</span>
          <span class="delete">${trash}</span><br>
        </li>
    `;
  taskList.innerHTML += todoTaskTemplate;
  applyEventListenersToTasks();
  // else attach it to the completed tasks container
};

function handleAddTask(event) {
  event.preventDefault();
  if (newInput.value) {
    tasks.push({
      id: Date.now().toString(),
      name: newInput.value,
    });
    cleanSaveAndRender();
    newInput.value = "";
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem(APP_NAME, JSON.stringify(tasks));
}

function renderTasks() {
  tasks.forEach((task) => addTask(task));
}

function cleanSaveAndRender() {
  clearTasks(taskList);
  saveTasksToLocalStorage();
  renderTasks();
}

renderTasks();

/* Event listener for add button */
buttonAdd.onclick = handleAddTask;

/* Functionality of button that clears completed tasks */
function clearCompletedTasks() {
  completeTasks.innerHTML = "";
}

function clearTasks(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Delete a task from the localStorage
// 1. figure out what's the data-id attribute attached to the parent of the delete button
// 2. .filter the tasks array with the task's id
// 3. cleanSaveAndRender()

// For later:
// What if a task was completed when the user arrives on the page? task will be back to to do

/* Event listener for clear button */
// clear.onclick = clearCompletedTasks;

// function deleteTaskFromStorage (event) {

// }

function getTaskId(target) {
  const liId = target.getAttribute("data-id");
  console.log(liId);
  deleteFromArray(liId);
}

function deleteFromArray (liId) {
  tasks.forEach((task)=>{
    for(let i = 0; i < tasks.length; i++){ 
      if (task.getAttribute('data.id') === liId) { 
          task.splice(i, 1); 
      }
      cleanSaveAndRender()
  }
})

// tasks= localStorage.removeItem

/* 
function deleteTasksFromLocalStorage() {
  localStorage.removeItem(APP_NAME, JSON.stringify(tasks));
} */

// /* function deleteTask(event) {
//   const target = event.currentTarget.closest("li");
//   taskList.removeChild(target);
// }

//   for (const deleteButton of deleteButtons) {
//     deleteButton.onclick = deleteTask;
//   }

// */


//if (localStorage.getItem(APP_NAME)) {
  // 2. If there's something, parse it back into a js array, and inject that into the tasks array
  // const locallyStoredTasks = localStorage.getItem(APP_NAME)
  // const parsedLocallyStoredTasks = JSON.parse(locallyStoredTasks)
  // tasks = parsedLocallyStoredTasks

  //tasks = JSON.parse(localStorage.getItem(APP_NAME));
}