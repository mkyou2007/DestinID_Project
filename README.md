# DestinID_Project

Destin ID adalah aplikasi web untuk eksplorasi destinasi wisata di Indonesia dengan fitur panorama interaktif dan rekomendasi destinasi wisata.

## Struktur Proyek

Proyek ini terdiri dari tiga komponen utama:
- **Frontend**: Aplikasi web interaktif menggunakan Vite, TailwindCSS, dan GSAP
- **Backend**: Server API menggunakan Hapi.js
- **Machine Learning**: Komponen analisis data untuk rekomendasi destinasi

## Prasyarat

- Node.js versi 14.x atau lebih baru
- npm atau yarn
- Git

## Langkah-langkah Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/DestinID_Project.git
cd DestinID_Project
```

### 2. Setup Backend

```bash
cd backend
npm install

# Jalankan server backend
node src/server.js
```

Server backend akan berjalan di `http://localhost:9000`.

### 3. Setup Frontend

```bash
cd frontend
npm install

# Mode development
npm run dev

# Atau build untuk production
npm run build
npm run preview
```

Server frontend development akan berjalan di `http://localhost:5173`.

## Struktur Folder

### Frontend

frontend/

├── dist/ # Build output
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── services/ # API services
│ ├── utils/ # Helper functions
│ ├── main.js # Entry point
│ └── input.css # TailwindCSS input file
├── index.html # Main HTML template
├── panorama.html # Panorama view template
├── package.json # Dependencies and scripts
└── vite.config.js # Vite configuration

### Backend

backend/
├── src/
│ ├── controllers/ # Request handlers
│ ├── data/ # Data files
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── utils/ # Helper functions
│ └── server.js # Entry point
└── package.json # Dependencies and scripts

### Machine Learning

machine-learning/
└── Underrated_Destinations.csv # Dataset untuk rekomendasi destinasi


## Fitur Utama

1. **Halaman Utama**: Menampilkan berbagai destinasi wisata dengan animasi UI menggunakan GSAP
2. **Halaman Detail Destinasi**: Informasi lengkap tentang destinasi tertentu
3. **Panorama Interaktif**: Tampilan 360° dari lokasi destinasi menggunakan Pannellum
4. **Rekomendasi Destinasi**: Algoritma rekomendasi tempat wisata berdasarkan preferensi

## Pengembangan

### Frontend

- Gunakan `npm run dev` untuk development mode dengan hot reload
- Gunakan `npm run build` untuk build production
- Gunakan `npm run lint` dan `npm run format` untuk menjaga konsistensi kode

### Backend

- API berjalan pada port 9000
- Menggunakan Hapi.js untuk routing dan handling requests
- Data disimpan dalam format CSV/JSON dalam folder `data`

## Deployment

### Frontend

Gunakan Vercel atau layanan hosting static site lainnya:

```bash
cd frontend
npm run build
# Deploy folder dist ke web hosting
```

### Backend

```bash
cd backend
# Deploy ke layanan hosting Node.js seperti Heroku, Vercel, atau Railway
```

## Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

[ISC License]
