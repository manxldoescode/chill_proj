const { clear, log } = require('console');
const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, "data");
const filePath = path.join(dataFolder, "data.json");


//read todo
function readTodo() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    try {
        const todos = JSON.parse(data);
        if (Array.isArray(todos)) return todos 
        else{return []};
    } catch (e) {
        return [];
    }
}

//writing Todo with this
function writeTodo(todos){
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}


//add todo
function addTodo(task){
    const todos = readTodo();
    let id; 
    if (todos.length) {
      id = (parseInt(todos[todos.length - 1].id) + 1).toString(); // if there is no id the function will assign the id to 1 or its going to generate a new
    } else {    
        id = "1";
    }
    const todo = {id, task};
    todos.push(todo);
    writeTodo(todos);
    console.log("Added task : ", todo );
    return todo
}

function deletTodo(id) {
    const todos = readTodo();
    const iddel = todos.findIndex(t => t.id === id);//check for the todo if that exist with the corresponding id also findIndex return a number 
    if (iddel === -1) {
        console.log("task not found");
        return null
    }
    const removed = todos.splice(iddel, 1) [0];
    writeTodo(todos)
    console.log("todo removed :", removed);
    return removed
}

function update(id, task) {
    const todos = readTodo();
    const idex = todos.find(t => t.id === id);
    if (idex === -1) {
        console.log("task not found");
        return null
    }
    idex.task = task
    writeTodo(todos)
    console.log("updated : ", idex);
    return idex
}

function listTodo() {
    const todos = readTodo();
    console.log(todos);
}

addTodo("kiss me more");
deletTodo('2');
update('3', 'hoesaintmad');
listTodo();