# ProjekWebIndividu

# TasKuy

TasKuy adalah web dashboard produktivitas mahasiswa yang digunakan untuk membantu mencatat tugas kuliah dan mengatur jadwal kegiatan perkuliahan dalam satu tampilan.

## Fungsi dan Tujuan

TasKuy dibuat untuk memudahkan mahasiswa dalam:
- melihat ringkasan tugas dan jadwal;
- menambahkan, mengubah, dan menghapus tugas;
- mencari, memfilter, dan mengurutkan tugas;
- menandai tugas yang sudah selesai;
- menambahkan, mengubah, dan menghapus jadwal;
- mengatur jadwal melalui fitur drag and drop;
- menyimpan data sementara menggunakan Local Storage browser.

## Fitur Utama

### Dashboard
- Menampilkan statistik tugas.
- Menampilkan tugas yang akan datang.
- Menampilkan jadwal hari ini.
- Menampilkan progress tugas secara dinamis.

### My Tasks
- Tambah tugas.
- Edit tugas.
- Hapus tugas.
- Tandai tugas selesai.
- Pencarian tugas.
- Filter status dan prioritas.
- Pengurutan berdasarkan deadline/prioritas.
- Notifikasi menggunakan toast.

### Schedule
- Tambah jadwal.
- Edit jadwal.
- Hapus jadwal.
- Tampilan jadwal berdasarkan hari.
- Drag and drop jadwal.
- Penyimpanan jadwal menggunakan Local Storage.

## Teknologi yang Digunakan

- **HTML5** untuk struktur halaman dan elemen semantik.
- **CSS3** untuk desain, Flexbox, CSS Grid, dan Responsive Web Design.
- **JavaScript** untuk DOM manipulation, event handling, Array of Objects, filtering, sorting, validasi, drag and drop, dan Local Storage.

## Struktur Project

```text
TasKuy/
├── index.html
├── tasks.html
├── schedule.html
├── style.css
├── main.js
├── dashboard.js
├── tasks.js
├── schedule.js
└── README.md
```

## Cara Menjalankan

1. Download atau clone repository TasKuy.
2. Buka folder project di Visual Studio Code.
3. Buka `index.html` menggunakan browser atau Live Server.
4. Gunakan menu navigasi untuk berpindah ke halaman Tasks dan Schedule.

## Konsep JavaScript

Data tugas dan jadwal disimpan dalam bentuk **Array of Objects**. JavaScript kemudian memproses data tersebut menggunakan fungsi, percabangan, perulangan, filter, sorting, dan manipulasi DOM.

Data yang dibuat pengguna disimpan pada **Local Storage**, sehingga data tetap tersedia ketika halaman dimuat kembali pada browser yang sama.

## Link Project

- **Figma:** [Masukkan link Figma di sini]
- **GitHub Repository:** [Masukkan link GitHub di sini]
- **Live Demo:** [Masukkan link GitHub Pages di sini]

## Catatan

Project ini dibuat sebagai tugas individu pengembangan web dengan fokus pada desain UI/UX, struktur HTML5, responsive CSS, serta interaktivitas JavaScript dan manipulasi DOM.
