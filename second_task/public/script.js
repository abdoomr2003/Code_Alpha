const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const descriptionInput = document.getElementById("descriptionInput");
const prioritySelect = document.getElementById("prioritySelect");
const taskList = document.getElementById("taskList");

const fetchTasks = async () => {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  renderTasks(tasks);
};

const renderTasks = (tasks) => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "p-4 rounded-lg border flex flex-col";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = task.completed ? "line-through text-gray-500 font-bold" : "text-gray-800 font-bold";

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;
    taskDescription.className = "text-gray-600";

    const taskPriority = document.createElement("span");
    taskPriority.textContent = `Priority: ${task.priority}`;
    taskPriority.className = "text-sm text-blue-500 mt-2";

    const buttons = document.createElement("div");
    buttons.className = "flex gap-2 mt-4";

    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.completed ? "Undo" : "Complete";
    toggleButton.className = "bg-green-500 text-white px-4 py-2 rounded-lg";
    toggleButton.onclick = async () => {
      await fetch(`/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      fetchTasks();
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "bg-red-500 text-white px-4 py-2 rounded-lg";
    deleteButton.onclick = async () => {
      await fetch(`/tasks/${task.id}`, { method: "DELETE" });
      fetchTasks();
    };

    buttons.append(toggleButton, deleteButton);
    taskItem.append(taskText, taskDescription, taskPriority, buttons);
    taskList.appendChild(taskItem);
  });
};

taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const newTask = {
    text: taskInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value,
  };
  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  taskInput.value = "";
  descriptionInput.value = "";
  prioritySelect.value = "medium";
  fetchTasks();
};

fetchTasks();
