const STORAGE_KEY = "todo-items";

const taskInput = document.querySelector("#task-input");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");
const reminderInput = document.querySelector("#reminder-date");
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
let editingId = null;

const formatDate = (value) => {
  if (!value) {
    return "";
  }
  return value;
};

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const renderTasks = () => {
  taskList.innerHTML = "";

  const pendingTasks = tasks.filter((task) => !task.completed);

  if (pendingTasks.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  pendingTasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = `task${task.completed ? " task--completed" : ""}${
      editingId === task.id ? " task--editing" : ""
    }`;

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

    const content = document.createElement("div");

    if (editingId === task.id) {
      const editFields = document.createElement("div");
      editFields.className = "task__edit-fields";

      const editText = document.createElement("input");
      editText.type = "text";
      editText.className = "task__edit-input";
      editText.value = task.text;

      const editStart = document.createElement("input");
      editStart.type = "date";
      editStart.className = "task__edit-input";
      editStart.value = task.startDate || "";

      const editEnd = document.createElement("input");
      editEnd.type = "date";
      editEnd.className = "task__edit-input";
      editEnd.value = task.endDate || "";

      const editReminder = document.createElement("input");
      editReminder.type = "datetime-local";
      editReminder.className = "task__edit-input";
      editReminder.value = task.reminder || "";

      editFields.append(editText, editStart, editEnd, editReminder);
      content.appendChild(editFields);

      const actions = document.createElement("div");
      actions.className = "task__actions";

      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.className = "task__button task__edit";
      saveButton.textContent = "Guardar";
      saveButton.addEventListener("click", () => {
        const trimmed = editText.value.trim();
        if (!trimmed) {
          editText.focus();
          return;
        }
        tasks = tasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                text: trimmed,
                startDate: editStart.value,
                endDate: editEnd.value,
                reminder: editReminder.value,
              }
            : item
        );
        editingId = null;
        saveTasks(tasks);
        renderTasks();
      });

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = "task__button task__delete";
      cancelButton.textContent = "Cancelar";
      cancelButton.addEventListener("click", () => {
        editingId = null;
        renderTasks();
      });

      actions.append(saveButton, cancelButton);
      listItem.append(toggle, content, actions);
    } else {
      const text = document.createElement("div");
      const title = document.createElement("span");
      title.className = "task__text";
      title.textContent = task.text;
      text.appendChild(title);

      const meta = document.createElement("div");
      meta.className = "task__meta";

      const startLabel = formatDate(task.startDate);
      const endLabel = formatDate(task.endDate);
      const reminderLabel = formatDateTime(task.reminder);

      if (startLabel) {
        const start = document.createElement("span");
        start.textContent = `Inicio: ${startLabel}`;
        meta.appendChild(start);
      }

      if (endLabel) {
        const end = document.createElement("span");
        end.textContent = `Fin: ${endLabel}`;
        meta.appendChild(end);
      }

      if (reminderLabel) {
        const reminder = document.createElement("span");
        reminder.textContent = `Recordatorio: ${reminderLabel}`;
        meta.appendChild(reminder);
      }

      if (meta.children.length > 0) {
        text.appendChild(meta);
      }

      content.appendChild(text);

      const actions = document.createElement("div");
      actions.className = "task__actions";

      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "task__button task__edit";
      editButton.textContent = "Editar";
      editButton.addEventListener("click", () => {
        editingId = task.id;
        renderTasks();
      });

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "task__button task__delete";
      remove.textContent = "Eliminar";
      remove.addEventListener("click", () => {
        tasks = tasks.filter((item) => item.id !== task.id);
        saveTasks(tasks);
        renderTasks();
      });

      actions.append(editButton, remove);
      listItem.append(toggle, content, actions);
    }

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
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    reminder: reminderInput.value,
  };

  tasks = [newTask, ...tasks];
  saveTasks(tasks);
  taskInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  reminderInput.value = "";
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
