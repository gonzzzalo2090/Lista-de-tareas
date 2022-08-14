const input = document.getElementById("input");
const addTaskBtn = document.getElementById("addTask");
const listTasks = document.getElementById("list-container");

/*Hago un array vacio donde guardar las tareas*/
let tasks = [];

/*Ahora traer lo que se escribe en el input
cuando se hace click en el boton*/
addTaskBtn.addEventListener("click", addTasks);

function addTasks() {
  const task = input.value;
  //Si el input esta vacio devuelve un error
  if (task == "") {
    showError("la tarea esta vacia");
    return;
  }
  //Si la tarea ya existe q diga que ya existe
  if (tasks.some((item) => task == item.task)) {
    showError("La tarea ya existe");
    return;
  }

  //Hago un objeto de tasks donde se guarda los valores, el task y el id
  const taskObj = {
    task: task,
    id: Date.now(),
  };
  //clono el array y le concateno el obj
  tasks = [...tasks, taskObj];
  //ejecuto la funcion para que pinte la tarea
  createHtml();

  //limpiar el input
  input.value = "";
}

//Funcion para mostrar el error
function showError(error) {
  const msgError = document.createElement("p");
  msgError.textContent = error;
  //Agregar el p dentro de donde quiero q se muestre
  listTasks.appendChild(msgError);
  //le doy un estilo con la clase css
  msgError.classList.add("error");

  //Set time out para que dure 3s y se vaya
  setTimeout(() => {
    msgError.remove();
  }, 1200);
}

//Funcion para pintar las tareas
function createHtml() {
  listTasks.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.task}<span data-id='${task.id}'>X</span>`;
    listTasks.appendChild(li);
  });
  //Guardar el array en el localstorage
  sendLocalSotarge();
}

//Funcion Local storage
function sendLocalSotarge() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Funcion recuperar la data del storage q persistan por mas q actualizes
function recuperarLocalStorage() {
  document.addEventListener("DOMContentLoaded", () => {
    //obtener los items del localstorage
    tasks = JSON.parse(localStorage.getItem("tasks"));
    //ahora lo pinto en el html
    createHtml();
  });

  //Creo un addEventListener para borrar las tareas
  listTasks.addEventListener("click", deleteTask);
}
recuperarLocalStorage();

//Funcion para borrar las tareas
function deleteTask(e) {
  if (e.target.tagName == "SPAN") {
    //Guardo el atributo del id de la tarea en una variable
    const deleteId = parseInt(e.target.getAttribute("data-id"));
    tasks = tasks.filter((task) => task.id !== deleteId);
    //pinto en el html el nuevo array
    createHtml();
  }
}

//Funcion para borrar todas las tareas
function deleteAll() {
  tasks = [];
  createHtml()
}
