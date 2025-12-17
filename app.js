const taskForm = document.getElementById('task-form');
const taskFormSection = document.getElementById('task-form-section');
const showFormBtn = document.getElementById('show-form-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const formTitle = document.getElementById('form-title');

const columnPending = document.getElementById('column-pending');
const columnCompleted = document.getElementById('column-completed');
const columnOverdue = document.getElementById('column-overdue');

const filterPriority = document.getElementById('filter-priority');
const sortDateBtn = document.getElementById('sort-date-btn');
const sortPriorityBtn = document.getElementById('sort-priority-btn');
const searchInput = document.getElementById('search-input');

const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskSubjectInput = document.getElementById('task-subject');
const taskDueDateInput = document.getElementById('task-due-date');
const taskPriorityInput = document.getElementById('task-priority');
const taskStatusInput = document.getElementById('task-status');
const taskDescriptionInput = document.getElementById('task-description');

let tasks = [];
let isEditing = false;
let sortDateDirection = 'asc';
let sortPriorityDirection = 'asc';
let currentSortFunction = sortByDate;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    try {
        const storedTasks = localStorage.getItem('tasks');
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
        if (!Array.isArray(tasks)) tasks = [];
    } catch {
        tasks = [];
    }
    renderTasks();
}

function toggleForm(show, editing = false) {
    taskFormSection.style.display = show ? 'block' : 'none';
    showFormBtn.style.display = show ? 'none' : 'inline-flex';
    isEditing = editing;

    formTitle.textContent = editing ? 'Editar Tarea' : 'Registrar Nueva Tarea';

    if (!show) {
        taskForm.reset();
        taskIdInput.value = '';
    }
}

function handleTaskSubmit(e) {
    e.preventDefault();

    const taskData = {
        id: isEditing ? Number(taskIdInput.value) : Date.now(),
        title: taskTitleInput.value.trim(),
        subject: taskSubjectInput.value.trim(),
        dueDate: taskDueDateInput.value,
        priority: taskPriorityInput.value,
        status: taskStatusInput.value,
        description: taskDescriptionInput.value.trim()
    };

    if (isEditing) {
        const index = tasks.findIndex(t => t.id === taskData.id);
        if (index !== -1) tasks[index] = taskData;
    } else {
        tasks.push(taskData);
    }

    saveTasks();
    renderTasks();
    toggleForm(false);
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    taskIdInput.value = task.id;
    taskTitleInput.value = task.title;
    taskSubjectInput.value = task.subject;
    taskDueDateInput.value = task.dueDate;
    taskPriorityInput.value = task.priority;
    taskStatusInput.value = task.status;
    taskDescriptionInput.value = task.description;

    toggleForm(true, true);
}

function deleteTask(id) {
    if (confirm('¿Eliminar esta tarea?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

function formatDate(date) {
    if (!date) return '';
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
}

function createTaskCard(task) {
    return `
        <div class="task-card" draggable="true" data-id="${task.id}">
            <div class="task-card-header">
                <span class="badge priority ${task.priority.toLowerCase()}">${task.priority}</span>
                <div class="task-actions">
                    <button onclick="editTask(${task.id})">✏️</button>
                    <button onclick="deleteTask(${task.id})">🗑️</button>
                </div>
            </div>

            <h4 class="task-title">${task.title}</h4>
            <p class="task-subject">${task.subject}</p>
            <p class="task-description">${task.description}</p>

            <div class="task-footer">
                <span class="badge status ${task.status.toLowerCase()}">${task.status}</span>
                <small>${formatDate(task.dueDate)}</small>
            </div>
        </div>
    `;
}

function renderTasks() {
    columnPending.innerHTML = columnPending.querySelector('h3').outerHTML;
    columnCompleted.innerHTML = columnCompleted.querySelector('h3').outerHTML;
    columnOverdue.innerHTML = columnOverdue.querySelector('h3').outerHTML;

    let filtered = [...tasks];

    const term = searchInput.value.toLowerCase();
    if (term) {
        filtered = filtered.filter(t =>
            t.title.toLowerCase().includes(term) ||
            t.subject.toLowerCase().includes(term) ||
            t.description.toLowerCase().includes(term)
        );
    }

    if (filterPriority.value) {
        filtered = filtered.filter(t => t.priority === filterPriority.value);
    }

    filtered.sort(currentSortFunction);

    let count = { Pendiente: 0, Entregada: 0, Retrasada: 0 };

    filtered.forEach(task => {
        const card = createTaskCard(task);
        if (task.status === 'Pendiente') {
            columnPending.innerHTML += card;
            count.Pendiente++;
        } else if (task.status === 'Entregada') {
            columnCompleted.innerHTML += card;
            count.Entregada++;
        } else {
            columnOverdue.innerHTML += card;
            count.Retrasada++;
        }
    });

    document.getElementById('count-pending').textContent = count.Pendiente;
    document.getElementById('count-completed').textContent = count.Entregada;
    document.getElementById('count-overdue').textContent = count.Retrasada;

    setupDragAndDrop();
}

function sortByDate(a, b) {
    return (new Date(a.dueDate) - new Date(b.dueDate)) *
        (sortDateDirection === 'asc' ? 1 : -1);
}

function sortByPriority(a, b) {
    const map = { Alta: 3, Media: 2, Baja: 1 };
    return (map[b.priority] - map[a.priority]) *
        (sortPriorityDirection === 'asc' ? 1 : -1);
}

sortDateBtn.addEventListener('click', () => {
    sortDateDirection = sortDateDirection === 'asc' ? 'desc' : 'asc';
    currentSortFunction = sortByDate;
    renderTasks();
});

sortPriorityBtn.addEventListener('click', () => {
    sortPriorityDirection = sortPriorityDirection === 'asc' ? 'desc' : 'asc';
    currentSortFunction = sortByPriority;
    renderTasks();
});

function setupDragAndDrop() {
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('dragstart', e => {
            e.dataTransfer.setData('id', card.dataset.id);
        });
    });

    document.querySelectorAll('.task-column').forEach(column => {
        column.addEventListener('dragover', e => e.preventDefault());
        column.addEventListener('drop', e => {
            const id = Number(e.dataTransfer.getData('id'));
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            if (column.id === 'column-pending') task.status = 'Pendiente';
            if (column.id === 'column-completed') task.status = 'Entregada';
            if (column.id === 'column-overdue') task.status = 'Retrasada';

            saveTasks();
            renderTasks();
        });
    });
}

showFormBtn.addEventListener('click', () => toggleForm(true));
cancelEditBtn.addEventListener('click', () => toggleForm(false));
taskForm.addEventListener('submit', handleTaskSubmit);
filterPriority.addEventListener('change', renderTasks);
searchInput.addEventListener('input', renderTasks);

document.addEventListener('DOMContentLoaded', loadTasks);
