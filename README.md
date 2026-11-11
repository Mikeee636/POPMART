# POP MART Studio — Admin Dashboard (Frontend Only)

Aplikasi **Dashboard Admin Pop Mart** modern berbasis **React** dan **Tailwind CSS** tanpa backend (Client-side with LocalStorage Persistence). Dirancang khusus untuk pengelolaan toko figur & blind box Pop Mart (Labubu, Molly, Crybaby, Skullpanda, Dimoo, Hirono, dll) dengan fokus utama pada **Manajemen Produk** dan **Manajemen Pengguna**, dilengkapi analitik lengkap dan pengelolaan pesanan.

---

## 🚀 Fitur Utama

### 1. Overview Dashboard (Analytics)
- **Kartu Ringkasan KPI**: Total Pendapatan (IDR), Total Transaksi, Produk Aktif vs Habis, dan Kolektor Terdaftar.
- **Grafik Tren Pendapatan Interaktif**: Visualisasi area chart bulanan dengan Recharts.
- **Grafik Donat Pangsa Karakter IP**: Distribusi kontribusi penjualan per karakter Pop Mart.
- **Tabel Transaksi Terkini**: 5 pesanan terbaru dengan status badge dan tombol detail cepat.
- **Peringatan Stok Menipis (Low Stock Alert)**: Notifikasi khusus untuk produk dengan sisa stok $\le 10$ unit, lengkap dengan tombol penambahan stok langsung.
- **Leaderboard IP Terlaris**: Peringkat penjualan tertinggi berdasarkan karakter Pop Mart.

### 2. Manajemen Produk (Core Focus)
- **Katalog Lengkap & Pencarian Cepat**: Pencarian instan berdasarkan nama produk atau kode SKU.
- **Filter Multi-Kriteria**:
  - Filter berdasarkan Karakter IP (The Monsters Labubu, Molly, Crybaby, Dimoo, Skullpanda, dll.)
  - Filter berdasarkan Kategori (Blind Box Regular, Mega Collection 400%/1000%, Plush Pendant, dll.)
  - Filter berdasarkan Status Stok (Aman $>10$, Menipis $\le 10$, Habis $=0$)
  - Urutkan (Terbaru, Terlaris, Harga Tertinggi/Terendah, Stok Terbanyak)
- **Tampilan Fleksibel**: Toggle antara **Tampilan Tabel** (Enterprise Data Table) dan **Tampilan Grid Card** visual.
- **CRUD Penuh**:
  - Tambah Produk Baru dengan Auto-generate SKU
  - Edit informasi produk, harga satuan (IDR), deskripsi, dan tipe edisi
  - Ubah stok cepat (*Quick Stock Adjustment*)
  - Hapus produk dengan konfirmasi
- **Ekspor CSV**: Ekspor seluruh daftar katalog ke file CSV untuk Microsoft Excel / Google Sheets.

### 3. Manajemen Pengguna (Core Focus)
- **Pengelolaan Kolektor & Staf**: Filter berdasarkan Peran (Customer, Administrator, Staff Gudang) dan Tier (Bronze, Silver, Gold, Platinum VIP).
- **Statistik Pelanggan**: Menampilkan riwayat transaksi, total belanja seumur hidup (*Lifetime Spending*), dan alamat pengiriman default.
- **Detail Modal Profil**: Menampilkan kartu profil lengkap serta riwayat pesanan yang pernah dibeli oleh pengguna tersebut.
- **Aksi Akun**: Tambah pengguna baru, edit profil, blokir/buka blokir akun (*Toggle Ban*), dan hapus akun.

### 4. Manajemen Pesanan & Transaksi
- **Daftar Pesanan Real-time**: Melacak Order ID, nama pembeli, rincian barang, total tagihan, metode pembayaran (BCA VA, Mandiri VA, QRIS, GoPay, ShopeePay), dan kurir pengiriman (JNE, SiCepat).
- **Faktur & Kelola Status**:
  - Modal faktur lengkap dengan rincian subtotal, ongkir, dan catatan pembeli.
  - Pembaruan status pesanan (*Menunggu Bayar $\rightarrow$ Diproses $\rightarrow$ Dikirim $\rightarrow$ Selesai $\rightarrow$ Dibatalkan*) dan nomor resi pengiriman kurir.

### 5. Master Data (Kategori & Karakter IP)
- **Karakter IP Pop Mart**:
  - Tambah & Edit Karakter IP (Nama Karakter, Nama Kreator/Artist, Warna Tema Badge, URL Avatar/Poster, Filosofi Karakter).
  - Terintegrasi langsung dengan pilihan filter dan dropdown form produk.
- **Kategori Produk**:
  - Tambah & Edit Kategori (Nama, Slug, Deskripsi).
  - Validasi keamanan: Kategori tidak dapat dihapus jika masih digunakan oleh produk aktif.

### 6. Desain UI/UX Modern
- **Mode Gelap & Terang (Dark / Light Mode)** dengan toggle instan dan tersimpan di preferensi pengguna.
- **Notifikasi Toast**: Umpan balik visual dinamis setiap kali data disimpan, diperbarui, atau dihapus.
- **Pemberitahuan Toko**: Dropdown notifikasi pesanan dan stok di navbar atas.
- **Persistensi Lokal (LocalStorage)**: Seluruh data tersimpan otomatis di browser tanpa membutuhkan backend server.
- **Tombol Reset Demo Data**: Memungkinkan pengembalian data contoh awal kapan saja dengan 1 klik.

---

## 🛠️ Teknologi yang Digunakan
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts / Visualisasi**: [Recharts](https://recharts.org/)
- **Tipografi**: Google Font [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Penyimpanan State**: React Context API + Browser LocalStorage

---

## 💻 Cara Menjalankan Proyek

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka URL yang muncul di terminal (biasanya `http://localhost:5173/`).

2. **Build untuk Production**:
   ```bash
   npm run build
   ```
   File hasil build siap didistribusikan di folder `dist/`.

3. **Preview Hasil Build**:
   ```bash
   npm run preview
   ```


---

## 🛍️ Storefront + Admin dalam Satu App (Routing)

App ini sekarang berisi dua aplikasi dengan **react-router-dom (HashRouter)**, jadi tidak butuh konfigurasi server:

| URL | Isi |
|-----|-----|
| `/#/` | **Storefront** toko POP MART (mobile < 1024px, web >= 1024px) |
| `/#/admin` | **Dashboard Admin** (punya halaman login sederhana sendiri) |

- Kode storefront ada di `src/storefront/` (data mock, state keranjang/wishlist in-memory, 11 layar), asetnya di `public/storefront/`.
- Dashboard admin tetap di `src/` (`App.jsx`, `views/`, `components/`) dan di-load lazy hanya saat `/admin` dibuka.
- Navigasi antar app: tombol **Masuk sebagai Admin** di layar Masuk toko, menu **Dashboard Admin** di layar Saya, serta **Lihat Toko** di menu profil admin dan **Kembali ke toko** di halaman login admin.
- Login bersifat demo (client-side, tersimpan di localStorage), bukan autentikasi sungguhan. Kredensial admin: `admin@popmart.co.id` / `admin123`.

```bash
npm install
npm run dev     # http://localhost:5173/#/  dan  /#/admin
npm run build
```
