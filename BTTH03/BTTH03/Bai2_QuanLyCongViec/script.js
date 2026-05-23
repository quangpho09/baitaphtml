let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = -1;

/* ================= DOM ================= */

const taskContainer = document.getElementById("taskContainer");

const taskForm = document.getElementById("taskForm");

const taskModal = document.getElementById("taskModal");

const messageBox = document.getElementById("messageBox");

/* ================= OPEN MODAL ================= */

document.getElementById("openModalBtn")
.addEventListener("click", openModal);

/* ================= CLOSE MODAL ================= */

document.getElementById("closeModalBtn")
.addEventListener("click", closeModal);

document.getElementById("cancelBtn")
.addEventListener("click", closeModal);

/* ================= OPEN MODAL ================= */

function openModal(){

    taskModal.classList.remove("hidden");
}

/* ================= CLOSE MODAL ================= */

function closeModal(){

    taskModal.classList.add("hidden");

    taskForm.reset();

    editIndex = -1;
}

/* ================= SAVE LOCAL ================= */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* ================= SHOW MESSAGE ================= */

function showMessage(text){

    messageBox.innerHTML = `
        <div class="message">
            ${text}
        </div>
    `;

    setTimeout(()=>{

        messageBox.innerHTML = "";

    },2000);
}

/* ================= RENDER TASK ================= */

function renderTasks(){

    taskContainer.innerHTML = "";

    /* EMPTY */

    if(tasks.length === 0){

        taskContainer.innerHTML = `
            <h3>
                Chưa có công việc nào
            </h3>
        `;
    }

    /* LOOP */

    tasks.forEach((task,index)=>{

        taskContainer.innerHTML += `

        <div class="task-card
            ${task.completed ? "done" : ""}
        ">

            <h2>${task.title}</h2>

            <p>
                ${task.description}
            </p>

            <p>
                <strong>Deadline:</strong>
                ${task.deadline}
            </p>

            <span class="badge

                ${task.priority === "Cao"
                    ? "high"
                    : task.priority === "Trung Bình"
                    ? "medium"
                    : "low"
                }

            ">
                ${task.priority}
            </span>

            <br><br>

            <label>

                <input
                    type="checkbox"

                    ${task.completed ? "checked" : ""}

                    onchange="toggleTask(${index})"
                >

                Hoàn Thành

            </label>

            <br><br>

            <button
                class="btn btn-warning"

                onclick="editTask(${index})"
            >
                Sửa
            </button>

            <button
                class="btn btn-danger"

                onclick="deleteTask(${index})"
            >
                Xóa
            </button>

        </div>
        `;
    });

    updateTaskSummary();
}

/* ================= UPDATE SUMMARY ================= */

function updateTaskSummary(){

    document.getElementById("totalTasks")
    .innerText = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    document.getElementById("completedTasks")
    .innerText = completedTasks;

    document.getElementById("pendingTasks")
    .innerText =
        tasks.length - completedTasks;
}

/* ================= SUBMIT FORM ================= */

taskForm.addEventListener("submit",function(event){

    event.preventDefault();

    const task = {

        title:
            document.getElementById("title").value,

        description:
            document.getElementById("description").value,

        deadline:
            document.getElementById("deadline").value,

        priority:
            document.getElementById("priority").value,

        completed:
            document.getElementById("completed").checked
    };

    /* ADD */

    if(editIndex === -1){

        tasks.push(task);

        showMessage(
            "Thêm công việc thành công"
        );
    }

    /* EDIT */

    else{

        tasks[editIndex] = task;

        showMessage(
            "Cập nhật công việc thành công"
        );
    }

    saveTasks();

    renderTasks();

    closeModal();
});

/* ================= EDIT ================= */

function editTask(index){

    const task = tasks[index];

    document.getElementById("title").value =
        task.title;

    document.getElementById("description").value =
        task.description;

    document.getElementById("deadline").value =
        task.deadline;

    document.getElementById("priority").value =
        task.priority;

    document.getElementById("completed").checked =
        task.completed;

    editIndex = index;

    openModal();
}

/* ================= DELETE ================= */

function deleteTask(index){

    const confirmDelete = confirm(
        "Bạn có chắc muốn xóa công việc này không?"
    );

    if(confirmDelete){

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

        showMessage(
            "Xóa công việc thành công"
        );
    }
}

/* ================= TOGGLE ================= */

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

/* ================= FIRST RENDER ================= */

renderTasks();