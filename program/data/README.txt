Panduan Mengisi File programs.csv
=================================

File ini digunakan untuk menampilkan program di halaman Program.
Semua data program dikelola dari file CSV ini, jadi admin cukup edit file ini tanpa harus menyentuh kode HTML atau JavaScript.

Lokasi file:
- program/data/programs.csv

Struktur kolom:
----------------

id
  - ID unik program, misalnya: edu-001, job-001, magang-001, vok-001
  - Gunakan format yang konsisten dan unik per program.

title
  - Judul program utama yang muncul di daftar.
  - Contoh: Pendidikan Keterampilan Komputer

category
  - Kategori program.
  - Pilihan yang tersedia:
    * Pendidikan
    * Lowongan Pekerjaan
    * Magang
    * Vokasional

location
  - Lokasi program.
  - Contoh: Rancaekek, Bandung, Online

deadline
  - Tanggal batas pendaftaran atau tanggal berakhirnya program.
  - Bisa ditulis dalam format yang mudah dibaca, misalnya:
    * 2026-12-31
    * 20 Oktober 2026
    * Buka sepanjang tahun

description
  - Deskripsi singkat program yang ditampilkan di kartu.
  - Ditulis dalam satu kalimat singkat atau 1-2 kalimat.

detail_title
  - Judul yang muncul di modal detail.
  - Biasanya sama atau sedikit lebih spesifik dari title.

detail_summary
  - Ringkasan singkat yang muncul di bagian awal modal.
  - Cocok untuk satu kalimat pekan.

detail_description
  - Penjelasan lengkap program untuk modal detail.
  - Bisa berisi 2-4 kalimat atau paragraf pendek.

requirements
  - Persyaratan peserta, misalnya: usia, pendidikan, kemampuan, atau syarat admin.
  - Jika lebih dari satu syarat, pisahkan dengan semicolon (;) agar mudah dibaca.

benefits
  - Manfaat atau keuntungan program bagi peserta.
  - Jika lebih dari satu manfaat, pisahkan dengan semicolon (;).

email
  - Alamat email tujuan untuk tombol Lamar.
  - Contoh: rekrutmen@slb-yapmi.sch.id
  - Jika kosong, tombol Lamar akan disembunyikan.

status
  - Status program.
  - Pilihan umum:
    * Aktif
    * Terbuka
    * Ditutup
    * Segera Dibuka

Catatan penting:
-----------------

1. Gunakan tanda koma sebagai pemisah kolom.
2. Jika deskripsi mengandung koma, maka bungkus dengan tanda kutip dua (").
3. Jangan hapus header kolom di baris pertama.
4. Setiap baris harus berisi satu program.
5. Nama kategori harus sama persis seperti pilihan yang ada di file.

Contoh isi yang benar (versi lengkap untuk modal):
--------------------------------------------------

id,title,category,location,deadline,description,detail_title,detail_summary,detail_description,requirements,benefits,email,status
edu-001,Pendidikan Keterampilan Komputer,Pendidikan,Rancaekek,2026-12-31,"Pelatihan dasar komputer untuk peserta didik dan orang tua.","Keterampilan Komputer untuk Peserta Didik","Program pelatihan komputer yang membantu peserta meningkatkan kemampuan digital dasar.","Program ini bertujuan membekali peserta dengan kemampuan komputer dasar agar lebih siap menghadapi kebutuhan pembelajaran dan kehidupan sehari-hari. Kegiatan dilakukan dengan pendekatan praktis dan sesuai tingkat kemampuan peserta.","Usia minimal 12 tahun; memiliki minat belajar digital; bersedia mengikuti seluruh sesi pelatihan","Meningkatkan kemampuan digital; membangun rasa percaya diri; siap mengikuti pembelajaran berbasis teknologi","rekrutmen@slb-yapmi.sch.id",Aktif
job-001,Staff Administrasi,Lowongan Pekerjaan,Bandung,2026-10-20,"Membutuhkan staf administrasi untuk mendukung operasional sekolah.","Lowongan Staff Administrasi","Posisi administrasi untuk mendukung kelancaran operasional harian sekolah.","Staff administrasi berperan penting dalam menjaga kelancaran dokumentasi, komunikasi, dan pencatatan kegiatan sekolah. Kandidat yang dipilih diharapkan rapi, teliti, dan mampu bekerja dalam tim.","Pendidikan minimal SMA/SMK; mampu mengoperasikan komputer; teliti dan disiplin; siap bekerja sesuai jadwal","Pengalaman kerja terstruktur; lingkungan kerja profesional; peluang pengembangan karier","rekrutmen@slb-yapmi.sch.id",Terbuka
magang-001,Magang Multimedia,Magang,Rancaekek,2026-11-15,"Program magang multimedia untuk siswa dan alumni.","Magang Multimedia di Sekolah","Magang ini memberikan pengalaman kerja yang relevan di bidang multimedia dan digital creation.","Peserta akan belajar dasar desain grafis, editing video, dan pengelolaan konten digital. Program ini cocok bagi peserta yang tertarik mengembangkan keterampilan kreatif dan teknologi.","Memiliki minat di bidang multimedia; bersedia mengikuti kegiatan magang; komunikatif dan aktif","Menambah pengalaman kerja; meningkatkan portofolio; melatih kreativitas dan kolaborasi","rekrutmen@slb-yapmi.sch.id",Terbuka
vok-001,Program Tata Busana,Vokasional,Rancaekek,2026-11-30,"Pelatihan keterampilan tata busana dan menjahit.","Pelatihan Tata Busana Praktis","Program ini membantu peserta mengembangkan kemampuan menjahit dan tata busana.","Peserta akan dibimbing dalam teknik dasar menjahit, pemilihan bahan, dan pembuatan produk sederhana. Program ini dibuat untuk memperkuat kemandirian dan keterampilan hidup peserta.","Minat pada bidang busana; siap mengikuti latihan rutin; disiplin dalam mengikuti jadwal","Meningkatkan keterampilan fungsional; menambah kreativitas; mendukung kemandirian","rekrutmen@slb-yapmi.sch.id",Aktif

Contoh tambahan jika ingin menambah program baru:
---------------------------------------------------

job-002,Petugas Kebersihan,Lowongan Pekerjaan,Rancaekek,2026-10-30,"Membutuhkan petugas kebersihan untuk menjaga kebersihan lingkungan sekolah.","Lowongan Petugas Kebersihan","Posisi yang membantu menjaga kebersihan dan kenyamanan lingkungan sekolah.","Petugas kebersihan bertanggung jawab atas kebersihan ruang kelas, area umum, dan fasilitas sekolah. Kandidat yang dipilih diharapkan disiplin, teliti, dan peduli terhadap lingkungan.","Pendidikan minimal SMP; bersedia bekerja sesuai jadwal; dapat menjaga kebersihan lingkungan","Lingkungan kerja nyaman; pengalaman kerja terstruktur; kontribusi nyata untuk sekolah","rekrutmen@slb-yapmi.sch.id",Terbuka

Jika ingin menutup program:
---------------------------
Ubah kolom status menjadi:
- Ditutup
- Segera Dibuka
- Aktif

Semua program yang ditulis di CSV akan otomatis muncul di halaman Program.

Jika ada program yang tidak perlu muncul, cukup hapus baris datanya dari CSV.
