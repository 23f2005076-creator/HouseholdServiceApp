# A-Z Household Services

A web application that connects customers with household service professionals (plumbing, cleaning, electrical work and so on). An admin approves professionals, manages the service catalogue and monitors activity.

## Roles

| Role | What they can do |
|------|------------------|
| **Admin** | Approve or block customers and professionals, create, edit and delete services, search users and requests, view summary charts, export CSV reports |
| **Customer** | Browse and search services, book a service, close a request with a rating and remarks, view personal summary charts |
| **Professional** | Register with a profile and a document upload, accept or reject incoming requests, view reviews and summary charts |

## Tech stack

- **Backend:** Flask 3, Flask-SQLAlchemy (SQLite), Flask-JWT-Extended, Flask-Caching, Flask-Mail, Flasgger (Swagger)
- **Background jobs:** Celery with Redis (daily reminders, monthly reports, CSV export)
- **Frontend:** Vue 2 and Vue Router (no build step, loaded from CDN), Bootstrap 5, Chart.js
- **Email:** SendGrid over SMTP

## Quick start

```
python -m venv venv
venv\Scripts\pip install -r backend\requirements.txt
copy .env.example .env      # then edit the values
cd backend
..\venv\Scripts\python app.py
```

Open http://127.0.0.1:5000/. Swagger docs are at http://127.0.0.1:5000/apidocs/.

No admin account exists on first run, so create one first. See [docs/SETUP.md](docs/SETUP.md).

## Documentation

| Document | Contents |
|----------|----------|
| [docs/SETUP.md](docs/SETUP.md) | Full install and run guide, environment variables, creating an admin, Celery and Redis |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System components, request flow, caching, scheduled jobs |
| [docs/DATABASE.md](docs/DATABASE.md) | ER diagram, tables, request status lifecycle |
| [docs/API.md](docs/API.md) | Endpoint reference |
| [docs/USER_GUIDE.md](docs/USER_GUIDE.md) | Walkthrough for each role |
| [docs/TESTING.md](docs/TESTING.md) | CI and manual test checklist |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common problems and fixes |
| [docs/SECURITY.md](docs/SECURITY.md) | Security notes and known issues |
| [docs/PROJECT_REPORT.md](docs/PROJECT_REPORT.md) | Report template to complete for submission |

## Project layout

```
backend/    Flask app (app.py), SQLAlchemy models, requirements.txt
frontend/   Vue app: app.js, components/, pages/, utils/router.js, static/css
docs/       Documentation
.github/    CI workflow (flake8 lint)
```
