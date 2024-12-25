const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Fetch tasks from the server
async function fetchTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  taskList.innerHTML = ''; // Clear the list
  tasks.forEach(renderTask);
}

// Render a single task
function renderTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${task.completed ? 'line-through text-gray-400' : ''}">
      ${task.task}
    </span>
    <div>
      <button onclick="toggleTask(${task.id}, ${task.completed ? 0 : 1})"
              class="text-blue-500 mr-2">
        ${task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onclick="deleteTask(${task.id})"
              class="delete">
        Delete
      </button>
    </div>
  `;
  li.className = 'flex justify-between items-center p-2 border rounded-md';
  taskList.appendChild(li);
}

// Add a new task
addTaskBtn.addEventListener('click', async () => {
  const task = taskInput.value.trim();
  if (task === '') return alert('Please enter a task!');

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });
  const newTask = await res.json();
  renderTask(newTask);
  taskInput.value = '';
});

// Delete a task
async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Toggle task completion
async function toggleTask(id, completed) {
  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  fetchTasks();
}

// Load tasks on page load
fetchTasks();
