let gp = 850;
let level = 5;
let nextLevel = 1200;

let tasks = [];

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
window.onload = () => {
updateProgress();
}


// Add Task
form.addEventListener("submit", (e) => {

e.preventDefault();

try{

let taskName = document.getElementById("taskName").value;
let taskGP = parseInt(document.getElementById("taskGP").value);

let task = {
name: taskName,
gp: taskGP
};

tasks.push(task);

createTask(task);

form.reset();

}catch(error){

console.log("Error adding task", error);

}

});


// Create Task
const createTask = (task) => {

let li = document.createElement("li");

li.innerHTML = `${task.name} (${task.gp} GP)
<button class="completeBtn">Complete</button>`;

taskList.appendChild(li);

li.querySelector(".completeBtn")
.addEventListener("click", () => completeTask(li, task.gp));
checkAchievements();
}


// Complete Task
function completeTask(element, taskGP){

gp += taskGP;

document.getElementById("gp").innerText = gp;

element.classList.add("completed");

let completed = document.getElementById("completed");
let pending = document.getElementById("pending");

completed.innerText = parseInt(completed.innerText) + 1;
pending.innerText = parseInt(pending.innerText) - 1;

updateProgress();
checkAchievements();
}

function submitProof(){

let file = document.getElementById("proofFile");

if(file.files.length === 0){
alert("Please upload proof first!");
return;
}

alert("Task completed! Proof submitted.");

file.value = ""; // clears the uploaded file

}


// Progress bar
function updateProgress(){

let progressPercent = (gp / nextLevel) * 100;

document.getElementById("progress").style.width =
progressPercent + "%";

if(gp >= nextLevel){

level++;

document.getElementById("level").innerText = level;

nextLevel += 400;

alert("Level Up! 🚀");

}

}


// Example async API (CO5)
async function loadQuote(){

try{

let response = await fetch("https://api.quotable.io/random");

let data = await response.json();

console.log("Motivation:", data.content);

}catch(error){

console.log("API Error:", error);

}

}

loadQuote();
function checkAchievements(){

const list = document.getElementById("achievements");

if(gp >= 1000){

let li = document.createElement("li");
li.innerText = "🚀 Earned 1000 GP";

list.appendChild(li);

}

}
function toggleTheme(){

document.body.classList.toggle("dark-mode");

}

