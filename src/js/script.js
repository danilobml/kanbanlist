//A.Variables and Selectors:
// Array with tasks (to be used to render viewed lists and save on Local Storage)
let tasks = [];
// Delete, arrows, complete and check icon files
const trash = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;
const complete = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;
const check = '<svg xmlns="<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
const arrows = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/></svg>';
const reactive = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>';
// Selector for input text
const newInput = document.querySelector("#new-input");
// Selector for area (<ul>) for the list of new tasks
const taskList = document.querySelector("#tasks");
// Selector for area for the list of ongoing tasks
const ongoingList = document.querySelector("#tasks-ongoing");
// Selector for area for the list of completed tasks
const completeTasks = document.querySelector("#comp-tasks");
// Selector for add task button
const buttonAdd = document.querySelector("#addbutton");
//Selector for li task (for edit purposes)
const taskTexts = document.getElementsByClassName("task-text");

//Selectors for arrows, complete, delete and reactivate buttons (icons)
const deleteButtons = document.getElementsByClassName("delete");
const completeButtons = document.getElementsByClassName("complete");
const arrowsButtons = document.getElementsByClassName("arrows");
const reactivateButtons = document.getElementsByClassName("reactivate");
// Selector for clear button
const clear = document.getElementById("clear");
//for edited text
let newValue;


//B.Event Listeners:
// For add button
buttonAdd.onclick = handleAddTask;
// For clear button
clear.onclick = clearCompletedTasks;
//(Delete and complete will be assigned at task creation)

//C.Handling Local Storage:
//Namespace of Local Storage
const APP_NAME = "WBSKanbanList"; 
// 1. Check if there's anything inside the local storage with our namespace
if (localStorage.getItem(APP_NAME)) {
// 2. If there's something, parse it back into a js array, and inject that into the tasks array
  tasks = JSON.parse(localStorage.getItem(APP_NAME));
}

//D.Group of functions to add a new task when add button is pressed
//1.Event handler (when add button is clicked). Creates array item for [tasks].
function handleAddTask(event) {
  event.preventDefault();
  if (newInput.value) {
    tasks.push({
      id: Date.now().toString(),
      name: newInput.value,
      complete: false,
      category: "todo"
    });
    cleanSaveAndRender();
    newInput.value = "";
  }
}

//2.Generate template for task and either place it (as <li>) on to do list (with active buttons), or only the name of the task, on the completed list.
const addTask = (task) => {
  const todoTaskTemplate = `
        <li data-id=${task.id}>
          <span class= "task-text text-dark fs-3" contenteditable>${task.name}</span>
          <span class="delete">${trash}</span>
          <span class="arrows">${arrows}</span>
          <span class="complete">${complete}</span><br>
        </li>
    `;
  if (task.complete === false && task.category === "todo"){
    taskList.innerHTML += todoTaskTemplate;
    applyEventListenersToTasks();
  }  else if (task.complete === false && task.category === "ongoing") {
    ongoingList.innerHTML += todoTaskTemplate;
    applyEventListenersToTasks();
  } else {  
    completeTasks.innerHTML += `<li class="text-dark fs-3" data-id=${task.id}>${task.name} ${check} <span class="reactivate">${reactive}</span></li>`;
    applyEventListenersToTasks();
  }
};

//3.Assign complete, delete, arrow and reactivate buttons (icons), and edit event listeners to each new task.
function applyEventListenersToTasks() {
  for (const deleteButton of deleteButtons) {
    deleteButton.onclick = deleteTask;
  }
  for (const arrowsButton of arrowsButtons) {
    arrowsButton.onclick = changeTask;
  }
  for (const completeButton of completeButtons) {
    completeButton.onclick = completeTask;
  }
  for (const taskText of taskTexts) {
    taskText.addEventListener('blur', editText);
  }
  for (const reactivateButton of reactivateButtons) {
    reactivateButton.onclick = reactivateTask;
  }
}
 
// E.Action functions
//Saves edited task
function editText(event) {
  const target = event.currentTarget.closest("li");
  const liId = target.getAttribute("data-id");
  newValue = target.innerText;
  saveEdit(newValue, liId);
}

function saveEdit (newValue, liId) {  
  for (i=0; i<tasks.length; i++) {
      if (tasks[i].id === liId) {
        tasks[i].name=newValue;}
      cleanSaveAndRender();
      }
  }


//Excludes to do tasks when delete button (thrash icon) is pressed
function deleteTask(event) {
  const target = event.currentTarget.closest("li");
  const liId = target.getAttribute("data-id");  
  for (i=0; i<tasks.length; i++) {
      if (tasks[i].id === liId) {
        tasks.splice(i, 1);}
      cleanSaveAndRender();
    }
  };

//Sends complete tasks to the "Completed Tasks" u-list when complete button (checkmark icon) is pressed.
function completeTask(event) {
  const target = event.currentTarget.closest("li"); 
  const liId = target.getAttribute("data-id");
  for (i=0; i<tasks.length; i++) {
    if (tasks[i].id === liId) {
      tasks[i].complete=true;}
    };
      cleanSaveAndRender();
}

//Changes (toggles) between to do and ongoing
function changeTask (event) {
  const target = event.currentTarget.closest("li"); 
  const liId = target.getAttribute("data-id");
  for (i=0; i<tasks.length; i++) {
    if (tasks[i].id === liId) {
      if (tasks[i].category==="todo") {
        tasks[i].category="ongoing";
      } else {
        tasks[i].category="todo";
      }
    }
      cleanSaveAndRender();
  }
}

// Reactivates completed tasks
function reactivateTask(event) {
  const target = event.currentTarget.closest("li"); 
  const liId = target.getAttribute("data-id");
  for (i=0; i<tasks.length; i++) {
    if (tasks[i].id === liId) {
      tasks[i].complete=false;}};
  cleanSaveAndRender();
}

//Clears (excludes) completed tasks
function clearCompletedTasks() {
  const newArr = tasks.filter((task) => task.complete === false)
  tasks = newArr;
  cleanSaveAndRender();
}

//F.Group of functions handling saving on Local Storage and rendering the lists after each operation;
//1.Clears previous tasks on array to mantain localStorage as "source of truth"
function clearTasks(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//2.Saves on localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem(APP_NAME, JSON.stringify(tasks));
}

//3.Renders tasks (again) on UI
function renderTasks() {
  tasks.forEach((task) => addTask(task));
}

//4.Calls everything
function cleanSaveAndRender() {
  clearTasks(taskList);
  clearTasks(completeTasks);
  clearTasks(ongoingList);
  saveTasksToLocalStorage();
  renderTasks();
}

//Initial render of task lists at page loading
renderTasks();