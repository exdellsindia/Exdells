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

