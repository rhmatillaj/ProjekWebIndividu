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