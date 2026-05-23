
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

const taskTableBody = document.getElementById("taskTableBody");

document.getElementById("openModalBtn").addEventListener("click",()=>{
    document.getElementById("taskModal").classList.remove("hidden");
});

function closeModal(){
    document.getElementById("taskModal").classList.add("hidden");
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks(){

    taskTableBody.innerHTML = "";

    tasks.forEach((task,index)=>{

        taskTableBody.innerHTML += `
        <tr class="${task.done ? "done" : ""}">
            <td>${task.title}</td>
            <td>${task.deadline}</td>
            <td>
                <span class="badge ${
                    task.priority === "Cao"
                    ? "high"
                    : task.priority === "Trung Bình"
                    ? "medium"
                    : "low"
                }">
                    ${task.priority}
                </span>
            </td>

            <td>
                <input type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleTask(${index})">
            </td>

            <td>
                <button class="btn btn-warning"
                    onclick="editTask(${index})">
                    Sửa
                </button>

                <button class="btn btn-danger"
                    onclick="deleteTask(${index})">
                    Xóa
                </button>
            </td>
        </tr>
        `;
    });
}

renderTasks();
