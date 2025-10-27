// Simple storage wrapper using localStorage (no modules so we expose globals)
const STORAGE_KEY = 'todoItems';

function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getTodos() {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
}

function clearTodos() {
    localStorage.removeItem(STORAGE_KEY);
}

// Expose to global scope so other non-module scripts can use them
window.saveTodos = saveTodos;
window.getTodos = getTodos;
window.clearTodos = clearTodos;