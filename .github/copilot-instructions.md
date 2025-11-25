<!-- .github/copilot-instructions.md for Exdells Website repository -->
# Copilot instructions — Exdells Website

This file contains concise, actionable guidance for an AI coding agent working on this repository.

- **Big picture**: Fullstack single-repo app. Frontend is a Vite + React + Tailwind SPA in `/frontend`. Backend is an Express + Sequelize (Postgres) API in `/backend`. Docker and Compose files orchestrate Postgres, backend, and an Nginx-served frontend for production.

- **Key entry points**:
  - Backend server: `backend/server.js` (starts Express, mounts routes `/api/auth`, `/api/leads`, `/api/projects`, serves `/uploads`).
  - Frontend app: `frontend/src/main.jsx` and `frontend/index.html` (Vite dev server, proxied API to backend via `vite.config.js`).

- **How to run locally (exact steps)**:
  - Recommended (sqlite fallback, easiest):
    ```powershell
    cd "d:\Exdells Website\backend"
    copy .env.development .env
    npm install
    npm run dev   # nodemon server.js, uses sqlite when DATABASE_URL not set

    cd "d:\Exdells Website\frontend"
    npm install
    npm run dev   # Vite on :5173
    ```
  - With Postgres (local or docker): set `DATABASE_URL` in `backend/.env` and run `npm run dev` in backend.
  - Docker Compose (development/production):
    ```powershell
    docker compose up --build
    # or for production compose file
    docker compose -f docker-compose.prod.yml up --build -d
    ```

- **Important scripts**:
  - `backend`: `npm run dev` (nodemon), `npm start` (node). See `backend/package.json`.
  - `frontend`: `npm run dev`, `npm run build`, `npm run preview`. See `frontend/package.json`.

- **Environment variables to watch**:
  - `DATABASE_URL` — if missing, backend falls back to a local sqlite file (`backend_dev.sqlite` via `sqlite3` dependency).
  - `JWT_SECRET` — used by `/api/auth` to sign tokens. Default fallback `'secret'` is present in code; **always set a secure value for production**.
  - `CORS_ORIGIN` — optional origin whitelist; default to permissive in dev.
  - `PORT` — backend port (default 4000).

- **Sequelize & migrations**:
  - `backend/server.js` calls `sequelize.authenticate()` and in non-production runs `sequelize.sync({ alter: true })` for convenience.
  - There is a SQL init file at `backend/migrations/init.sql` for manual or containerized initialization — prefer using the SQL file or proper migrations in production.

- **Routing and patterns**:
  - API routes live in `backend/src/routes/*.js` and use models from `backend/src/models`.
  - `auth` example: `POST /api/auth/register` and `POST /api/auth/login` use `User` model. Passwords are stored as `passwordHash` (see `backend/src/routes/auth.js`).
  - File uploads use `multer` (dependency) and uploaded files are served from `/uploads` (static folder at repository root `backend/uploads`).

- **Security & production notes (what the agent must respect)**:
  - Do not assume `sequelize.sync({ alter: true })` is acceptable in production; follow existing comment in `server.js` — use migrations or `init.sql` for schema changes.
  - Never hard-code secrets. If changing authentication code, ensure `JWT_SECRET` usage remains configurable.

- **Conventions & code style patterns**:
  - Error responses are minimal JSON objects (e.g., `{ error: 'Invalid' }` or `{ error: 'Missing' }`). Follow that concise style when adding new endpoints or validation.
  - Where present, prefer small helper modules under `backend/src/` (config, middleware, models). Keep route handlers thin and call model methods on `../models`.
  - Frontend uses simple component structure in `frontend/src/components`. Prefer using `lib/api.js` for central API calls.

- **Integration points**:
  - Docker: `Dockerfile.backend`, `Dockerfile.frontend`, `docker-compose.yml`, `docker-compose.prod.yml` — changes to ports/env should be mirrored in these files.
  - PM2: there is `backend/ecosystem.config.js` for process management in some deployments.
  - Uploads: `backend/uploads` is a mounted/static folder; for production consider replacing with S3-compatible storage if modifying upload logic.

- **Testing & debugging tips specific to this repo**:
  - To reproduce DB issues quickly in dev, use sqlite fallback by omitting `DATABASE_URL` and check `backend/backend_dev.sqlite` file.
  - To inspect server logs in Docker Compose: `docker compose logs -f backend` (or use the `-f` production compose file path).
  - When adding routes, ensure they are mounted by `server.js` and that CORS is compatible with `vite` dev origin (default dev host `http://localhost:5173`).

- **Examples (quick copy-paste)**:
  - Create a test user (dev):
    ```powershell
    curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Admin","email":"admin@example.com","password":"pass1234"}'
    ```
  - Log in and get token:
    ```powershell
    curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"pass1234"}'
    ```

- **Where to look first when tasks are ambiguous**:
  - For API surface & data shape: `backend/src/models` and `backend/src/routes/*`.
  - For env, scripts, and run instructions: root `README.md`, `backend/package.json`, `frontend/package.json`.
  - For production deployment: `docker-compose.prod.yml` and `backend/ecosystem.config.js`.

If anything here is unclear or you'd like more examples (e.g., common refactors, adding a new model + route, or how to add tests), tell me which area to expand and I'll iterate.
