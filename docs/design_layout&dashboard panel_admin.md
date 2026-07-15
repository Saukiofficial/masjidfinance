# Design Layout & Dashboard Panel Admin

## ROLE

Kamu adalah Senior UI/UX Designer, Product Designer, dan Senior Frontend Engineer yang memiliki pengalaman membangun dashboard mobile premium seperti:

- Dana
- Flip
- Motion Bank
- Jago
- Apple Wallet
- Tokopedia Seller
- Gojek

Fokus utama adalah membuat dashboard yang **bersih, premium, modern, minimalis, mobile-first**, dengan pengalaman pengguna terbaik.

Jangan membuat layout desktop kemudian dipaksa menjadi mobile.

Dashboard ini harus dirancang dari awal khusus untuk perangkat mobile.

---

# DESIGN PRINCIPLES

Gunakan prinsip berikut:

- Minimalist
- Premium
- Clean
- Elegant
- Spacious
- Modern
- Mobile First
- Soft UI
- Rounded Layout
- Professional

Gunakan whitespace yang cukup.

Jangan membuat tampilan padat.

Jangan memenuhi layar dengan terlalu banyak informasi.

---

# TARGET DEVICE

Dashboard WAJIB dioptimalkan untuk:

- 320px
- 360px
- 375px
- 390px
- 393px
- 414px
- 430px

Tidak boleh ada horizontal scrolling.

Tidak boleh ada elemen keluar layar.

---

# SAFE AREA

Gunakan Safe Area seperti aplikasi native.

```
padding-top: 20px - 24px

padding-left: 20px

padding-right: 20px

padding-bottom: 24px
```

Tidak boleh ada card yang menempel ke tepi layar.

---

# CONTAINER

Gunakan container utama.

```
width:100%

max-width:430px

margin:auto
```

Semua isi dashboard berada di dalam container ini.

---

# TYPOGRAPHY

Gunakan salah satu font berikut:

- Plus Jakarta Sans
- Inter

Hindari font dekoratif.

Gunakan hierarchy yang jelas.

Heading

```
28px

Bold
```

Sub Heading

```
20px

Semi Bold
```

Card Title

```
16px

Medium
```

Description

```
14px

Regular
```

Small Text

```
13px

Regular
```

Nominal

```
28px

Bold
```

---

# COLOR SYSTEM

Background

```
#F8FAFC
```

Card

```
#FFFFFF
```

Primary

```
#16A34A
```

Income

```
#22C55E
```

Expense

```
#EF4444
```

Border

```
#EEF2F7
```

Text Primary

```
#111827
```

Text Secondary

```
#6B7280
```

---

# BORDER RADIUS

Card

```
24px
```

Button

```
16px
```

Bottom Navigation

```
28px
```

Avatar

```
999px
```

---

# SHADOW

Gunakan shadow premium.

```
0 8px 30px rgba(0,0,0,.06)
```

Jangan menggunakan shadow tebal.

---

# SPACING

WAJIB menggunakan sistem 8 Point Grid.

Gunakan hanya:

```
8
12
16
20
24
32
40
```

Tidak boleh menggunakan spacing acak.

---

# LAYOUT STRUCTURE

Dashboard WAJIB memiliki urutan berikut.

```
HEADER

↓

GREETING CARD

↓

SUMMARY CARD

↓

GRAPH

↓

RECENT TRANSACTION

↓

BOTTOM NAVIGATION
```

Urutan tidak boleh berubah.

---

# HEADER

Header terdiri dari:

Kiri

☰ Menu

Tengah

Dashboard

Kanan

Notification

Semua berada dalam satu baris.

Height

```
60px
```

Gunakan Flexbox.

```
justify-content:space-between

align-items:center
```

---

# GREETING CARD

Greeting Card berada tepat di bawah Header.

Isi:

Assalamu'alaikum,

Admin 👋

Semoga hari ini penuh berkah.

Di sebelah kanan terdapat ilustrasi masjid.

Style

- Radius 24px
- Background putih
- Soft Shadow
- Padding 20px

Ukuran

```
height:130px
```

Gunakan Flexbox.

```
Text

Illustration
```

Illustration harus tetap proporsional.

Gunakan

```
object-fit:contain
```

---

# SUMMARY CARD

Gunakan Grid.

```
2 Columns

Gap 16px
```

Susunan

```
Income

Expense

Balance

Transaction
```

Semua card memiliki ukuran identik.

Tidak boleh ada card yang lebih besar.

Isi card:

- Icon
- Title
- Nominal
- Growth

Urutan WAJIB:

```
Icon

Title

Nominal

Growth
```

Nominal harus menjadi fokus utama.

Radius

```
24px
```

Padding

```
20px
```

---

# GRAPH SECTION

Di bawah Summary Card.

Card berisi:

Judul

```
Grafik Pemasukan & Pengeluaran
```

Dropdown

```
7 Hari

30 Hari

90 Hari

1 Tahun
```

Chart memenuhi lebar card.

Height

```
260px
```

Radius

```
24px
```

Padding

```
20px
```

Gunakan Area Chart + Line Chart.

---

# RECENT TRANSACTION

Card berisi daftar transaksi.

Header

```
Transaksi Terbaru

Lihat Semua
```

Item terdiri dari:

Icon

Nama

Deskripsi

Nominal

Tanggal

Layout

```
Icon

Nama
Deskripsi

          Nominal
          Tanggal
```

Gunakan divider tipis.

Padding

```
16px
```

---

# BOTTOM NAVIGATION

WAJIB Fixed.

Isi

Dashboard

Transaksi

Laporan

Menu

Jumlah icon

```
4
```

Height

```
88px
```

Radius atas

```
28px
```

Shadow lembut.

Icon aktif

Hijau.

Icon tidak aktif

Abu.

---

# RESPONSIVE RULE (WAJIB)

Dashboard HARUS Mobile First.

Gunakan:

- Flexbox
- CSS Grid

Hindari absolute positioning.

Gunakan:

```
width:100%

max-width:430px
```

Semua gambar

```
object-fit:contain
```

Semua card

```
flex:1
```

atau

```
grid-template-columns:
repeat(2,1fr)
```

Nominal uang tidak boleh overflow.

Semua teks harus wrap otomatis.

Gunakan:

```
box-sizing:border-box
```

Tambahkan padding bawah agar Bottom Navigation tidak menutupi konten.

```
padding-bottom:120px
```

Semua ukuran harus fluid.

Tidak boleh menggunakan fixed width.

---

# UI CONSISTENCY

Seluruh halaman admin WAJIB menggunakan design system yang sama.

Semua halaman harus memiliki:

- Radius yang sama
- Shadow yang sama
- Font yang sama
- Warna yang sama
- Padding yang sama
- Grid yang sama
- Icon yang sama
- Button yang sama
- Card yang sama

Tidak boleh ada style yang berbeda antar halaman.

---

# PERFORMANCE

Prioritaskan:

- Lazy Loading
- Skeleton Loading
- Smooth Animation
- Fast Rendering

Gunakan animasi maksimal:

```
200ms
```

Gunakan easing:

```
ease-in-out
```

---

# ACCESSIBILITY

Pastikan:

- Kontras warna memenuhi standar.
- Semua tombol memiliki area klik minimal 44x44px.
- Teks mudah dibaca.
- Ikon memiliki label bila diperlukan.

---

# LARANGAN KERAS

AI DILARANG:

❌ Mendesain desktop terlebih dahulu.

❌ Menggunakan ukuran card yang berbeda.

❌ Menggunakan margin acak.

❌ Menggunakan padding acak.

❌ Menggunakan warna terlalu mencolok.

❌ Menggunakan shadow hitam pekat.

❌ Menggunakan border hitam.

❌ Menggunakan font dekoratif.

❌ Menggunakan lebih dari dua jenis font.

❌ Menggunakan ukuran ikon yang tidak konsisten.

❌ Menggunakan absolute positioning untuk layout utama.

❌ Menggunakan width tetap (fixed width).

❌ Membiarkan elemen keluar layar.

❌ Membuat horizontal scrolling.

❌ Membuat tampilan padat.

❌ Mengubah urutan layout dashboard.

❌ Menggunakan style berbeda antar halaman admin.

---

# FINAL GOAL

Dashboard harus memiliki kualitas setara aplikasi finansial premium modern.

Target hasil:

- Premium
- Elegan
- Minimalis
- Sangat rapi
- Mobile Native Feel
- Nyaman digunakan satu tangan
- Konsisten di seluruh halaman
- Responsif sempurna pada semua ukuran layar mobile (320px–430px)
- Mudah dikembangkan untuk modul lain seperti Keuangan, Inventaris, Jamaah, Laporan, dan Pengaturan tanpa mengubah Design System.