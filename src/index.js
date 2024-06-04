import "./style.css";
import {
  parse,
  format,
  startOfISOWeek,
  endOfISOWeek,
  isWithinInterval,
} from "date-fns";

let tasks = [];
let projects = ["Default"];
const content = document.getElementById("content");
const projectsContainer = document.getElementById("projects-container");
let currentProject = "Default";
let timeFilter = "Week";
document.getElementById("default").checked = true;
let idCounter = 0;

function createTask(title, description, project, dueDate, priority) {
  idCounter++;
  return {
    title,
    description,
    project,
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

function getTasks() {
  const tasksByProject = tasks.filter(
    (task) => task.project === currentProject
  );
  if (timeFilter === "All") {
    return tasksByProject;
  }
  if (timeFilter === "Today") {
    return filterToday(tasksByProject);
  }
  if (timeFilter === "Week") {
    return filterWeek(tasksByProject);
  }
}

function filterToday(list) {
  return list.filter(
    (task) =>
      format(task.dueDate, "MM-dd-yyyy") === format(new Date(), "MM-dd-yyyy")
  );
}

function filterWeek(list) {
  return list.filter((task) =>
    isWithinInterval(task.dueDate, {
      start: startOfISOWeek(new Date()),
      end: endOfISOWeek(new Date()),
    })
  );
}

/* function filterTasks(tasks, filter) {
  let filteredTasks = [...tasks];
  for (let key in filter) {
    filteredTasks = filteredTasks.filter((task) => task[key] == filter[key]);
  }

  return filteredTasks;
}
 */
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
  renderedTask.innerHTML = `<div data-id="${
    task.id
  }" class="relative px-12 py-8 border">
  <button class="bg-red-300 absolute right-4 px-2 py-1" id="delete">
            X
          </button>
  <h2 class="text-2xl font-bold">${task.title}</h2>
  <ul class="text-xl mt-3 ml-4">
    <li>${task.description}</li>
    <li>${task.project}</li>
    <li>${format(task.dueDate, "MM-dd-yyy")}</li>
    <li>${task.toDo}</li>
    <li>${task.priority}</li>
  </ul>
</div>`;
  content.appendChild(renderedTask);
}

function renderProject(project) {
  const newProject = document.createElement("div");
  newProject.innerHTML = `
  <input
    type="radio"
    id="${project}"
    name="projects"
    value="${project}"
    class="peer hidden"
  />
  <label
    for="${project}"
    data-project="${project}"
    id="projectswitch"
    class="grow w-12 px-3 py-2 rounded border border-slate-300 peer-checked:bg-slate-300"
  >
  ${project} </label
  ><br />`;
  newProject.classList.add("w-full", "flex");
  projectsContainer.appendChild(newProject);
  document.getElementById(project).checked = true;
}

function renderMultiProjects() {
  projectsContainer.innerHTML = "";
  projects.forEach((el) => renderProject(el));
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
      taskContainer.parentElement.remove();
    }
    if (e.target.id === "submit-project") {
      const project = document.getElementById("project").value;
      addProject(project);
      renderMultiProjects();
    }
    if (e.target.id === "projectswitch") {
      currentProject = e.target.dataset.project;
      console.log(getTasks());
      renderMultiTasks(getTasks());
    }
    if (e.target.id === "filter") {
      timeFilter = e.target.dataset.filter;
      renderMultiTasks(getTasks());
    }
  });
})();

function submitTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const project = currentProject;
  console.log(document.getElementById("dueDate").value);
  const dueDate = parse(
    document.getElementById("dueDate").value,
    "yyyy-MM-dd",
    new Date()
  );
  const priority = document.getElementById("priority").value;
  const task = createTask(title, description, project, dueDate, priority);
  addTask(task);
  renderMultiTasks(getTasks());
  console.log(projects);
}

function addProject(proj) {
  if (projects.includes(proj)) {
    return 0;
  }
  projects.push(proj);
}

console.log(format(new Date(), "MM-dd-yyyy"));
console.log(startOfISOWeek(new Date()));
