// dragdrop.js

import { saveTasks } from './tasks.js';

let draggedTask = null;

export function initializeDragAndDrop() {
    const rows = document.querySelectorAll('.row');

    rows.forEach(row => {
        row.addEventListener('dragover', dragOver);
        row.addEventListener('dragenter', dragEnter);
        row.addEventListener('dragleave', dragLeave);
        row.addEventListener('drop', drop);
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
    draggedTask = null;
    saveTasks();
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = '#e6e6e6';
}

function dragLeave() {
    this.style.backgroundColor = '#fff';
}

function drop() {
    this.style.backgroundColor = '#fff';
    if (draggedTask) {
        this.appendChild(draggedTask);
    }
    saveTasks();
}
