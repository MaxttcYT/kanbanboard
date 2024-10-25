import { createTask, saveTasks } from "./tasks.js";

const modal = document.getElementById("taskModal");
const closeModalButton = document.getElementById("closeModal");
const submitTaskButton = document.getElementById("submitTask");
const taskInput = document.getElementById("taskInput");

export function initializeModal() {
  const addTaskBtn = document.getElementById("addTaskBtn");

  addTaskBtn.addEventListener("click", showModal);
  closeModalButton.addEventListener("click", closeModal);
  submitTaskButton.addEventListener("click", addTask);
  
  const modalInputs = document.querySelectorAll(".modal-input");
  modalInputs.forEach((elem) => {
    elem.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addTask();
      }
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function showModal() {
  modal.style.display = "block";
  taskInput.focus();
}

function closeModal() {
  modal.style.display = "none";
  taskInput.value = "";
  taskInput.blur();
}

function addTask() {
  const elements = document.querySelectorAll(".modal-input");
  let allInputsValid = true;

  elements.forEach((elem) => {
    if (elem.value.trim() === "") {
      allInputsValid = false;
      elem.focus();
      elem.classList.add("error");
    } else {
      elem.classList.remove("error");
    }
  });

  if (allInputsValid) {
    const newTask = createTask(convertInputsToJSON(elements));
    document.getElementById("todo").appendChild(newTask);
    saveTasks();
    closeModal();
    
    elements.forEach((elem) => {
      elem.value = elem.getAttribute("data-defaultValue");
    });
  }
}

function convertInputsToJSON(inputs) {
  return Array.from(inputs).reduce((result, input) => {
    result[input.name] = input.value;
    return result;
  }, {});
}
