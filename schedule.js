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
