/* =========================================================
   TASKUY - SCHEDULE
   File ini mengatur jadwal mingguan, tambah, edit, hapus,
   dan drag-and-drop jadwal antar hari.
   ========================================================= */

// =========================================================
// ELEMENT HTML
// =========================================================
const scheduleModal = document.getElementById("scheduleModal");
const addScheduleButton = document.getElementById("addScheduleButton");
const closeScheduleModal = document.getElementById("closeScheduleModal");
const cancelScheduleButton = document.getElementById("cancelScheduleButton");
const scheduleForm = document.getElementById("scheduleForm");
const scheduleModalTitle = document.getElementById("scheduleModalTitle");
const scheduleCourse = document.getElementById("scheduleCourse");
const scheduleDay = document.getElementById("scheduleDay");
const scheduleStart = document.getElementById("scheduleStart");
const scheduleEnd = document.getElementById("scheduleEnd");
const scheduleRoom = document.getElementById("scheduleRoom");
const todayScheduleDetail = document.getElementById("todayScheduleDetail");

// Kolom jadwal untuk setiap hari.
const dayElements = {
    Senin: document.getElementById("mondaySchedule"),
    Selasa: document.getElementById("tuesdaySchedule"),
    Rabu: document.getElementById("wednesdaySchedule"),
    Kamis: document.getElementById("thursdaySchedule"),
    Jumat: document.getElementById("fridaySchedule"),
    Sabtu: document.getElementById("saturdaySchedule"),
    Minggu: document.getElementById("sundaySchedule")
};

// ID yang sedang diedit atau akan dihapus.
let editScheduleId = null;
let deleteScheduleId = null;

// Modal konfirmasi hapus.
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");

// =========================================================
// DRAG AND DROP ANTAR HARI
// =========================================================
Object.entries(dayElements).forEach(function ([day, element]) {
    // Simpan nama hari pada kolom.
    element.dataset.day = day;

    // Izinkan card dijatuhkan ke kolom.
    element.addEventListener("dragover", function (event) {
        event.preventDefault();
        element.classList.add("drag-over");
    });

    // Hapus highlight ketika kursor keluar dari kolom.
    element.addEventListener("dragleave", function (event) {
        if (!element.contains(event.relatedTarget)) {
            element.classList.remove("drag-over");
        }
    });

    // Pindahkan jadwal ketika card dilepas.
    element.addEventListener("drop", function (event) {
        event.preventDefault();
        element.classList.remove("drag-over");

        const scheduleId = Number(
            event.dataTransfer.getData("text/plain")
        );

        const schedule = schedules.find(function (item) {
            return item.id === scheduleId;
        });

        if (!schedule) {
            return;
        }

        schedule.day = day;
        saveSchedules();
        renderSchedule();
        showToast("↔️ Jadwal berhasil dipindahkan.");
    });
});

// =========================================================
// MENAMPILKAN JADWAL
// =========================================================
function renderSchedule() {
    // Kosongkan semua kolom hari.
    Object.values(dayElements).forEach(function (element) {
        element.innerHTML = "";
    });

    // Masukkan setiap jadwal ke kolom hari yang sesuai.
    schedules.forEach(function (schedule) {
        const dayContainer = dayElements[schedule.day];

        if (!dayContainer) {
            return;
        }

        const item = document.createElement("div");
        item.classList.add("schedule-item");
        item.draggable = true;
        item.dataset.scheduleId = schedule.id;

        // Saat card mulai ditarik.
        item.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", String(schedule.id));
            event.dataTransfer.effectAllowed = "move";
            item.classList.add("is-dragging");
        });

        // Saat card selesai ditarik.
        item.addEventListener("dragend", function () {
            item.classList.remove("is-dragging");

            Object.values(dayElements).forEach(function (element) {
                element.classList.remove("drag-over");
            });
        });

        // Isi card jadwal.
        item.innerHTML = `
            <h3>${schedule.course}</h3>
            <p>${schedule.start} - ${schedule.end}</p>
            <div class="schedule-location">📍 ${schedule.room}</div>
            <div class="schedule-actions">
                <button
                    class="action-button action-edit"
                    onclick="editSchedule(${schedule.id})"
                >
                    Edit
                </button>
                <button
                    class="action-button action-delete"
                    onclick="deleteSchedule(${schedule.id})"
                >
                    Hapus
                </button>
            </div>
        `;

        dayContainer.appendChild(item);
    });

    renderTodaySchedule();
}

// =========================================================
// JADWAL HARI INI
// =========================================================
function renderTodaySchedule() {
    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const today = days[new Date().getDay()];

    const todaySchedules = schedules.filter(function (schedule) {
        return schedule.day === today;
    });

    todayScheduleDetail.innerHTML = "";

    if (todaySchedules.length === 0) {
        todayScheduleDetail.innerHTML = `
            <p style="color: #64748b;">Tidak ada jadwal hari ini.</p>
        `;
        return;
    }

    todaySchedules.forEach(function (schedule) {
        const item = document.createElement("div");
        item.classList.add("schedule-item");

        item.innerHTML = `
            <h3>${schedule.course}</h3>
            <p>${schedule.start} - ${schedule.end} • ${schedule.room}</p>
        `;

        todayScheduleDetail.appendChild(item);
    });
}

// =========================================================
// MODAL JADWAL
// =========================================================
function openScheduleModal() {
    scheduleModal.classList.add("show");
    scheduleModal.setAttribute("aria-hidden", "false");
}

function closeScheduleModalWindow() {
    scheduleModal.classList.remove("show");
    scheduleModal.setAttribute("aria-hidden", "true");
    scheduleForm.reset();
    editScheduleId = null;
    scheduleModalTitle.textContent = "Tambah Jadwal";
}

// Tombol tambah jadwal.
addScheduleButton.addEventListener("click", function () {
    editScheduleId = null;
    scheduleForm.reset();
    scheduleModalTitle.textContent = "Tambah Jadwal";
    openScheduleModal();
});

// Tombol tutup dan batal.
closeScheduleModal.addEventListener("click", closeScheduleModalWindow);
cancelScheduleButton.addEventListener("click", closeScheduleModalWindow);


// =========================================================
// TAMBAH / EDIT JADWAL
// =========================================================
scheduleForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const course = scheduleCourse.value.trim();
    const day = scheduleDay.value;
    const start = scheduleStart.value;
    const end = scheduleEnd.value;
    const room = scheduleRoom.value.trim();

    // Validasi input form.
    if (course === "") {
        showToast("⚠️ Nama mata kuliah/kegiatan belum diisi.");
        return;
    }

    if (day === "") {
        showToast("⚠️ Hari belum dipilih.");
        return;
    }

    if (start === "") {
        showToast("⚠️ Waktu mulai belum diisi.");
        return;
    }

    if (end === "") {
        showToast("⚠️ Waktu selesai belum diisi.");
        return;
    }

    if (room === "") {
        showToast("⚠️ Ruangan belum diisi.");
        return;
    }

    if (end <= start) {
        showToast("⚠️ Waktu selesai harus setelah waktu mulai.");
        return;
    }

    // Jika sedang edit, ubah data jadwal yang lama.
    if (editScheduleId !== null) {
        const schedule = schedules.find(function (item) {
            return item.id === editScheduleId;
        });

        if (!schedule) {
            return;
        }

        schedule.course = course;
        schedule.day = day;
        schedule.start = start;
        schedule.end = end;
        schedule.room = room;

        saveSchedules();
        showToast("✅ Jadwal berhasil diperbarui.");
    } else {
        // Jika tidak sedang edit, tambahkan jadwal baru.
        const newSchedule = {
            id: Date.now(),
            course: course,
            day: day,
            start: start,
            end: end,
            room: room
        };

        schedules.push(newSchedule);
        saveSchedules();
        showToast("✅ Jadwal berhasil ditambahkan.");
    }

    renderSchedule();
    closeScheduleModalWindow();
});

// =========================================================
// EDIT JADWAL
// =========================================================
function editSchedule(id) {
    const schedule = schedules.find(function (item) {
        return item.id === id;
    });

    if (!schedule) {
        return;
    }

    editScheduleId = id;
    scheduleCourse.value = schedule.course;
    scheduleDay.value = schedule.day;
    scheduleStart.value = schedule.start;
    scheduleEnd.value = schedule.end;
    scheduleRoom.value = schedule.room;
    scheduleModalTitle.textContent = "Edit Jadwal";

    openScheduleModal();
}

// =========================================================
// HAPUS JADWAL
// =========================================================
function deleteSchedule(id) {
    deleteScheduleId = id;
    deleteConfirmModal.classList.add("show");
}

// Tombol batal hapus.
cancelDeleteButton.addEventListener("click", function () {
    deleteConfirmModal.classList.remove("show");
    deleteScheduleId = null;
});

// Tombol konfirmasi hapus.
confirmDeleteButton.addEventListener("click", function () {
    if (deleteScheduleId === null) {
        return;
    }

    schedules = schedules.filter(function (schedule) {
        return schedule.id !== deleteScheduleId;
    });

    saveSchedules();
    deleteConfirmModal.classList.remove("show");
    deleteScheduleId = null;

    renderSchedule();
    showToast("🗑️ Jadwal berhasil dihapus.");
});

// =========================================================
// INITIAL RENDER
// =========================================================
renderSchedule();
