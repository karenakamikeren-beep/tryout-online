# Checklist Setup Prisma Postgres untuk Vercel

## ✅ Checklist Sebelum Populate Database

### 1. Cek Vercel Deployment Status
🔗 URL: https://vercel.com/meta-firmansyahs-projects/tryout-online/deployments

**Latest commit harusnya:**
- `365e5d8` - feat: Add health check API endpoint for database connection

**Status deployment:**
- ⏳ Building - Tunggu selesai
- ✅ Ready - Lanjut ke langkah 2
- ❌ Error - Lihat Build Logs

---

### 2. Setup Prisma Postgres di Vercel Environment Variables

🔗 URL: https://vercel.com/meta-firmansyahs-projects/tryout-online/settings/environment-variables

**Tambahkan 2 Environment Variables:**

**Variable 1: DATABASE_URL**
```
Name: DATABASE_URL
Value: prisma://<connection-string-dari-prisma-postgres>
Environment: ✅ Production ✅ Preview ✅ Development
```

**Variable 2: DIRECT_URL** (Opsional tapi recommended)
```
Name: DIRECT_URL
Value: postgres://<direct-connection-string-dari-prisma-postgres>
Environment: ✅ Production ✅ Preview ✅ Development
```

---

### 3. Cara Mendapatkan Connection String dari Prisma Postgres

**A. Login ke Prisma Postgres:**
🔗 URL: https://cloud.prisma.io

**B. Pilih Project:**
- Cari project yang sudah ada atau buat baru
- Klik project

**C. Copy Connection Strings:**

**1. Prisma Accelerator URL (untuk DATABASE_URL)**
- Cari button "Connect" atau ".env"
- Copy URL yang dimulai dengan `prisma://`
- Contoh format:
  ```
  prisma://aws-0-ap-southeast-1.pooler.prisma-data.com:5432/your-db?schema=public
  ```

**2. Direct Connection URL (untuk DIRECT_URL)**
- Di dashboard Prisma Postgres
- Cari section connection details
- Copy direct connection URL (biasanya `postgres://`)
- Contoh format:
  ```
  postgres://user:password@aws-0-ap-southeast-1.pooler.prisma-data.com:5432/your-db?schema=public
  ```

---

### 4. Set Environment Variables di Vercel (Step-by-step)

1. Buka: https://vercel.com/meta-firmansyahs-projects/tryout-online/settings/environment-variables

2. Klik tombol "New Variable"

3. Isi untuk DATABASE_URL:
   - **Name:** `DATABASE_URL`
   - **Value:** Paste Prisma Accelerator URL dari langkah 3
   - **Environments:** Checklist semua:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Klik "Add" atau "Save"

4. Klik tombol "New Variable" lagi

5. Isi untuk DIRECT_URL:
   - **Name:** `DIRECT_URL`
   - **Value:** Paste Direct Connection URL dari langkah 3
   - **Environments:** Checklist semua:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Klik "Add" atau "Save"

6. Setelah disimpan, Vercel akan otomatis redeploy

---

### 5. Tunggu Vercel Redeploy Selesai

**Cek deployment:**
🔗 URL: https://vercel.com/meta-firmansyahs-projects/tryout-online/deployments

**Tunggu sampai:**
- Status = ✅ Ready (Hijau)
- Waktu = Biasanya 2-3 menit

---

### 6. Test Database Connection

Setelah deployment Ready, akses:
🔗 URL: https://tryout-online.vercel.app/api/health

**Expected Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "tryoutCount": 0,
  "timestamp": "2024-01-03T..."
}
```

**Jika Error Response:**
```json
{
  "status": "error",
  "database": "not connected",
  "error": "..."
}
```
→ Copy error dan share untuk diagnosa

---

### 7. Seed Database

Setelah health check sukses:
1. Buka: https://tryout-online.vercel.app/
2. Klik tombol "Mulai Populate Database"
3. Tunggu notifikasi sukses

---

## 🔍 Troubleshooting

### Problem 1: Masih 404 untuk API

**Cause:** Vercel belum deploy code terbaru

**Solution:**
1. Cek deployment status di Vercel
2. Tunggu sampai Ready (hijau)
3. Refresh browser

### Problem 2: Health Check Error

**Error: "Connection timeout"**
**Cause:** Connection string salah atau database belum siap

**Solution:**
1. Cek Prisma Postgres dashboard
2. Pastikan database sudah aktif
3. Copy connection string lagi
4. Update Vercel environment variables

**Error: "Authentication failed"**
**Cause:** Connection string salah atau password expired

**Solution:**
1. Regenerate connection string di Prisma Postgres
2. Update di Vercel environment variables

**Error: "Database not found"**
**Cause:** Schema belum dibuat di Prisma Postgres

**Solution:**
1. Buka Prisma Postgres dashboard
2. Run schema migration jika perlu
3. Pastikan schema sama dengan prisma/schema.prisma

### Problem 3: Seed Gagal

**Error: "Data already seeded"**
**Solution:** Sudah ada data, tidak perlu seed lagi

**Error: "Failed to seed database"**
**Solution:**
1. Pastikan health check sukses dulu
2. Cek log error di browser console
3. Share error untuk diagnosa

---

## 📋 Summary Checklist

- [ ] Vercel deployment status = Ready (hijau)
- [ ] Buka Prisma Postgres dashboard
- [ ] Copy Prisma Accelerator URL
- [ ] Copy Direct Connection URL
- [ ] Set DATABASE_URL di Vercel environment variables
- [ ] Set DIRECT_URL di Vercel environment variables
- [ ] Wait for Vercel redeploy (Ready)
- [ ] Test /api/health endpoint (status: ok)
- [ ] Test /api/tryouts endpoint
- [ ] Click "Mulai Populate Database"
- [ ] Verify data seeded successfully

---

## 💡 Tips

1. **Selalu gunakan Prisma Accelerator URL** untuk serverless (Vercel)
2. **Jangan hardcode connection string** di code
3. **Set semua environments** (Production, Preview, Development)
4. **Refresh browser** setelah redeploy selesai
5. **Cek build logs** jika error di Vercel deployment
