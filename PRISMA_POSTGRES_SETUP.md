# Setup Prisma Postgres untuk TryoutOnline

## Langkah-langkah Setup Prisma Postgres di Vercel

### 1. Buka Prisma Postgres Dashboard
https://cloud.prisma.io

### 2. Copy Connection String

Prisma Postgres menyediakan 2 jenis connection string:

**A. Prisma Accelerator URL (RECOMMENDED for Vercel)**
- Copy URL yang biasanya format:
  ```
  prisma://aws-0-ap-southeast-1.pooler.prisma-data.com:5432/your-db?schema=public
  ```

**B. Direct Connection URL (Tanpa pooler)**
- Copy URL yang biasanya format:
  ```
  postgres://user:password@aws-0-ap-southeast-1.pooler.prisma-data.com:5432/your-db?schema=public
  ```

### 3. Set Environment Variables di Vercel

Buka: https://vercel.com/meta-firmansyahs-projects/tryout-online/settings/environment-variables

**Add 2 variables:**

**Variable 1: DATABASE_URL**
- Name: `DATABASE_URL`
- Value: Paste **Prisma Accelerator URL** (dengan `prisma://`)
- Environment: ✅ Production, ✅ Preview, ✅ Development
- Klik "Save"

**Variable 2: DIRECT_URL** (Optional, untuk koneksi langsung tanpa pooler)
- Name: `DIRECT_URL`
- Value: Paste **Direct Connection URL** (dengan `postgres://`)
- Environment: ✅ Production, ✅ Preview, ✅ Development
- Klik "Save"

### 4. Set Redeploy Vercel

Setelah environment variables diset:
- Vercel akan otomatis redeploy
- Atau manual: Klik tab "Deployments" → "Redeploy"
- Tunggu 2-3 menit

### 5. Seed Database

Setelah deployment sukses:
1. Buka: https://tryout-online.vercel.app/
2. Klik tombol "Mulai Populate Database"
3. Database akan terisi di Prisma Postgres

---

## Troubleshooting

### Error: "Failed to fetch tryouts"

**Cek 1: Apakah DATABASE_URL sudah diset?**
- Buka Vercel Settings → Environment Variables
- Pastikan `DATABASE_URL` sudah ada dengan value Prisma Accelerator URL

**Cek 2: Apakah connection string benar?**
- Format harus: `prisma://...` (bukan `file://...`)
- Harus dari Prisma Postgres dashboard

**Cek 3: Apakah deployment sudah selesai?**
- Cek tab "Deployments" di Vercel
- Pastikan status hijau (Ready)

### Error: "Can't reach database server"

**Solusi:**
- Cek IP whitelist di Prisma Postgres dashboard
- Pastikan connection string tidak ada typo
- Refresh environment variables dan redeploy

---

## Catatan Penting

- **Prisma Accelerator URL** lebih cepat untuk serverless (Vercel)
- Selalu gunakan connection string dari Prisma Postgres dashboard
- Jangan hardcode di code, gunakan environment variables
