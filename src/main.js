import { Project } from "./modules/project";
import { Todo } from "./modules/todo";

document.addEventListener("DOMContentLoaded", () => {
  const school = new Project();
  const homework = Todo.createTask({
    title: "Complete Homework",
    description: "Submit create task by midnight",
    dueDate: "2025-04-30",
    priority: "High",
  });
  school.addTask(homework);
});
