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
