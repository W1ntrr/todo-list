import note from '../images/note_stack_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import ProjectController from './projectController';
import Todo from './todo';
import { format, isAfter, isToday, startOfToday, parseISO } from 'date-fns';

export default class UI {
  constructor() {
    this.content = document.querySelector('.content');

    this.dialog = document.getElementById('dialog');
    this.projectDialog = document.getElementById('project-dialog');
    this.projectForm = document.getElementById('project-form');
    this.projectWarning = document.querySelector('.project-warning');
    this.form = document.getElementById('task-form');
    this.closeButton = document.querySelector('.close-button');

    this.currentEditingProject = null;
    this.currentEditingTask = null;

    this.currentView = 'inbox';
    this.currentProjectName = null;
  }

  clearElement = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  renderViewTasks = (viewName, filterFn) => {
    this.clearElement(this.content);
    const contentHeader = document.querySelector('.content-header');
    this.content.removeAttribute('id');
    contentHeader.textContent = viewName;

    this.currentView = viewName;
    this.currentProjectName = null;

    const filteredTasks = [];

    ProjectController.getAllProjects().forEach((project) => {
      project.tasks.forEach((task) => {
        if (filterFn(task)) {
          filteredTasks.push({ task, project });
        }
      });
    });
    this.createTaskGroup(viewName, filteredTasks);
  };

  renderInboxDetails = () => {
    const projects = ProjectController.getAllProjects();

    this.currentView = 'Inbox';
    this.currentProjectName = null;

    this.clearElement(this.content);
    const contentHeader = document.querySelector('.content-header');

    this.content.removeAttribute('id');

    contentHeader.textContent = 'Inbox';
    projects.forEach((proj) => {
      this.createTaskGroup(
        proj.name,
        proj.tasks.map((task) => ({ task, project: proj }))
      );
    });
  };

  createTaskGroup = (title, tasks) => {
    if (!tasks) return;

    const taskGroup = document.createElement('div');
    taskGroup.classList.add('task-group');

    const taskGroupTitle = document.createElement('div');
    taskGroupTitle.classList.add('task-group-title');
    taskGroupTitle.textContent = title;

    const taskGroupInfo = document.createElement('div');
    taskGroupInfo.classList.add('task-group-info');

    const img = document.createElement('img');
    img.src = note;
    img.alt = 'Task Icon';

    const taskCount = document.createElement('p');
    taskCount.classList.add('task-count');

    const count = tasks.length;
    taskCount.textContent = count === 0 ? 'No Task' : `${count} ${count === 1 ? 'Task' : 'Tasks'}`;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const fragment = document.createDocumentFragment();
    tasks.forEach(({ task, project }) => {
      const taskElement = this.renderTaskList(project, task);
      fragment.appendChild(taskElement);
    });

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task');

    const allProjects = ProjectController.getAllProjects();
    let defaultProject = allProjects.find((project) => project.name === title);

    if (!defaultProject && allProjects.length > 0) {
      defaultProject = allProjects[0];
    }

    if (defaultProject) {
      addTaskBtn.addEventListener('click', () => {
        this.currentEditingProject = defaultProject;
        this.currentEditingTask = null;
        this.dialog.showModal();

        this.closeButton.addEventListener('click', () => {
          this.resetDialog();
        });
      });
    }

    const addTaskIcon = this.createSVGIcon(
      'M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z',
      '#ced4d9'
    );

    const addTaskText = document.createElement('p');
    addTaskText.textContent = 'Add Task';

    taskItem.appendChild(fragment);

    this.content.appendChild(taskGroup);

    taskGroup.appendChild(taskGroupTitle);
    taskGroup.appendChild(taskGroupInfo);
    taskGroup.appendChild(taskItem);

    taskGroupInfo.appendChild(img);
    taskGroupInfo.appendChild(taskCount);
    taskItem.appendChild(addTaskBtn);

    addTaskBtn.appendChild(addTaskIcon);
    addTaskBtn.appendChild(addTaskText);
  };

  renderTaskList = (project, task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.id = task.id;

    const wrapper = document.createElement('label');
    wrapper.classList.add('wrapper');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'task');

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');

    const taskText = document.createElement('div');
    taskText.classList.add('task-text');
    taskText.textContent = task.title;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const taskEdit = document.createElement('div');
    taskEdit.classList.add('task-edit');
    taskEdit.setAttribute('data-open-form', '');

    taskEdit.addEventListener('click', () => {
      if (!checkbox.checked) {
        this.currentEditingProject = project;
        this.currentEditingTask = task;

        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-date').value = task.dueDate;
        document.getElementById('task-priority').value = task.priority;

        this.dialog.showModal();
      }
    });

    const taskEditIcon = this.createSVGIcon(
      'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z'
    );

    const taskDelete = document.createElement('div');
    taskDelete.classList.add('task-delete');

    const taskDeleteIcon = this.createSVGIcon(
      'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z'
    );

    taskDelete.addEventListener('click', () => {
      this.displayConfirmationForm(project, task, taskElement);
    });

    checkbox.addEventListener('change', () => {
      taskText.classList.toggle('completed', checkbox.checked);
      task.toggleStatus();
      this.updateTaskCount(project);
      this.updateAllBadges();
      ProjectController.saveProjects();
    });

    if (task.status === 'Complete') {
      checkbox.checked = true;
      taskText.classList.add('completed');
    }

    checkbox.setAttribute('id', `checkbox-${task.id}`);
    wrapper.setAttribute('id', `checkbox-${task.id}`);

    taskElement.appendChild(wrapper);
    taskElement.appendChild(taskContent);

    wrapper.appendChild(checkbox);
    wrapper.appendChild(checkmark);

    taskContent.appendChild(taskText);
    taskActions.appendChild(taskEdit);
    taskContent.appendChild(taskActions);
    taskActions.appendChild(taskDelete);
    taskEdit.appendChild(taskEditIcon);
    taskDelete.appendChild(taskDeleteIcon);

    return taskElement;
  };

  renderTodayDetails = () => {
    this.renderViewTasks('Today', (task) => isToday(parseISO(task.dueDate)));
  };

  renderUpcomingDetails = () => {
    this.renderViewTasks('Upcoming', (task) => isAfter(task.dueDate, startOfToday));
  };

  renderImportantDetails = () => {
    this.renderViewTasks('Important', (task) => task.priority === 'High');
  };

  displayConfirmationForm = (project, task, taskElement) => {
    const confirmDialog = document.getElementById('confirm-delete-dialog');
    const confirmBtn = document.querySelector('.confirm-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    confirmDialog.showModal();
    confirmBtn.onclick = () => {
      project.deleteTask(task.id);
      ProjectController.saveProjects();
      taskElement.remove();

      this.updateTaskCount(project);
      this.updateAllBadges();

      confirmDialog.close();
      this.refreshCurrentView();
    };

    cancelBtn.onclick = () => {
      confirmDialog.close();
    };
  };

  displayProjectForm = () => {
    const addProjectBtn = document.querySelector('.add-project-btn');

    addProjectBtn.addEventListener('click', () => {
      this.projectDialog.showModal();
    });

    const closeProjectBtn = document.querySelector('.close-project-button');
    closeProjectBtn.addEventListener('click', () => {
      this.projectDialog.close();
      this.projectForm.reset();
      this.projectWarning.classList.remove('show');
    });
  };

  handleInputValidation() {
    const input = document.getElementById('project-name');
    const submitBtn = document.getElementById('project-form-add-button');

    input.addEventListener('change', () => {
      submitBtn.disabled = input.value.trim() == '';
      this.projectWarning.classList.remove('show');
    });
  }

  handleProjectFormSubmission() {
    let newProjectName = document.getElementById('project-name').value;

    this.projectWarning.classList.remove('show');

    const existingProject = ProjectController.getAllProjects().some(
      (project) => project.name === newProjectName
    );

    if (!existingProject) {
      ProjectController.addProject({ name: newProjectName });
      this.refreshCurrentView();
      this.renderSidebarProjects(newProjectName);
      this.projectDialog.close();
      this.projectForm.reset();
    } else {
      this.projectWarning.classList.add('show');
    }
  }

  renderSidebarProjects = (projectName) => {
    const projectList = document.querySelector('.project-list');

    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.setAttribute('data-project', projectName);

    const projectSVG = this.createSVGIcon(
      'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z',
      '#000000'
    );

    const projectTitle = document.createElement('span');
    projectTitle.classList.add('project-text');
    projectTitle.textContent = projectName;

    const badge = document.createElement('span');
    badge.classList.add('badge');

    projectList.appendChild(projectItem);
    projectItem.appendChild(projectSVG);
    projectItem.appendChild(projectTitle);
    projectItem.appendChild(badge);
  };

  renderCurrentProject = (currentProject) => {
    this.currentView = 'Project';
    this.currentProjectName = currentProject;
    this.clearElement(this.content);

    const selectedProject = ProjectController.getAllProjects().find(
      (project) => project.name === currentProject
    );

    if (!selectedProject) {
      console.error(`Project ${currentProject} is not found`);
      return;
    }

    const taskPairs = selectedProject.tasks.map((task) => ({
      task,
      project: selectedProject,
    }));
    this.createTaskGroup(selectedProject.name, taskPairs);

    const contentHeader = document.querySelector('.content-header');

    this.content.setAttribute('id', 'selected-project');
    contentHeader.textContent = selectedProject.name;
  };

  createSVGIcon = (pathData, color) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('height', '24px');
    svg.setAttribute('viewBox', '0 -960 960 960');
    svg.setAttribute('width', '24px');
    svg.setAttribute('fill', color);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    svg.appendChild(path);
    return svg;
  };

  updateTaskCount = (project) => {
    const taskGroups = document.querySelectorAll('.task-group');

    taskGroups.forEach((group) => {
      const title = group.querySelector('.task-group-title').textContent;
      if (title === project.name) {
        const countElement = group.querySelector('.task-count');
        const incompleteTaskCount = project.tasks.filter(
          (task) => task.status !== 'Complete'
        ).length;

        countElement.textContent =
          incompleteTaskCount === 0
            ? 'No Task'
            : `${incompleteTaskCount} ${incompleteTaskCount === 1 ? 'Task' : 'Tasks'}`;
      }
    });
  };

  updateAllBadges = () => {
    const allTasks = ProjectController.getAllProjects()
      .flatMap((proj) => proj.tasks)
      .filter((task) => task.status !== 'Complete');

    document.getElementById('badge-inbox').textContent = `${
      allTasks.length === 0 ? '' : allTasks.length
    }`;

    const today = format(startOfToday, 'yyyy-MM-dd');
    const todayTasks = allTasks.filter((task) => task.dueDate === today);
    document.getElementById('badge-today').textContent = `${
      todayTasks.length === 0 ? '' : todayTasks.length
    }`;

    const upcomingTasks = allTasks.filter((task) => task.dueDate > today);
    document.getElementById('badge-upcoming').textContent = `${
      upcomingTasks.length === 0 ? '' : upcomingTasks.length
    }`;

    const importantTasks = allTasks.filter((task) => task.priority === 'High');
    document.getElementById('badge-important').textContent = `${
      importantTasks.length === 0 ? '' : importantTasks.length
    }`;
  };

  editTask = (title, description, dueDate, priority) => {
    this.currentEditingTask.editTask(title, description, dueDate, priority);
  };

  createTask = (title, description, dueDate, priority) => {
    const newTask = Todo.createTask({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    });

    this.currentEditingProject.addTask(newTask);
    this.updateTaskCount(this.currentEditingProject);
  };

  resetDialog = () => {
    this.currentEditingProject = null;
    this.currentEditingTask = null;

    this.dialog.close();
    this.form.reset();
  };

  refreshCurrentView = () => {
    switch (this.currentView) {
      case 'Inbox':
        this.renderInboxDetails();
        break;
      case 'Today':
        this.renderTodayDetails();
        break;
      case 'Upcoming':
        this.renderUpcomingDetails();
        break;
      case 'Important':
        this.renderImportantDetails();
        break;
      case 'Project':
        this.renderCurrentProject(this.currentProjectName);
        break;
    }
  };

  handleTaskFormSubmit = () => {
    const newTaskTitle = document.getElementById('task-title').value;
    const newTaskDescription = document.getElementById('task-description').value;
    const newTaskDueDate = document.getElementById('task-date').value;
    const newTaskPriority = document.getElementById('task-priority').value;

    if (this.currentEditingProject && this.currentEditingTask) {
      this.editTask(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority);
    } else if (this.currentEditingProject) {
      this.createTask(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority);
    }

    ProjectController.saveProjects();
    this.resetDialog();
    this.refreshCurrentView();

    this.updateAllBadges();
  };
}
