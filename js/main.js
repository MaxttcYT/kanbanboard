// main.js

import { loadTasks } from './tasks.js';
import { initializeDragAndDrop } from './dragdrop.js';
import { initializeModal } from './modal.js';

window.onload = function() {
    loadTasks();
    initializeDragAndDrop();
    initializeModal();
};
