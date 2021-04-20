const form = document.querySelector('#todo-form');
const todoList = document.querySelector('.check-group');
const todoInput = document.querySelector('#todo-input');
const allControlLinks = document.querySelectorAll('.controls');
const tglBtn = document.querySelector('.tgl-btn');
const mdquery = window.matchMedia('(max-width: 630px)');
const hiddenCard = document.querySelector('#hidden');
const controls = document.querySelector('.controls');
const clearCompleted = document.querySelector('.clear-completed');
//Load Events
loadEvents();
//Load events Function
function loadEvents() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTodo);
  todoList.addEventListener('click', removeTask);
  tglBtn.addEventListener('click', lightMode);
  clearCompleted.addEventListener('click', clearCompletedTodo);
}

//Get Tasks from LS
function getTasks(event) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    //create input element
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.id = 'cbox';
    check.value = 'first-checkbox';
    check.style.cursor = 'pointer';
    //create label elememt
    const label = document.createElement('label');
    label.htmlFor = 'cbox';
    label.id = 'label-id';
    //label text
    const labelText = document.createTextNode(task);
    label.style.cursor = 'pointer';
    //append text to label
    label.appendChild(labelText);

    //create span
    const span = document.createElement('span');
    //Add class to span
    span.className = 'deleted left-auto';
    //Add inner HTML to span
    span.innerHTML = `<a href = '#'><img src="./img/icon-cross.svg"/></a>`;
    //Create Div
    const div = document.createElement('div');
    div.id = 'checkbox-id';
    //append input and label to div
    div.appendChild(check);
    div.appendChild(label);
    //create li
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-center';
    li.appendChild(div);
    li.appendChild(span);
    countItems();
    checkBoxes();
    todoList.appendChild(li);
  });
}
//  Link Event Listener
for (let i = 0; i < allControlLinks.length; i++) {
  let currentLink = allControlLinks[i];
  currentLink.addEventListener('click', linkControl);
}

//Counter Function
function countItems() {
  const lis = document.querySelectorAll('.list-group-item');
  const itemsLeft = document.querySelector('.items-left');
  itemsLeft.textContent = `${lis.length} Items Left`;
}
//Uncount function
function unCountItems() {
  const lis = document.querySelectorAll('.list-group-item');
  const itemsLeft = document.querySelector('.items-left');
  itemsLeft.textContent = `${lis.length - 1} Items Left`;
}
//Uncount and Count checkBox
function checkBoxes() {
  const boxes = document.querySelectorAll('#cbox');
  const itemsLeft = document.querySelector('.items-left');
  const lis = document.querySelectorAll('.list-group-item');
  let liLength = lis.length;
  for (let i = 0; i < boxes.length; i++) {
    const currentBox = boxes[i];
    currentBox.addEventListener('change', function (event) {
      if (this.checked) {
        itemsLeft.textContent = `${(liLength -= 1)} Items Left`;
      } else {
        itemsLeft.textContent = `${(liLength += 1)} Items Left`;
      }
    });
  }
}

//Link control
function linkControl(event) {
  let theList = todoList;
  let lis = theList.children;
  if (event.target.className === 'all') {
    for (let i = 0; i < lis.length; i++) {
      let displayNone = lis[i];
      if (displayNone.classList.contains('d-none')) {
        displayNone.classList =
          'list-group-item d-flex justify-content-between align-items-center';
      }
    }
  } else if (event.target.className === 'active-now') {
    for (let i = 0; i < lis.length; i++) {
      let currLi = lis[i];
      for (let j = 0; j < currLi.children.length; j++) {
        let liChildren = currLi.children[j];
        if (liChildren.id === 'checkbox-id') {
          let divCboxId = liChildren;
          if (divCboxId.firstChild.checked) {
            divCboxId.parentElement.classList = 'd-none';
          }
        }
      }
    }
  } else if (event.target.className === 'completed') {
    for (let i = 0; i < lis.length; i++) {
      let currLi = lis[i];
      for (let j = 0; j < currLi.children.length; j++) {
        let liChildren = currLi.children[j];
        if (liChildren.id === 'checkbox-id') {
          let divCboxId = liChildren;
          if (divCboxId.firstChild.checked) {
            divCboxId.parentElement.classList =
              'list-group-item d-flex justify-content-between align-items-center';
          } else {
            divCboxId.parentElement.classList = 'd-none';
          }
        }
      }
    }
  }
  event.preventDefault();
}

//Add Todo
function addTodo(event) {
  if (todoInput.value === '') {
    alert('Add todo');
  }
  //create input element
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.id = 'cbox';
  check.value = 'first-checkbox';
  check.style.cursor = 'pointer';
  //create label elememt
  const label = document.createElement('label');
  label.htmlFor = 'cbox';
  label.id = 'label-id';
  //label text
  const labelText = document.createTextNode(todoInput.value);
  label.style.cursor = 'pointer';
  //append text to label
  label.appendChild(labelText);

  //create span
  const span = document.createElement('span');
  //Add class to span
  span.className = 'deleted left-auto';
  //Add inner HTML to span
  span.innerHTML = `<a href = '#'><img src="./img/icon-cross.svg"/></a>`;
  //Create Div
  const div = document.createElement('div');
  div.id = 'checkbox-id';
  //append input and label to div
  div.appendChild(check);
  div.appendChild(label);
  //create li
  const li = document.createElement('li');
  li.className =
    'list-group-item d-flex justify-content-between align-items-center';
  li.appendChild(div);
  li.appendChild(span);
  todoList.appendChild(li);
  countItems();
  checkBoxes();
  storeinLS(todoInput.value);
  todoInput.value = '';
  event.preventDefault();
}
//Store in LS
function storeinLS(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(event) {
  if (
    event.target.parentElement.parentElement.classList.contains(
      'deleted'
    )
  ) {
    event.target.parentElement.parentElement.parentElement.remove();
    countItems();
    removeFromLs(
      event.target.parentElement.parentElement.parentElement
    );
  }
}
//Remove from LS
function removeFromLs(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear Completed
function clearCompletedTodo(event) {
  const lis = document.querySelectorAll('.list-group-item');
  for (let i = 0; i < lis.length; i++) {
    const liElement = lis[i];
    for (let j = 0; j < liElement.children.length; j++) {
      if (liElement.children[j].id === 'checkbox-id') {
        let divCheckBoxId = liElement.children[j];
        if (divCheckBoxId.firstChild.checked) {
          divCheckBoxId.parentElement.remove();
        }
      }
    }
  }
  event.preventDefault();
}
//Toggle LightMode
function lightMode(event) {
  var element = document.body;
  element.classList.toggle('light-mode');
}

//Handle Media Query
function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    hiddenCard.style.display = 'block';
    controls.style.display = 'none';
  } else {
    hiddenCard.style.display = 'none';
    controls.style.display = 'block';
  }
}

// Register event listener
mdquery.addListener(handleTabletChange);

// Initial check
handleTabletChange(mdquery);
