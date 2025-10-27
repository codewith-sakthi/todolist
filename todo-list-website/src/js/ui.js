/* UI helpers (plain script) - exposes render functions and uses global callbacks
   main.js wires events and provides onDelete/onToggle handlers which UI will call.
*/
(function () {
    const todoListEl = document.getElementById('todo-list');

    function clearTodoList() {
        if (todoListEl) todoListEl.innerHTML = '';
    }

    function renderTodoItem(todo, index) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.checked = !!todo.completed;
        toggle.setAttribute('aria-label', 'Toggle todo');
        toggle.addEventListener('change', () => {
            if (typeof window.onToggle === 'function') window.onToggle(index);
        });

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        if (todo.completed) text.classList.add('completed');

        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'todo-delete';
        del.setAttribute('aria-label', 'Delete todo');
        del.textContent = '×';
        del.addEventListener('click', () => {
            if (typeof window.onDelete === 'function') window.onDelete(index);
        });

        li.appendChild(toggle);
        li.appendChild(text);
        li.appendChild(del);
        // Stagger a subtle entrance animation for nicer UX
        li.classList.add('animate-in');
        li.style.animationDelay = (index * 35) + 'ms';
        todoListEl.appendChild(li);
        // Remove the class after animation completes so future toggles behave normally
        setTimeout(() => li.classList.remove('animate-in'), 600 + index * 35);
    }

    function renderTodos(todos) {
        clearTodoList();
        if (!Array.isArray(todos)) return;
        todos.forEach((t, i) => renderTodoItem(t, i));
    }

    // Export helpers
    window.renderTodos = renderTodos;
    window.clearTodoList = clearTodoList;
    window.renderTodoItem = renderTodoItem;
})();