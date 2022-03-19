class KanbanList {
  constructor(){
    // Array with tasks (to be used to render viewed lists and save on Local Storage)
    this.tasks = [];
    //Icon files;
    this.trash = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;
    this.complete = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;
    this.check = '<svg xmlns="<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    this.arrows = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/></svg>';
    this.reactive = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>';
    // Selectors for UI lists
    this.taskList = document.querySelector("#tasks");
    this.ongoingList = document.querySelector("#tasks-ongoing");
    this.completeTasks = document.querySelector("#comp-tasks");
    // Selector for Input and add task button.
    this.buttonAdd = document.querySelector("#addbutton");
    this.newInput = document.querySelector("#new-input");
    //Selector for clear button.
    this.clear = document.getElementById("clear");
    //Selector for edit task.
    this.taskTexts = document.getElementsByClassName("task-text");
    //Selectors for arrows, complete, delete and reactivate buttons (icons).
    this.deleteButtons = document.getElementsByClassName("delete");
    this.completeButtons = document.getElementsByClassName("complete");
    this.arrowsButtons = document.getElementsByClassName("arrows");
    this.reactivateButtons = document.getElementsByClassName("reactivate");
    //Variable for edited text.
    this.newValue;
    //Binding
    this.initialize = this.initialize.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.applyEventListenersToTasks = this.applyEventListenersToTasks.bind(this);
    this.editText = this.editText.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.changeTask = this.changeTask.bind(this);
    this.reactivateTask = this.reactivateTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
    this.saveTasksToLocalStorage = this.saveTasksToLocalStorage.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.cleanSaveAndRender = this.cleanSaveAndRender.bind(this);
    //Initializes local storage and assigns existing buttons.
    this.initialize()
  }
  initialize(){
    //Event Listeners for buttons:
    this.buttonAdd.onclick = this.handleAddTask;
    this.clear.onclick = this.clearCompletedTasks;
    //Handling Local Storage:
    this.APP_NAME = "WBSKanbanList"; 
    if (localStorage.getItem(this.APP_NAME)) {
      this.tasks = JSON.parse(localStorage.getItem(this.APP_NAME));
    }
    //Initial render of task lists at page loading
    this.renderTasks();
  }
  //Adds new tasks (2 methods).
  handleAddTask(event){
    event.preventDefault();
    if (this.newInput.value) {
      this.tasks.push({
        id: Date.now().toString(),
        name: this.newInput.value,
        complete: false,
        category: "todo"
      });
    this.cleanSaveAndRender();
    this.newInput.value = "";
    }
  }
  addTask(task) {
    const todoTaskTemplate = `
          <li data-id=${task.id}>
            <span class= "task-text text-dark fs-3" contenteditable>${task.name}</span>
            <span class="delete">${this.trash}</span>
            <span class="arrows">${this.arrows}</span>
            <span class="complete">${this.complete}</span><br>
          </li>
      `;

    if (task.complete === false && task.category === "todo"){
      this.taskList.innerHTML += todoTaskTemplate;
      this.applyEventListenersToTasks();
    }  else if (task.complete === false && task.category === "ongoing") {
      this.ongoingList.innerHTML += todoTaskTemplate;
      this.applyEventListenersToTasks();
    } else {  
      this.completeTasks.innerHTML += `<li class="text-dark fs-3" data-id=${task.id}>${task.name} ${this.check} <span class="reactivate">${this.reactive}</span></li>`;
      this.applyEventListenersToTasks();
    }
  }
  //Applies Event listeners to new buttons, created with new and completed tasks.
  applyEventListenersToTasks() {
    for (const deleteButton of this.deleteButtons) {
      deleteButton.onclick = this.deleteTask;
    }
    for (const arrowsButton of this.arrowsButtons) {
      arrowsButton.onclick = this.changeTask;
    }
    for (const completeButton of this.completeButtons) {
      completeButton.onclick = this.completeTask;
    }
    for (const taskText of this.taskTexts) {
      taskText.addEventListener('blur', this.editText);
    }
    for (const reactivateButton of this.reactivateButtons) {
      reactivateButton.onclick = this.reactivateTask;
    }
  }
  //Saves edited task (2 methods).
  editText(event) {
    const target = event.currentTarget.closest("li");
    const liId = target.getAttribute("data-id");
    this.newValue = target.innerText;
    this.saveEdit(this.newValue, liId);
  }
  saveEdit (newValue, liId) {  
    for (let i=0; i<this.tasks.length; i++) {
        if (this.tasks[i].id === liId) {
          this.tasks[i].name=newValue;}
        this.cleanSaveAndRender();
        }
    }
  //Excludes to do tasks.
  deleteTask(event) {
    const target = event.currentTarget.closest("li");
    const liId = target.getAttribute("data-id");  
    for (let i=0; i<this.tasks.length; i++) {
        if (this.tasks[i].id === liId) {
          this.tasks.splice(i, 1);}
        this.cleanSaveAndRender();
      }
    };
  //Sends complete tasks to the "Completed Tasks" list.
  completeTask(event) {
    const target = event.currentTarget.closest("li"); 
    const liId = target.getAttribute("data-id");
    for (let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i].id === liId) {
        this.tasks[i].complete=true;}
      };
        this.cleanSaveAndRender();
  }
  //Changes (toggles) between to do and ongoing.
  changeTask(event) {
    const target = event.currentTarget.closest("li"); 
    const liId = target.getAttribute("data-id");
    for (let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i].id === liId) {
        if (this.tasks[i].category==="todo") {
          this.tasks[i].category="ongoing";
        } else {
          this.tasks[i].category="todo";
        }
      }
        this.cleanSaveAndRender();
    }
  }
  //Reactivates completed tasks.
  reactivateTask(event) {
    const target = event.currentTarget.closest("li"); 
    const liId = target.getAttribute("data-id");
    for (let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i].id === liId) {
        this.tasks[i].complete=false;}};
    this.cleanSaveAndRender();
  }
  //Clears (excludes) completed tasks.
  clearCompletedTasks() {
    const newArr = this.tasks.filter((task) => task.complete === false)
    this.tasks = newArr;
    this.cleanSaveAndRender();
  }
  //Clears previous tasks on array.
  clearTasks(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  //Saves on localStorage.
  saveTasksToLocalStorage() {
    localStorage.setItem(this.APP_NAME, JSON.stringify(this.tasks));
  }
  //Renders tasks (again) on UI.
  renderTasks() {
    this.tasks.forEach((task) => this.addTask(task));
  }
  //Calls everything.
  cleanSaveAndRender() {
    this.clearTasks(this.taskList);
    this.clearTasks(this.completeTasks);
    this.clearTasks(this.ongoingList);
    this.saveTasksToLocalStorage();
    this.renderTasks();
  }
}

new KanbanList();