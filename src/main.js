import "./style.css";
import projectController from "./modules/projectController.js";
import Storage from "./modules/storage.js";
import {
  renderInboxDetails,
  renderTodayDetails,
  renderUpcomingDetails,
  renderImportantDetails,
  renderCurrentProject,
  renderProjects,
} from "./modules/uiController.js";

projectController.projects = Storage.loadProject();

initializeApp();

function initializeApp() {
  renderInboxDetails();
  initSidebarListeners();
}

function initSidebarListeners() {
  const sidebar = document.getElementById("sidebar");

  projectController.projects.forEach((project) => {
    renderProjects(project.name);
  });

  sidebar.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".menu-item, .project-item");
    if (!clickedItem) return;

    document.querySelectorAll(".menu-item, .project-item").forEach((item) => {
      item.classList.remove("active");
    });
    clickedItem.classList.add("active");

    const tab = clickedItem.dataset.tab;
    const projectName = clickedItem.dataset.project;

    if (tab) {
      switch (tab) {
        case "inbox":
          renderInboxDetails();
          break;
        case "today":
          renderTodayDetails();
          break;
        case "upcoming":
          renderUpcomingDetails();
          break;
        case "important":
          renderImportantDetails();
          break;
      }
    } else if (projectName) {
      renderCurrentProject(projectName);
    }
  });
}
