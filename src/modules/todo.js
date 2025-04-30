export default class Todo {
  constructor(id = crypto.randomUUID(), title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = 'Incomplete';
  }

  static createTask({ id, title, description, dueDate, priority, status }) {
    return new Todo(id, title, description, dueDate, priority, status);
  }

  toggleStatus() {
    this.status = this.status === 'Incomplete' ? 'Complete' : 'Incomplete';
  }

  editTask(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
