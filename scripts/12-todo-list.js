const todoList = JSON.parse(localStorage.getItem('todo')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index) {
    const { name, dueDate } = todoObject;
    const html =  `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${index}, 1);
        renderTodoList();
        saveTodoList();
      " class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  if (name.length === 0) {
    console.log('No Todo entered');
    return;
  }

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({name, dueDate});

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
  saveTodoList();
}

function saveTodoList() {
  localStorage.setItem('todo', JSON.stringify(todoList));
}


