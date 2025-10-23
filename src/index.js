import { createTask, printTask, addTask, removeTask, tasks, printAllTasks, getTasks } from "./modules/tasks.js";
import { renderTask, renderProject, renderMultiProjects, renderMultiTasks } from "./ui/render.js";
import { filterTasks } from "./modules/filter.js";

import "./style.css";

import {
  parse,
  format,
  startOfISOWeek,
  endOfISOWeek,
  isWithinInterval,
} from "date-fns";



let projects = ["Default"];
let currentProject = "Default";
let timeFilter = "Week";
const content = document.getElementById("content");
const projectsContainer = document.getElementById("projects-container");
document.getElementById("default").checked = true;
const task = createTask({title: "New Task", description: "Task Description", project: "Default", dueDate: new Date(), priority: "medium"});
addTask(task);
console.log(filterTasks(getTasks(), currentProject, timeFilter));
renderMultiTasks(filterTasks(getTasks(), currentProject, timeFilter));



/* function filterTasks(tasks, filter) {
  let filteredTasks = [...tasks];
  for (let key in filter) {
    filteredTasks = filteredTasks.filter((task) => task[key] == filter[key]);
  }

  return filteredTasks;
}
 */



function submitTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const project = currentProject;
  const dueDate = parse(
    document.getElementById("dueDate").value,
    "yyyy-MM-dd",
    new Date()
  );
  const priority = document.getElementById("priority").value;
  const task = createTask({title, description, project, dueDate, priority});
  addTask(task);
  renderMultiTasks(filterTasks(getTasks(), currentProject, timeFilter));
}

function addProject(proj) {
  if (projects.includes(proj)) {
    return 0;
  }
  projects.push(proj);
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
    if (e.target.id === "submit-project") {;
      if (!document.getElementById("project").value) return;
      const project = document.getElementById("project").value;
      addProject(project);
      renderMultiProjects(projects, projectsContainer);
    }
    if (e.target.id === "projectswitch") {
      currentProject = e.target.dataset.project;
      renderMultiTasks(filterTasks(getTasks(), currentProject, timeFilter));
    }
    if (e.target.id === "filter") {
      timeFilter = e.target.dataset.filter;
      renderMultiTasks(filterTasks(getTasks(), currentProject, timeFilter));
    }
  });
})();

