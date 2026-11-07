# Setup and Installation

## Prerequisites
- Python 3.13 (3.15 fails to build the pinned packages)
- Redis, optional for local development (needed for Celery and the Redis cache)
- A SendGrid API key, only if you want real email

## 1. Install

Windows:
```
python -m venv venv
venv\Scripts\pip install -r backend\requirements.txt
```
Linux and macOS:
```
python3 -m venv venv
venv/bin/pip install -r backend/requirements.txt
```

## 2. Configure environment variables

Copy `.env.example` to `.env` and edit it. The app reads these from the process environment, so export them in your shell (or use a tool that loads `.env`).

| Variable | Default | Purpose |
|----------|---------|---------|
| `JWT_SECRET_KEY` | `dev-only-change-me` | Secret used to sign login tokens. **Set a long random value.** |
| `SENDGRID_API_KEY` | empty | SMTP password for SendGrid. Email will not send without it. |
| `MAIL_DEFAULT_SENDER` | `noreply@example.com` | From address on emails |
| `REDIS_URL` | `redis://localhost:6379/0` | Celery broker and result backend |
| `USE_REDIS_CACHE` | `0` | `1` uses Redis for caching; `0` uses an in-memory cache |
| `FLASK_DEBUG` | `0` | `1` enables Flask debug mode. Never use it in production. |

## 3. Run the app
```
cd backend
..\venv\Scripts\python app.py      # Windows
../venv/bin/python app.py          # Linux/macOS
```
- App: http://127.0.0.1:5000/
- Swagger: http://127.0.0.1:5000/apidocs/

The SQLite database is created automatically at `backend/instance/db.sqlite` on the first request.

## 4. Create the admin account

Registration only allows the `customer` and `professional` roles, and the code has no admin seeding. Create the admin once from the `backend` folder:

```python
from app import app
from models import db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()
    db.session.add(User(username="admin",
                        password=generate_password_hash("choose-a-strong-password", method="pbkdf2:sha256"),
                        role="admin", approve=True, blocked=False))
    db.session.commit()
```
Save it as a temporary script in `backend/`, run it, then delete it. Log in at `/admin/login`.

## 5. Background jobs (optional)

Start Redis, then in two more terminals from `backend`:
```
celery -A app.celery worker --loglevel=info --pool=solo     # --pool=solo is needed on Windows
celery -A app.celery beat --loglevel=info
```

| Task | Schedule | What it does |
|------|----------|--------------|
| `tasks.send_daily_reminders` | 18:00 daily | Posts a reminder about pending requests to a chat webhook |
| `tasks.send_monthly_activity_report` | 08:00 on the 1st | Emails each customer an HTML activity report |
| `export_service_requests` | on demand (admin) | Builds a CSV of a professional's requests |

Both scheduled tasks currently contain hardcoded demo values. See [SECURITY.md](SECURITY.md).

## Notes
- Uploads are saved to `backend/uploads/` (png, jpg, jpeg, gif, pdf, max 16 MB). Create the folder if it doesn't exist.
