let draggedTask = null;

export function initializeDragAndDrop() {
    const rows = document.querySelectorAll('.row');

    rows.forEach(row => {
        row.addEventListener('dragover', dragOver);
        row.addEventListener('drop', drop);
    });

    // Add event listeners to each task
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
    draggedTask = null;
    saveTasks();
}

function dragOver(e) {
    e.preventDefault();

    // Find the task being dragged over
    const targetTask = e.target.closest('.task');
    if (targetTask && targetTask !== draggedTask) {
        const row = targetTask.parentNode;
        const bounding = targetTask.getBoundingClientRect();
        const offset = e.clientY - bounding.top;

        // Determine the insertion point: before or after the target
        if (offset > bounding.height / 2) {
            row.insertBefore(draggedTask, targetTask.nextSibling);
        } else {
            row.insertBefore(draggedTask, targetTask);
        }
    }
}

function drop(e) {
    e.preventDefault();
    if (draggedTask) {
        draggedTask.style.display = 'block';
        draggedTask.classList.remove('dragging');
        saveTasks();
    }
}
