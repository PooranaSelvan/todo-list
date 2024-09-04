const clearBtn = document.getElementById('btn-test');
const taskList = document.querySelector('.collection');
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const searchInput = document.getElementById('search');

loadEvents();

function loadEvents(){

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click',removeItems);

    clearBtn.addEventListener('click', removeTask);

    // searchInput.addEventListener('input', searchElement);
}

// function searchElement(){

//     const listItems = document.getElementsByClassName('collection-item');

//     Array.from(listItems).forEach(function(item){
//         if(listItems.innerText === searchInput){
//             listItems.classList.add('hidden');
//         }
//         else{
//             listItems.classList.remove('hidden');
//         }
//     });
// }

function getTasks(){

    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    

    tasks.forEach(function(task){

        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));


        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e){

    e.preventDefault();

    if(taskInput.value === ""){
        alert("Please Fill Anything In Text Box..")
        return;
    }

    const allItems = document.querySelectorAll(".collection-item");
    for(let x of allItems){
        if(x.innerText.trim() === taskInput.value.trim()){
            alert("Name Already Exists..");
            return;
        }
    }

        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(taskInput.value));


        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);

        storelocalStorage(taskInput.value);

        taskInput.value = "";
}


function removeItems(event){

    if(event.target.parentElement.classList[0] === "delete-item"){
        event.target.parentElement.parentElement.remove();
    }

    removeLocalStorage(event.target.parentElement.parentElement);
}

function removeLocalStorage(removeElement){

    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach(function(task, index){
        if(removeElement.innerText === task){
            tasks.splice(index,1)
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));

    })
}
function removeTask(){
    taskList.innerHTML = ""

    localStorage.clear();
}

function storelocalStorage(a){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(a);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}