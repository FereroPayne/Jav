import './style.css';
import type { Task } from './types';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <main class="todo-app">
    <h1>Todo List</h1>
    <form id="task-form">
      <input id="task-input" type="text" placeholder="Nouvelle tâche..." autocomplete="off" required />
      <button type="submit">Ajouter</button>
    </form>
    <ul id="task-list"></ul>
  </main>
`;

const form = document.querySelector<HTMLFormElement>('#task-form')!;
const input = document.querySelector<HTMLInputElement>('#task-input')!;
const list = document.querySelector<HTMLUListElement>('#task-list')!;

function renderTasks(tasks: Task[]) {
    list.innerHTML = '';

    for (const task of tasks) {
        const item = document.createElement('li');
        item.className = 'task-item';
        item.dataset.id = String(task.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done !== 0;
        checkbox.addEventListener('change', () => onToggleDone(task, checkbox.checked));

        const content = document.createElement('span');
        content.className = 'task-content';
        content.textContent = task.content;
        if (task.done) content.classList.add('done');
        content.addEventListener('dblclick', () => onEditTask(task, content));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.type = 'button';
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => onDeleteTask(task.id, item));

        item.append(checkbox, content, deleteButton);
        list.appendChild(item);
    }
}

async function loadTasks() {
    const tasks = await fetchTasks();
    renderTasks(tasks);
}

async function onToggleDone(task: Task, checked: boolean) {
    await updateTask(task.id, task.content, checked ? 1 : 0);
    await loadTasks();
}

function onEditTask(task: Task, content: HTMLSpanElement) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.content;
    editInput.className = 'edit-input';

    content.replaceWith(editInput);
    editInput.focus();

    const save = async () => {
        const newContent = editInput.value.trim();
        if (newContent && newContent !== task.content) {
            await updateTask(task.id, newContent, task.done);
        }
        await loadTasks();
    };

    editInput.addEventListener('blur', save);
    editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') editInput.blur();
    });
}

async function onDeleteTask(id: number, item: HTMLLIElement) {
    await deleteTask(id);
    item.remove();
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content) return;

    await createTask(content);
    input.value = '';
    await loadTasks();
});

loadTasks();
