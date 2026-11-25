// Tasks stay in this array while the page is open.
var tasks = [];
var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var message = document.getElementById("message");

function showTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    message.textContent = "No tasks yet. Add your first task above.";
    return;
  }

  message.textContent = "";

  for (var i = 0; i < tasks.length; i++) {
    var item = document.createElement("li");
    var taskText = document.createElement("span");
    var actions = document.createElement("div");
    var completeButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    taskText.className = "task-text";
    taskText.textContent = tasks[i].text;
    actions.className = "task-actions";
    item.dataset.index = i;

    if (tasks[i].completed) {
      item.className = "completed";
    }

    completeButton.type = "button";
    completeButton.className = "complete-button";
    completeButton.textContent = tasks[i].completed ? "Undo" : "Complete";
    completeButton.dataset.index = i;
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.index = i;
    completeButton.addEventListener("click", toggleTask);
    deleteButton.addEventListener("click", deleteTask);

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    item.appendChild(taskText);
    item.appendChild(actions);
    taskList.appendChild(item);
  }
}

function toggleTask(event) {
  var taskIndex = Number(event.currentTarget.dataset.index);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  showTasks();
}

function deleteTask(event) {
  var taskIndex = Number(event.currentTarget.dataset.index);
  tasks.splice(taskIndex, 1);
  showTasks();
}

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var taskName = taskInput.value.trim();

  if (taskName === "") {
    message.textContent = "Please enter a task.";
    return;
  }

  tasks.push({ text: taskName, completed: false });
  taskInput.value = "";
  showTasks();
});

showTasks();
