import { saveTasks } from './tasks.js';
let draggedTask = null;
let placeholder = document.createElement('div');
placeholder.className = 'placeholder';

export function initializeDragAndDrop() {
    const rows = document.querySelectorAll('.row');

    rows.forEach(row => {
        row.addEventListener('dragover', dragOver);
        row.addEventListener('drop', drop);
    });

    // Initialize event listeners for tasks
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });
}

export function dragStart() {
    draggedTask = this;
    this.classList.add('dragging');
    setTimeout(() => (this.style.display = 'none'), 0);
}

export function dragEnd() {
    this.style.display = 'block';
    this.classList.remove('dragging');
    if (placeholder.parentNode) {
        placeholder.parentNode.removeChild(placeholder);
    }
    draggedTask = null;
    saveTasks();
}

function dragOver(e) {
    e.preventDefault();
    const targetTask = e.target.closest('.task');

    // Place placeholder at appropriate position within the row
    if (targetTask && targetTask !== draggedTask) {
        const row = targetTask.parentNode;
        const bounding = targetTask.getBoundingClientRect();
        const offset = e.clientY - bounding.top;

        if (offset > bounding.height / 2) {
            row.insertBefore(placeholder, targetTask.nextSibling);
        } else {
            row.insertBefore(placeholder, targetTask);
        }
    } else if (!targetTask) {
        // If dragging over empty space in a row, append placeholder at the end
        const row = e.currentTarget;
        row.appendChild(placeholder);
    }
}

function drop(e) {
    e.preventDefault();

    if (draggedTask) {
        // Move dragged task to the location of the placeholder
        if (placeholder.parentNode) {
            placeholder.parentNode.replaceChild(draggedTask, placeholder);
        }
        draggedTask.style.display = 'block';
        draggedTask.classList.remove('dragging');
        saveTasks();
    }
}
