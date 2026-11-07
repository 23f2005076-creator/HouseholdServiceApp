# Security Notes

## What is in place
- Passwords are hashed with PBKDF2-SHA256.
- JWT authentication with role checks on every protected route.
- Secrets (JWT key, SendGrid key, sender) come from environment variables, not source.
- Flask debug mode is off unless `FLASK_DEBUG=1`.
- Uploads are limited to 16 MB and to png, jpg, jpeg, gif and pdf; filenames go through `secure_filename`.
- New accounts need admin approval before they can log in.

## Known issues to fix before any real deployment

1. **Exposed credentials in `send_daily_reminders` (`backend/app.py`).** A Google Chat webhook URL containing an API key and token is hardcoded. Treat it as compromised: revoke it and move the URL to an environment variable.
2. **Compromised SendGrid key.** The original project hardcoded a SendGrid key, which was public. It must be revoked and replaced.
3. **Hardcoded email recipient** in `send_monthly_activity_report`. Every customer's report goes to one demo address. It should use the customer's own email, and users have no email field yet.
4. **Weak default JWT secret.** If `JWT_SECRET_KEY` is unset, the app falls back to `dev-only-change-me`. Always set it.
5. **Token stored in `localStorage`**, which is readable by any script on the page (XSS risk). Consider HttpOnly cookies.
6. **CORS enabled** via Flask-CORS. Restrict origins in production.
7. **Daily reminder code looks buggy.** It reads `service_request.full_name` from a query that adds columns, so it may fail at runtime. Test it before relying on it.
8. **`backend/instance/db.sqlite`, `venv/`, `uploads/` and `server.log`** should never be committed or shared. `.gitignore` covers `.env`, `*.log`, `uploads/`, `instance/` and `__pycache__/`; add `venv/`.
9. **Rotate secrets after anyone else has had access** to this folder.
