// tasks.js
import { dragEnd,dragStart } from "./dragdrop.js";

export function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('kanbanTasks')) || {
        todo: [],
        inprogress: [],
        done: []
    };

    Object.keys(savedTasks).forEach(column => {
        const row = document.getElementById(column);
        savedTasks[column].forEach(taskText => {
            const task = createTask(taskText);
            row.appendChild(task);
        });
    });
}

export function saveTasks() {
    const tasks = {
        todo: getTasksFromColumn('todo'),
        inprogress: getTasksFromColumn('inprogress'),
        done: getTasksFromColumn('done')
    };
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    console.log("saved")
}

export function getTasksFromColumn(columnId) {
    const column = document.getElementById(columnId);
    return Array.from(column.querySelectorAll('.task > p')).map(task => task.innerText);
}

export function createTask(taskText) {
    const template = document.getElementById('task');
    const clone = document.importNode(template.content, true);

    const taskElement = clone.querySelector('.task');
    const taskParagraph = clone.querySelector('.task-text');
    taskParagraph.innerText = taskText;

    taskElement.setAttribute('draggable', true); // Enable drag-and-drop
    taskElement.addEventListener('dragstart', dragStart);
    taskElement.addEventListener('dragend', dragEnd);
    taskElement.querySelector('button').addEventListener('click', removeTask);

    return clone;
}

export function removeTask(event) {
    const task = event.target.closest('.task');
    task.remove();
    saveTasks();
}
