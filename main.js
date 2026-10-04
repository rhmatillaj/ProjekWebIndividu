/* =========================================================
   TASKUY - SHARED DATA & UTILITIES
   Data tugas/jadwal, Local Storage, dan utilitas bersama.
   ========================================================= */

let tasks = [];
let schedules = [];

// ---------------------------------------------------------
// LOAD DATA
// ---------------------------------------------------------
function loadArray(key) {
    try {
        const savedData = localStorage.getItem(key);
        const parsedData = savedData ? JSON.parse(savedData) : [];
        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        console.warn(`Data ${key} tidak dapat dibaca. Menggunakan data kosong.`);
        return [];
    }
}

tasks = loadArray("taskuy_tasks");
schedules = loadArray("taskuy_schedules");

// ---------------------------------------------------------
// SAVE DATA
// ---------------------------------------------------------
function saveTasks() {
    localStorage.setItem("taskuy_tasks", JSON.stringify(tasks));
}

function saveSchedules() {
    localStorage.setItem("taskuy_schedules", JSON.stringify(schedules));
}