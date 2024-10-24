// modal.js

import { createTask, saveTasks } from './tasks.js';

const modal = document.getElementById('taskModal');
const closeModalButton = document.getElementById('closeModal');
const submitTaskButton = document.getElementById('submitTask');
const taskInput = document.getElementById('taskInput');

export function initializeModal() {
    const addTaskBtn = document.getElementById('addTaskBtn');

    addTaskBtn.addEventListener('click', showModal);
    closeModalButton.addEventListener('click', closeModal);
    submitTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function showModal() {
    modal.style.display = 'block';
    taskInput.focus();
}

function closeModal() {
    modal.style.display = 'none';
    taskInput.value = '';
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = createTask(taskText);
        document.getElementById('todo').appendChild(newTask);
        saveTasks();
        closeModal();
    }
}
