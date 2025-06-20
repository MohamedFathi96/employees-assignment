# 🧑‍💻 Employee Management App

This repository contains a **full-stack Employee Management application** built with:

- **Frontend:** Next.js 15 (App Router), TailwindCSS, TanStack Table, React Hook Form + Zod
- **Backend:** Node.js + Express + TypeORM
- **Database:** Postgres
- **Docker Compose:** to spin up the DB and backend easily

---

## 📜 Submission Instructions

### ✅ What’s included:

- **Frontend** (`frontend/`)
- **Backend** (`backend/`)
- **Docker Compose** file (`docker-compose.yml`)
- Example env files (`env.example`)
- Seed user for quick testing

---

## 🐳 Running Backend & Database

We use **Docker Compose** to run:

- A **Postgres** container
- The **Express/TypeORM** backend

### 🔧 Steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/employee-management-app.git
   cd employee-management-app

   ```

2. Run backend seeder:
   ```
   npm install
   npm run seed
   ```
3. Run backend & database:
   ```
    docker-compose up
   ```
4. Run frontend:
   ```
    npm install
    npm run build
    npm run start
   ```

🧰 Technologies Used
Frontend: Next.js 15 (App Router), Tailwind CSS, TanStack Table, React Hook Form, Zod

Backend: Node.js, Express, TypeORM

Database: Postgres

Tooling: Docker Compose

📝 Notes & Assumptions
Backend is decoupled from the frontend — all data is fetched via the REST API.

Backend contains seed.

Backend expects Postgres to be running at db:5432 (as per docker-compose.yml config).

All environment variables and credentials can be customized in the env.example files.
