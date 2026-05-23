
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const studentTableBody = document.getElementById("studentTableBody");
const studentModal = document.getElementById("studentModal");
const studentForm = document.getElementById("studentForm");

document.getElementById("openModalBtn").addEventListener("click", openModal);
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("cancelBtn").addEventListener("click", closeModal);

function openModal(){
    studentModal.classList.remove("hidden");
}

function closeModal(){
    studentModal.classList.add("hidden");
    studentForm.reset();
    editIndex = -1;
}

function showMessage(text){
    document.getElementById("messageBox").innerHTML =
    `<div class="message">${text}</div>`;

    setTimeout(()=>{
        document.getElementById("messageBox").innerHTML = "";
    },2000);
}

function saveStudents(){
    localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents(){

    studentTableBody.innerHTML = "";

    if(students.length === 0){
        studentTableBody.innerHTML =
        `<tr>
            <td colspan="7">Chưa có dữ liệu sinh viên</td>
        </tr>`;
    }

    students.forEach((student,index)=>{

        studentTableBody.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.birth}</td>
            <td>${student.className}</td>
            <td>${student.score}</td>
            <td>${student.email}</td>

            <td>
                <button class="btn btn-warning"
                    onclick="editStudent(${index})">
                    Sửa
                </button>

                <button class="btn btn-danger"
                    onclick="deleteStudent(${index})">
                    Xóa
                </button>
            </td>
        </tr>
        `;
    });

    updateStatistics();
}

function updateStatistics(){

    document.getElementById("totalStudents").innerText =
        students.length;

    let total = 0;

    students.forEach(student=>{
        total += Number(student.score);
    });

    const average = students.length
        ? (total / students.length).toFixed(2)
        : 0;

    document.getElementById("averageScore").innerText = average;
}

studentForm.addEventListener("submit",function(event){

    event.preventDefault();

    const student = {
        id:document.getElementById("studentId").value,
        name:document.getElementById("fullName").value,
        birth:document.getElementById("birthDate").value,
        className:document.getElementById("className").value,
        score:document.getElementById("score").value,
        email:document.getElementById("email").value
    };

    if(editIndex === -1){

        students.push(student);

        showMessage("Thêm sinh viên thành công");

    }else{

        students[editIndex] = student;

        showMessage("Cập nhật sinh viên thành công");
    }

    saveStudents();
    renderStudents();
    closeModal();
});

function editStudent(index){

    const student = students[index];

    document.getElementById("studentId").value = student.id;
    document.getElementById("fullName").value = student.name;
    document.getElementById("birthDate").value = student.birth;
    document.getElementById("className").value = student.className;
    document.getElementById("score").value = student.score;
    document.getElementById("email").value = student.email;

    editIndex = index;

    openModal();
}

function deleteStudent(index){

    if(confirm("Bạn có chắc muốn xóa sinh viên này không?")){

        students.splice(index,1);

        saveStudents();

        renderStudents();

        showMessage("Xóa sinh viên thành công");
    }
}

renderStudents();
