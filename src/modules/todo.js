export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = 'Incomplete';
  }

  static createTask({ title, description, dueDate, priority, status }) {
    return new Todo(title, description, dueDate, priority, status);
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
