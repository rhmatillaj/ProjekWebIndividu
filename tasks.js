/* =========================================================
   TASKUY - MY TASKS
   File ini mengatur tambah, edit, hapus, pencarian,
   filter, sorting, dan status tugas.
   ========================================================= */

// =========================================================
// ELEMENT HTML
// =========================================================
const taskTableBody = document.getElementById("taskTableBody");
const addTaskButton = document.getElementById("addTaskButton");
const taskModal = document.getElementById("taskModal");
const closeModalButton = document.getElementById("closeModalButton");
const cancelTaskButton = document.getElementById("cancelTaskButton");
const taskForm = document.getElementById("taskForm");
const modalTitle = document.getElementById("modalTitle");
const taskTitle = document.getElementById("taskTitle");
const taskCourse = document.getElementById("taskCourse");
const taskDeadline = document.getElementById("taskDeadline");
const taskPriority = document.getElementById("taskPriority");
const searchTask = document.getElementById("searchTask");
const filterStatus = document.getElementById("filterStatus");
const filterPriority = document.getElementById("filterPriority");
const sortDeadline = document.getElementById("sortDeadline");
const taskTotal = document.getElementById("taskTotal");
const taskCompleted = document.getElementById("taskCompleted");
const taskPending = document.getElementById("taskPending");
const taskOverdue = document.getElementById("taskOverdue");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");

// ID tugas yang sedang diedit atau akan dihapus.
let editTaskId = null;
let deleteTaskId = null;

// =========================================================
// MENAMPILKAN DAFTAR TUGAS
// =========================================================
function renderTasks() {
    taskTableBody.innerHTML = "";

    // Nilai pencarian dan filter.
    const searchValue = searchTask.value.toLowerCase();
    const statusValue = filterStatus.value;
    const priorityValue = filterPriority.value;

    // Filter berdasarkan nama, status, dan prioritas.
    let filteredTasks = tasks.filter(function (task) {
        const matchSearch = task.title.toLowerCase().includes(searchValue);

        let matchStatus = true;
        if (statusValue === "completed") {
            matchStatus = task.completed === true;
        } else if (statusValue === "pending") {
            matchStatus = task.completed === false;
        }

        let matchPriority = true;
        if (priorityValue !== "all") {
            matchPriority = task.priority === priorityValue;
        }

        return matchSearch && matchStatus && matchPriority;
    });

    // Sorting berdasarkan deadline.
    if (sortDeadline.value === "nearest") {
        filteredTasks.sort(function (a, b) {
            return new Date(a.deadline) - new Date(b.deadline);
        });
    }

    if (sortDeadline.value === "furthest") {
        filteredTasks.sort(function (a, b) {
            return new Date(b.deadline) - new Date(a.deadline);
        });
    }

    // Jika hasil filter kosong.
    if (filteredTasks.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="6" class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-state-icon">📋</div>
                    <h3>Tidak ada tugas</h3>
                    <p>Belum ada tugas yang sesuai dengan pencarian atau filter.</p>
                </div>
            </td>
        `;
        taskTableBody.appendChild(row);
    }

    // Menampilkan tugas ke tabel.
    filteredTasks.forEach(function (task) {
        const row = document.createElement("tr");

        const statusText = task.completed ? "Selesai" : "Belum Selesai";
        const statusClass = task.completed
            ? "status-completed"
            : "status-pending";

        let priorityClass = "priority-low";
        if (task.priority === "Tinggi") {
            priorityClass = "priority-high";
        } else if (task.priority === "Sedang") {
            priorityClass = "priority-medium";
        }

        row.innerHTML = `
            <td><strong>${task.title}</strong></td>
            <td>${task.course}</td>
            <td>${formatDate(task.deadline)}</td>
            <td>
                <span class="priority-badge ${priorityClass}">
                    ${task.priority}
                </span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>
            </td>
            <td>
                <div class="task-actions">
                    <button
                        class="action-button action-complete"
                        onclick="toggleTask(${task.id})"
                    >
                        ${task.completed ? "Batal" : "Selesai"}
                    </button>
                    <button
                        class="action-button action-edit"
                        onclick="editTask(${task.id})"
                    >
                        Edit
                    </button>
                    <button
                        class="action-button action-delete"
                        onclick="deleteTask(${task.id})"
                    >
                        Hapus
                    </button>
                </div>
            </td>
        `;

        taskTableBody.appendChild(row);
    });

    updateTaskStatistics();
}

// =========================================================
// FORMAT TANGGAL
// =========================================================
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// =========================================================
// UPDATE STATISTIK TUGAS
// =========================================================
function updateTaskStatistics() {
    const total = tasks.length;
    let completed = 0;
    let overdue = 0;

    // Ambil tanggal hari ini tanpa jam.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach(function (task) {
        if (task.completed === true) {
            completed++;
        }

        // Tugas terlambat jika deadline sudah lewat dan belum selesai.
        const deadline = new Date(task.deadline);
        deadline.setHours(0, 0, 0, 0);

        if (deadline < today && task.completed === false) {
            overdue++;
        }
    });

    const pending = total - completed;

    taskTotal.textContent = total;
    taskCompleted.textContent = completed;
    taskPending.textContent = pending;
    taskOverdue.textContent = overdue;
}

// =========================================================
// MODAL TUGAS
// =========================================================
function openModal() {
    taskModal.classList.add("show");
    taskModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    taskModal.classList.remove("show");
    taskModal.setAttribute("aria-hidden", "true");
    taskForm.reset();
    editTaskId = null;
    modalTitle.textContent = "Tambah Tugas";
}

// Tombol tambah tugas.
addTaskButton.addEventListener("click", function () {
    editTaskId = null;
    taskForm.reset();
    modalTitle.textContent = "Tambah Tugas";
    openModal();
});

// Tombol tutup dan batal.
closeModalButton.addEventListener("click", closeModal);
cancelTaskButton.addEventListener("click", closeModal);

// =========================================================
// TAMBAH / EDIT TUGAS
// =========================================================
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const course = taskCourse.value.trim();
    const deadline = taskDeadline.value;
    const priority = taskPriority.value;

    // Validasi input.
    if (title === "") {
        showToast("⚠️ Judul tugas belum diisi.");
        return;
    }

    if (course === "") {
        showToast("⚠️ Mata kuliah belum diisi.");
        return;
    }

    if (deadline === "") {
        showToast("⚠️ Deadline belum dipilih.");
        return;
    }

    if (priority === "") {
        showToast("⚠️ Prioritas belum dipilih.");
        return;
    }

    // Jika ada ID edit, perbarui tugas lama.
    if (editTaskId !== null) {
        const task = tasks.find(function (item) {
            return item.id === editTaskId;
        });

        if (!task) {
            return;
        }

        task.title = title;
        task.course = course;
        task.deadline = deadline;
        task.priority = priority;

        saveTasks();
        showToast("✅ Tugas berhasil diperbarui.");
    } else {
        // Jika tidak ada ID edit, buat tugas baru.
        const newTask = {
            id: Date.now(),
            title: title,
            course: course,
            deadline: deadline,
            priority: priority,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        showToast("✅ Tugas berhasil ditambahkan.");
    }

    renderTasks();
    closeModal();
});