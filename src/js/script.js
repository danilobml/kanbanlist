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

/* Function that excludes to do tasks when delete button (thrash icon) is pressed */
function deleteTask(event) {
  const target = event.currentTarget.closest("li");
  taskList.removeChild(target);
}

/* Function that sends complete tasks to the "Completed Tasks" list when complete button (checkmark icon) is pressed */
function completeTask(event) {
  const target = event.currentTarget.closest("li");
  let nameOfTask = target.querySelector(".task-text").innerText;
  if (nameOfTask.textContent !== "") {
    completeTasks.innerHTML += `${nameOfTask} ${tick}<br>`;
  }
  taskList.removeChild(target);
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
const addTask = (event) => {
  if (newInput.value) {
    event.preventDefault();
    const todoTaskTemplate = `
        <li data-id=${Date.now().toString()}>
        <spam class= "task-text" contenteditable="true">${newInput.value}</spam>
        <spam class="complete">${tick}</spam>
        <spam class="delete">${trash}</spam><br>
        </li>
    `;
    taskList.innerHTML += todoTaskTemplate;
    newInput.value = "";
    applyEventListenersToTasks();
  }
};

/* Event listener for add button */
buttonAdd.onclick = addTask;

/* Functionality of button that slears completed tasks */ 
function clearCompletedTasks() {
  completeTasks.innerHTML = "";
}

/* Event listener for clear button */
clear.onclick = clearCompletedTasks;
