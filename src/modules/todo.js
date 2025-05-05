export default class Todo {
  constructor(
    id = crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    status = 'Incomplete'
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  static createTask({
    id,
    title,
    description,
    dueDate,
    priority,
    status = 'Incomplete',
  }) {
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
