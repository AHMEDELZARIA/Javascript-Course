const todoList = JSON.parse(localStorage.getItem('todo')) || [];

renderTodoList();

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

document.body
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html =  `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">
        Delete
      </button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveTodoList();
      });
    });
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  if (name.length === 0) {
    console.log('No Todo entered');
    return;
  }

  const dateInputElement = document.querySelector('.js-due-date-input');
  let dueDate = dateInputElement.value;
  
  // Reformat the date and time
  if (dueDate) {
    const [ date, time ] = dueDate.split('T');
    const formatedTime = convertTo12hour(time);
    dueDate = `${date} at ${formatedTime}`;
  }

  todoList.push({name, dueDate});

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
  saveTodoList();
}

function saveTodoList() {
  localStorage.setItem('todo', JSON.stringify(todoList));
}

function convertTo12hour(time) {
  let [ hours, minutes ] = time.split(':');
  let period = "AM";
  
  hours = parseInt(hours);
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${period}`;
}
