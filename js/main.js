// HTML Elements
let taskInput = document.querySelector(`[type='text']`);
let addBtn = document.querySelector(`[type='submit']`);
let listContainer = document.querySelector('.list');
// Variables
let allTasks = [];

// Reset HTML Elements
function reset(ele) {
    ele.value = '';
    ele.focus();
}

// Create The Necessary Elements For The Goals List  
function createComponents(text, id) {
    // Create The TaskContainer Div 
    TaskContainer = document.createElement('div');

    // Add The Necessary Attributes To The TaskContainer Div 
    TaskContainer.className = 'task';
    TaskContainer.id = id;

    // Create The  taskTextDiv And The Delete Button
    taskTextDiv = document.createElement('div');
    delBtn = document.createElement('span');

    // Add The Necessary Attributes To The taskTextDiv And The Delete Button
    taskTextDiv.className = 'goal-text';
    delBtn.className = 'delete';

    // Add The Text To The Goal taskTextDiv
    taskTextDiv.innerText = text;
    delBtn.innerText = 'delete';

    // Adding The Task Components To The TaskContainer
    TaskContainer.append(taskTextDiv, delBtn);

    // Adding The Task Container To The Goals List 
    listContainer.appendChild(TaskContainer);
}

if (window.localStorage.getItem('tasks')) {
    allTasks = JSON.parse(window.localStorage.getItem('tasks'));
    
    allTasks.forEach(task => {
        createComponents(task.taskText, task.id);
    });
}

function storeTaskToLS (arr) {
    window.localStorage.setItem('tasks', JSON.stringify(arr));
}

// Function Store Goal To An Array 
function storeTask(text) {
    const task = {
        id: `task-${Date.now()}`,
        taskText: text,
    }

    allTasks.push(task);

    storeTaskToLS(allTasks);

    return task;
}

// Function To Add The Goal Text Into The Goals List
function addTask() {
    addBtn.addEventListener('click', () => {
        if (taskInput.value === '') {
            alert('Please Enter The Goal Text ... ');
            reset(taskInput);
            return false;
        }

        let task = storeTask(taskInput.value);

        createComponents(taskInput.value, task.id);

        reset(taskInput);
    });

}

addTask();

function removeFromLS(id) {
    let tasksFiltered = allTasks.filter(task => {
        return task.id !== id;
    });

    storeTaskToLS(tasksFiltered);
}

listContainer.addEventListener('click', (e) => {
    if (e.target.hasAttributes()) {
        removeFromLS(e.target.parentElement.id);
        e.target.parentElement.remove();
    }
});


