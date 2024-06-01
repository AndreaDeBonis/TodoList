import "./style.css";

let tasks = [];
const content = document.getElementById("content");
let idCounter = 0;

function createTask(title, description, dueDate, priority) {
  idCounter++;
  return {
    title,
    description,
    dueDate,
    priority,
    toDo: false,
    id: idCounter.toString(),
  };
}

function printTask(task) {
  console.log(task.title);
  console.log(task.description);
  console.log(task.dueDate);
}

function filterTasks(tasks, filter) {
  let filteredTasks = [...tasks];
  for (let key in filter) {
    filteredTasks = filteredTasks.filter((task) => task[key] == filter[key]);
  }

  return filteredTasks;
}

function printAllTasks(tasks, filter) {
  tasks.forEach((task) => printTask(task));
}

function addTask(task) {
  tasks.push(task);
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id != taskId);
}

function toggleTaskState(task) {
  task.toDo = !task.toDo;
}

const filter = { dueDate: "oggi", description: "ovvio" };

function renderTask(task) {
  const renderedTask = document.createElement("div");
  renderedTask.innerHTML = `<div data-id="${task.id}" class="relative px-24 py-8 border">
  <button class="bg-red-300 absolute right-4 px-2 py-1" id="delete">
            X
          </button>
  <h2 class="text-2xl font-bold">${task.title}</h2>
  <ul class="text-xl mt-3 ml-4">
    <li>${task.description}</li>
    <li>${task.dueDate}</li>
    <li>${task.toDo}</li>
    <li>${task.priority}</li>
  </ul>
</div>`;
  content.appendChild(renderedTask);
}

function renderMultiTasks(tasks) {
  content.innerHTML = "";
  tasks.forEach((task) => renderTask(task));
}

(function () {
  const modal = document.querySelector(".modal");
  const openButton = document.querySelector(".open-button");
  const closeButton = document.querySelector(".close-button");
  const submitBtn = document.getElementById("submit");

  openButton.addEventListener("click", () => {
    modal.showModal();
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });
  submitBtn.addEventListener("click", submitTask);

  document.addEventListener("click", (e) => {
    if (e.target.id === "delete") {
      const taskContainer = e.target.parentElement;
      removeTask(taskContainer.dataset.id);
      taskContainer.remove();
    }
  });
})();

const submitBtn = document.getElementById("submit");

function submitTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const task = createTask(title, description, dueDate, priority);
  addTask(task);
  renderMultiTasks(tasks);
}
