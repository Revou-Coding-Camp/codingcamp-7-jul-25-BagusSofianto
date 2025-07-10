const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) return;

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

deleteAllBtn.addEventListener("click", function () {
  todos = [];
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "Done" : "Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

renderTodos();