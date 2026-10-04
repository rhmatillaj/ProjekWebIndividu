/* =========================================================
   TASKUY - DASHBOARD
   File ini mengatur statistik, tugas terdekat,
   dan jadwal yang tampil di Dashboard.
   ========================================================= */

// =========================================================
// ELEMENT HTML
// =========================================================
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");
const pendingTasksElement = document.getElementById("pendingTasks");
const taskProgressElement = document.getElementById("taskProgress");
const dashboardTaskList = document.getElementById("dashboardTaskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const todayScheduleList = document.getElementById("todayScheduleList");

// =========================================================
// UPDATE STATISTIK DASHBOARD
// =========================================================
function updateStatistics() {
    const totalTasks = tasks.length;

    // Menghitung jumlah tugas yang sudah selesai.
    const completedTasks = tasks.filter(function (task) {
        return task.completed === true;
    }).length;

    // Tugas yang belum selesai = total tugas - tugas selesai.
    const pendingTasks = totalTasks - completedTasks;

    // Menghitung persentase progress.
    let progress = 0;

    if (totalTasks > 0) {
        progress = Math.round((completedTasks / totalTasks) * 100);
    }

    // Menampilkan hasil ke elemen HTML.
    totalTasksElement.textContent = totalTasks;
    completedTasksElement.textContent = completedTasks;
    pendingTasksElement.textContent = pendingTasks;
    taskProgressElement.textContent = progress + "%";

    // Mengatur lebar progress bar.
    progressFill.style.width = progress + "%";
    progressText.textContent = progress + "%";
}

// =========================================================
// MENAMPILKAN TUGAS TERDEKAT
// =========================================================
function renderDashboardTasks() {
    // Hapus isi lama sebelum menampilkan data baru.
    dashboardTaskList.innerHTML = "";

    // Ambil maksimal 3 tugas yang belum selesai,
    // kemudian urutkan berdasarkan deadline terdekat.
    const upcomingTasks = tasks
        .filter(function (task) {
            return task.completed === false;
        })
        .sort(function (a, b) {
            return new Date(a.deadline) - new Date(b.deadline);
        })
        .slice(0, 3);

    // Jika belum ada tugas, tampilkan pesan kosong.
    if (upcomingTasks.length === 0) {
        dashboardTaskList.innerHTML = `
            <div class="empty-dashboard">
                <div class="empty-dashboard-icon">📋</div>
                <h3>Tidak ada tugas terdekat</h3>
                <p>
                    Semua tugas sudah selesai atau
                    belum ada tugas yang ditambahkan.
                </p>
            </div>
        `;
        return;
    }

    // Menampilkan setiap tugas ke Dashboard.
    upcomingTasks.forEach(function (task) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("dashboard-task");

        const statusText = task.completed ? "Selesai" : "Belum Selesai";

        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.course} • Deadline: ${task.deadline}</p>
            </div>
            <span>${statusText}</span>
        `;

        dashboardTaskList.appendChild(taskItem);
    });
}