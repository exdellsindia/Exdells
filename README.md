# Exdells Fullstack — Frontend + Backend (Production-ready scaffold)

This repository includes:
- Frontend: React + Vite + Tailwind (in /frontend)
- Backend: Node.js + Express + Sequelize(Postgres) (in /backend)
- Dockerfiles for both frontend and backend, and docker-compose for local dev
- PM2 ecosystem file for backend process management
- SQL migrations/init.sql

## Quick local dev (without docker)
1. Start Postgres (create DB) and set DATABASE_URL in backend/.env
2. Backend:
   ```
   cd backend
   npm install
   npm run dev
   ```
3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

Local dev (simpler): use sqlite fallback
- If you don't want to run Postgres locally, the backend will fall back to a local `sqlite` file when `DATABASE_URL` is not set.
- Copy `backend/.env.development` to `backend/.env` and edit if needed (or leave `DATABASE_URL` commented out to use sqlite):

```powershell
cd "d:\Exdells Website\backend"
copy .env.development .env
npm install
# start dev server (uses sqlite file if DATABASE_URL not set)
npm run dev
```

This starts the backend using a local sqlite file `backend_dev.sqlite` (data persists across restarts). The frontend dev server is proxied to the backend by `vite.config.js` so you can run frontend with:

```powershell
cd "d:\Exdells Website\frontend"
npm install
npm run dev
```

Open `http://localhost:5173` and use the Contact form — it will POST to the running backend.

## Run with docker-compose
```
docker compose up --build
```
This starts Postgres, backend (4000), and frontend (8080 via nginx).

## Notes
- Replace placeholder images in frontend/public (solar-sample.jpg)
- Set a strong JWT_SECRET in environment variables for production
- Create admin user via POST /api/auth/register or seed your DB
- Server-side file uploads use Cloudinary (set `CLOUDINARY_*` env vars in `backend/.env`)
- Email notifications are sent when a new lead is created; configure SMTP in `backend/.env` using:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - `EMAIL_FROM` (sender) and `EMAIL_TO` (recipient)

Temporary serverless / instant email option (recommended to get emails quickly):
- We added a Vercel serverless function at `frontend/api/leads.js` that will accept POSTs to `/api/leads` and either forward to your backend (when `BACKEND_URL` is set) or send an email directly using `SENDGRID_API_KEY` or SMTP env vars set in Vercel.
- To enable immediate email delivery on deploy:
  1. Deploy `frontend` to Vercel.
  2. In Vercel project settings, add environment variables:
     - `SENDGRID_API_KEY` (preferred) or `SMTP_HOST` + `SMTP_USER` + `SMTP_PASS`
     - `EMAIL_TO=info@exdells.com`
     - `EMAIL_FROM="Exdells Website" <no-reply@exdells.com>`
  3. Optionally add `BACKEND_URL` to forward leads to the backend once deployed.
- Alternatively, add Firebase Storage client-side upload by creating a Firebase project and adding the following environment variables to the frontend (see `frontend/.env.example`):
  - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_APP_ID`
  - Set Storage rules for your bucket appropriately (for quick testing you can allow client uploads to `leads/*`, but for production prefer authenticated or secure upload approaches).
\
## Production deployment (suggested)

This project includes a production Compose file `docker-compose.prod.yml` that is ready for simple deployments.

Steps:

1. Copy `backend/.env.example` to `backend/.env` and fill values (especially `JWT_SECRET`).

2. Start services:

```powershell
cd "d:\Exdells Website"
docker compose -f docker-compose.prod.yml up --build -d
```

3. Initialize DB schema if your production flow requires it (you can run `backend/migrations/init.sql`):

```powershell
docker cp backend/migrations/init.sql $(docker compose -f docker-compose.prod.yml ps -q db):/init.sql
docker compose -f docker-compose.prod.yml exec db psql -U exdells -d exdells -f /init.sql
```

4. Check logs and health:

```powershell
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f backend
```

Notes:
- For production use a managed Postgres or an external RDBMS and configure `DATABASE_URL` appropriately.
- Store `JWT_SECRET` in a secrets manager, not checked into Git.
- Consider using object storage (S3) for uploaded files instead of mounting a host folder.

