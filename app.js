const STORAGE_KEY = "todo-items";

const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

const loadTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("No se pudo leer el almacenamiento local", error);
  }

  return [];
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

let tasks = loadTasks();

const renderTasks = () => {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = `task${task.completed ? " task--completed" : ""}`;

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "task__toggle";
    toggle.checked = task.completed;
    toggle.setAttribute("aria-label", "Marcar tarea como completada");
    toggle.addEventListener("change", () => {
      tasks = tasks.map((item) =>
        item.id === task.id ? { ...item, completed: !item.completed } : item
      );
      saveTasks(tasks);
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "task__text";
    text.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "task__delete";
    remove.textContent = "Eliminar";
    remove.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks(tasks);
      renderTasks();
    });

    listItem.append(toggle, text, remove);
    taskList.appendChild(listItem);
  });
};

const addTask = () => {
  const value = taskInput.value.trim();
  if (!value) {
    taskInput.focus();
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    text: value,
    completed: false,
  };

  tasks = [newTask, ...tasks];
  saveTasks(tasks);
  taskInput.value = "";
  taskInput.focus();
  renderTasks();
};

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
