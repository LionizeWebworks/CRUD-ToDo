
const taskList = document.getElementById("task-list");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const submit = document.getElementById("submit");

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const open = document.getElementById("newTask");
const close = document.getElementById("close");
const clear = document.getElementById("clear");

//open the modal
open.addEventListener("click", (e) => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//close the modal
const closeModal = () => {
modal.classList.add("hidden");
overlay.classList.add("hidden");
}

close.addEventListener("click", closeModal);

// //prevent default form behavior
submit.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  formValidation(); // Call your form validation function
});

const formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    resetForm();
    closeModal();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

  createTasks();
};


const createTasks = () => {
  taskList.innerHTML = "";
  data.map((x, y) => {
    return (taskList.innerHTML += `
    <div class="task" id=${y}>
          <span class="taskName">${x.text}</span>
          <span class="taskDate">${x.date}</span>
          <span><p>${x.description}</p></span>
          </div>`
    );
  });
          icons.innerHTML += `
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>`
}

const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

const editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();

  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

const clearList = (e) => {
  taskList.innerHTML = "";
  icons.innerHTML = "";

  data.length = 0;

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

clear.addEventListener("click", (e) => {
  clearList();
});

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
