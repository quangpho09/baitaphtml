// ============================================
// TODO APP - DOM Manipulation & Events
// ============================================

// State
const todoApp = {
    todos: [],
    currentFilter: 'all',
    
    // DOM Elements
    form: document.querySelector('#todoForm'),
    input: document.querySelector('#todoInput'),
    todoList: document.querySelector('#todoList'),
    emptyState: document.querySelector('#emptyState'),
    itemsLeftSpan: document.querySelector('#itemsLeft'),
    clearCompletedBtn: document.querySelector('#clearCompleted'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    
    // Initialize
    init() {
        this.loadFromLocalStorage();
        this.render();
        this.attachEventListeners();
    },
    
    // ========== EVENT LISTENERS ==========
    attachEventListeners() {
        // Form submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });
        
        // Event Delegation - Click events trên todoList
        this.todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            
            if (!todoItem) return;
            
            // Click vào delete button
            if (e.target.classList.contains('btn-delete')) {
                const id = parseInt(todoItem.dataset.id);
                this.deleteTodo(id);
            }
            // Click vào edit button
            else if (e.target.classList.contains('btn-edit')) {
                const id = parseInt(todoItem.dataset.id);
                this.startEditTodo(id);
            }
            // Click vào save button
            else if (e.target.classList.contains('btn-save')) {
                const id = parseInt(todoItem.dataset.id);
                this.saveEditTodo(id);
            }
            // Click vào cancel button
            else if (e.target.classList.contains('btn-cancel')) {
                const id = parseInt(todoItem.dataset.id);
                this.cancelEditTodo(id);
            }
            // Click vào text để toggle completed (nhưng không khi đang edit)
            else if (!todoItem.classList.contains('editing') && 
                     e.target.classList.contains('todo-text')) {
                const id = parseInt(todoItem.dataset.id);
                this.toggleTodo(id);
            }
        });
        
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
        
        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });
        
        // Keyboard: Escape để cancel edit
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const editing = this.todoList.querySelector('.todo-item.editing');
                if (editing) {
                    const id = parseInt(editing.dataset.id);
                    this.cancelEditTodo(id);
                }
            }
        });
    },
    
    // ========== CRUD OPERATIONS ==========
    addTodo() {
        const text = this.input.value.trim();
        
        if (!text) {
            alert('Vui lòng nhập công việc!');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString('vi-VN')
        };
        
        this.todos.push(todo);
        this.input.value = '';
        this.input.focus();
        
        this.saveToLocalStorage();
        this.render();
    },
    
    deleteTodo(id) {
        if (confirm('Bạn chắc chắn muốn xóa?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage();
            this.render();
        }
    },
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToLocalStorage();
            this.render();
        }
    },
    
    startEditTodo(id) {
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        const todo = this.todos.find(t => t.id === id);
        
        if (!todo) return;
        
        todoItem.classList.add('editing');
        
        const textSpan = todoItem.querySelector('.todo-text');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-edit-input';
        input.value = todo.text;
        
        // Replace text with input
        textSpan.replaceWith(input);
        input.focus();
        input.select();
        
        // Auto-save trên Enter
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.saveEditTodo(id);
            }
        });
    },
    
    saveEditTodo(id) {
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        const input = todoItem.querySelector('.todo-edit-input');
        const newText = input.value.trim();
        
        if (!newText) {
            alert('Công việc không thể rỗng!');
            return;
        }
        
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = newText;
            this.saveToLocalStorage();
            this.render();
        }
    },
    
    cancelEditTodo(id) {
        this.render();
    },
    
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('Không có công việc đã hoàn thành!');
            return;
        }
        
        if (confirm(`Xóa ${completedCount} công việc đã hoàn thành?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToLocalStorage();
            this.render();
        }
    },
    
    // ========== RENDER ==========
    render() {
        const filtered = this.getFilteredTodos();
        const itemsLeft = this.todos.filter(t => !t.completed).length;
        
        // Clear list
        this.todoList.innerHTML = '';
        
        // Render items
        if (filtered.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            filtered.forEach(todo => {
                const li = this.createTodoElement(todo);
                this.todoList.appendChild(li);
            });
        }
        
        // Update counter
        this.itemsLeftSpan.textContent = `${itemsLeft} items left`;
    },
    
    getFilteredTodos() {
        switch(this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    },
    
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) li.classList.add('completed');
        li.dataset.id = todo.id;
        
        // Text span
        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todo.text;
        
        // Actions container
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-edit';
        editBtn.textContent = '✏️ Sửa';
        editBtn.type = 'button';
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.textContent = '❌ Xóa';
        deleteBtn.type = 'button';
        
        // Append buttons
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        // Append elements to li
        li.appendChild(textSpan);
        li.appendChild(actions);
        
        return li;
    },
    
    // ========== LOCALSTORAGE ==========
    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    
    loadFromLocalStorage() {
        const stored = localStorage.getItem('todos');
        if (stored) {
            try {
                this.todos = JSON.parse(stored);
            } catch (e) {
                console.error('Lỗi khi parse localStorage:', e);
                this.todos = [];
            }
        }
    }
};

// ========== START APP ==========
document.addEventListener('DOMContentLoaded', () => {
    todoApp.init();
});
