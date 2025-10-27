// Main JavaScript file for the Todo List application

// Wire up UI and storage after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');

    if (addButton) addButton.addEventListener('click', addTodo);

    // Allow Enter key to add
    if (todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });
    }

    // Provide callbacks used by ui.js
    window.onDelete = deleteTodo;
    window.onToggle = toggleTodo;

    // Initial render
    renderStoredTodos();
});

function renderStoredTodos() {
    const todos = window.getTodos ? window.getTodos() : [];
    if (typeof window.renderTodos === 'function') window.renderTodos(todos);
    // Toggle empty state visibility
    const emptyEl = document.getElementById('empty-state');
    if (emptyEl) emptyEl.style.display = (todos && todos.length) ? 'none' : 'block';
}

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    if (!todoInput) return;
    const text = todoInput.value.trim();
    if (!text) return;

    const todos = window.getTodos ? window.getTodos() : [];
    todos.push({ text, completed: false });
    if (typeof window.saveTodos === 'function') window.saveTodos(todos);

    if (typeof window.renderTodos === 'function') window.renderTodos(todos);
    todoInput.value = '';
}

function deleteTodo(index) {
    const todos = window.getTodos ? window.getTodos() : [];
    if (index < 0 || index >= todos.length) return;
    todos.splice(index, 1);
    if (typeof window.saveTodos === 'function') window.saveTodos(todos);
    if (typeof window.renderTodos === 'function') window.renderTodos(todos);
    const emptyEl = document.getElementById('empty-state');
    if (emptyEl) emptyEl.style.display = (todos && todos.length) ? 'none' : 'block';
}

function toggleTodo(index) {
    const todos = window.getTodos ? window.getTodos() : [];
    if (index < 0 || index >= todos.length) return;
    todos[index].completed = !todos[index].completed;
    if (typeof window.saveTodos === 'function') window.saveTodos(todos);
    if (typeof window.renderTodos === 'function') window.renderTodos(todos);
    const emptyEl = document.getElementById('empty-state');
    if (emptyEl) emptyEl.style.display = (todos && todos.length) ? 'none' : 'block';
}