const form = document.getElementById("form");
const input = document.getElementById("task"); // Corrected the id to "task"
const tasks = document.getElementById("task-list"); // Added this line to select the task list
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    formValidation();
});

const formValidation = () => {
    if (task.value === "") {
        msg.innerHTML = "Post cannot be blank";
        console.log("failure");
    } else {
        console.log("success");
        msg.innerHTML = "";
    }
};

const data = {};

const acceptData = () => {};