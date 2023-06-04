/*
    1- form with input file and intput button /
    2- div contains created tasks /
    3- create task box contains title and delete button /
*/

/*
    1- user input a text
    2- new task will be created /
    3- new object contains id and title /
    4- the task object will be added to the array (tasks) /
    5- set the updated object as a value for tasks key /
    6- if the user clicked on delete button the task will be deleted then update the object
       in localStorage /
*/


const tasksContainer = document.querySelector(".tasks-container");
const addTask = document.getElementById("add-task");

let tasks = [];

const retreiveTasks = _ => {
    let id = 0;
    if(localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(task => {
            createTask(task, id);
            id++;
        });
    }
}

addTask.onclick = _ => {
    const input = document.querySelector(".task-input");
    createTaskObject(input, tasks.length);
}

const createTaskObject = (input, id) => {
    const task = {
        id: Date.now(),
        title: input.value,
    };
    createTask(task, id);
    addTaskToStorage(task);
}

const createTask = (task, id) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.dataset.id = id
    const p = document.createElement("p");
    p.classList.add("task-title");
    p.textContent = task.title
    const deleteTask = document.createElement("button");
    deleteTask.classList.add("delete-task");
    deleteTask.textContent = "Delete";
    addTaskToDOM(div, p, deleteTask)
}

const addTaskToDOM = (task, title, deleteButton) => {
    task.appendChild(title);
    task.appendChild(deleteButton);
    tasksContainer.appendChild(task);
}

const addTaskToStorage = (task) => {
    console.log(tasks);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const deleteTask = () => {
    tasksContainer.addEventListener("click", e => {
        e.target.parentElement.remove();
        tasks.splice(e.target.parentElement.dataset.id, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        tasksContainer.innerHTML = '';
        retreiveTasks();
    })
}


// Start Appilcation
retreiveTasks();
deleteTask();

