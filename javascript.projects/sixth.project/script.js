  const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos =[]
let currentfilter = "all ";

addTaskBtn.addEventListener("click",()=>{
  addtodo(taskInput.value)
})

taskInput.addEventListener("keydown",(e)=>{
  if(e.key === "Enter") addtodo(taskInput.value);
  }
);

clearCompletedBtn.addEventListener("click",clearcompleted)

 function addtodo(text){
  if(text.trim()==="")return

  const todo = {
  id: Date.now(),
  text,
  completed:false,

 };

 todos.push(todo);
 savetodos()
 rendertodos();
 taskInput.value = ""
}

function savetodos(){
  localStorage.setItem("todolist",JSON.stringify(todos))
  updateitemcount()
  checkemptyspace()
}

function updateitemcount(){
   const uncompletedtodos = todos.filter((todo) => !todo.completed);
   itemsLeft.textContent =`${uncompletedtodos?.length} item ${uncompletedtodos?.length !== 1 ? "s" :""}left`;
}


function checkemptyspace(){
  const filteredtodos = filtertodos(currentfilter)
  if(filteredtodos?.length === 0) emptyState.classList.remove("hidden")
    else emptyState.classList.add("hidden")
}

function filtertodos(filter){
  switch(filter){
  case "active":
    return todos.filter((todo) => !todo.completed);
    case "completed":
    return todos.filter((todo) => todo.completed);
    default:
     return todos;

  }
}


function rendertodos(){
todosList.innerHTML ="";

const filteredtodos = filtertodos(currentfilter);
filteredtodos.forEach((todo) => {
  const todoitems = document.createElement("li");
  todoitems.classList.add("todo-item")
  if(todo.completed) todoitems.classList.add("completed")

    const checkboxcontainer = document.createElement("label")
    checkboxcontainer.classList.add("checkbox-container")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("todo-checkbox")
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change",()=> toggletodo(todo.id));

    const checkmark = document.createElement("span")
    checkmark.classList.add("checkmark")


    checkboxcontainer.appendChild(checkbox);
    checkboxcontainer.appendChild(checkmark);


    const todotext = document.createElement("span")
    todotext.classList.add("todo-item-text")
    todotext.textContent = todo.text;

    const deletbtn = document.createElement("button");
    deletbtn.classList.add("delete-btn");
    deletbtn.innerHTML ='<i class="fa-solid fa-paperclip"></i>';
    deletbtn.addEventListener("click",() => deletetodo(todo.id));

    todoitems.appendChild(checkboxcontainer);
    todoitems.appendChild(todotext);
    todoitems.appendChild(deletbtn);

    todosList.appendChild(todoitems);
})
}





function clearcompleted(){
todos = todos.filter((todo) => !todo.completed);
savetodos();
rendertodos();
}









function toggletodo(id){

}


function deletetodo(id){
todos = todos.filter((todo) => todo.id !== id);
savetodos();
rendertodos();
}






function loadtodos(){
  const storedtodos = localStorage.getItem("todolist");
  if(storedtodos) todos = JSON.parse(storedtodos);
  rendertodos();

}


filters.forEach((filter) => {
  filter.addEventListener("click",() =>{
    setactivefilter(filter.getAttribute("data-filter"));
  })
})


function setactivefilter(filter){
  currentfilter = filter;

  filters.forEach((item) => {
    if(item.getAttribute("data-filter") === filter){
      item.classList.add("active");
    }else{
      item.classList.remove("active");

    }
  })
  rendertodos();
}

function setdate(){
  const option ={ weekday :"long",month:"short",day:"numeric"}
  const today =new Date();

  dateElement.textContent = today.toLocaleDateString("en-US",option);
}


window.addEventListener("DOMContentLoaded",() =>{
  loadtodos();
  updateitemcount();
  setdate()
});

