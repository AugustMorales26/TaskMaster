const addButton = document.getElementById("ButtonTask");
const taskInput = document.getElementById("TaskInput");
const taskLists = document.getElementById("TaskLists");
const noTasksMessage = document.getElementById("NoTasksMessage");
const deleteListButton = document.getElementById("DeletList");
const deleteCompleteButton = document.getElementById("DeletComplete");

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(decodeURIComponent(getCookie("tasks")) || "[]");

    storedTasks.forEach((task, index) => {
        addTaskToDOM(task.text, index + 1); // Utilizamos el índice + 1 como número de enumeración
    });

    if (storedTasks.length > 0) {
        noTasksMessage.style.display = "none";
    }
});

addButton.addEventListener("click", () => {
    const newTaskText = taskInput.value.trim();
    if (newTaskText !== "") {
        const storedTasks = JSON.parse(decodeURIComponent(getCookie("tasks")) || "[]");
        storedTasks.push({ text: newTaskText });
        saveTasksToCookie(storedTasks);

        taskInput.value = "";
        taskLists.innerHTML = "";
        storedTasks.forEach((task, index) => {
            addTaskToDOM(task.text, index + 1);
        });

        noTasksMessage.style.display = "none";
    }
});

deleteListButton.addEventListener("click", () => {
    taskLists.innerHTML = "";
    const storedTasks = [];
    saveTasksToCookie(storedTasks);
    noTasksMessage.style.display = "block";
});

deleteCompleteButton.addEventListener("click", () => {
    const tasksToKeep = [];

    const taskItems = taskLists.getElementsByClassName("alert");
    for (const taskItem of taskItems) {
        if (!taskItem.classList.contains("completed-task")) {
            const taskText = taskItem.textContent.replace(/^\d+\.\s/, "");
            tasksToKeep.push({ text: taskText });
        }
    }

    taskLists.innerHTML = "";
    tasksToKeep.forEach((task, index) => {
        addTaskToDOM(task.text, index + 1);
    });

    const storedTasks = JSON.parse(decodeURIComponent(getCookie("tasks")) || "[]");
    saveTasksToCookie(tasksToKeep);
    noTasksMessage.style.display = tasksToKeep.length === 0 ? "block" : "none";
});

taskLists.addEventListener("dblclick", (event) => {
    const clickedTask = event.target;
    if (clickedTask.classList.contains("completed-task")) {
        clickedTask.classList.remove("completed-task");
    } else {
        clickedTask.classList.add("completed-task");
    }
});

function addTaskToDOM(taskText, taskNumber) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("alert", "alert-primary", "mt-2");
    taskItem.textContent = `${taskNumber}. ${taskText}`;
    taskLists.appendChild(taskItem);
}

function saveTasksToCookie(tasksArray) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasksArray))};expires=${expires.toUTCString()}`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return "";
}

const downloadButton = document.getElementById("Download");

downloadButton.addEventListener("click", () => {
    const storedTasks = JSON.parse(decodeURIComponent(getCookie("tasks")) || "[]");
    if (storedTasks.length > 0) {
        const tasksText = storedTasks.map((task, index) => `${index + 1}. ${task.text}`).join("\n");
        const blob = new Blob([tasksText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "task_list.txt";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});



