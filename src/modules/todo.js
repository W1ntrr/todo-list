export class Todo {
  constructor(title, description, dueDate, priority, isCompleted = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }

  static createTask({ title, description, dueDate, priority, isCompleted }) {
    return new Todo(title, description, dueDate, priority, isCompleted);
  }
}
