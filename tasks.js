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