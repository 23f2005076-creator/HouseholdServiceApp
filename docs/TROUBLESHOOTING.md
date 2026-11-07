# Troubleshooting

| Problem | Cause and fix |
|---------|---------------|
| `pip install` fails building packages | Use Python 3.13. Python 3.15 cannot build the pinned versions. |
| I can't log in as admin | There is no default admin. Create one as described in [SETUP.md](SETUP.md#4-create-the-admin-account). |
| "Your account is not approved yet" | An admin must approve the user first. |
| "Your account is blocked" | New accounts start blocked. An admin must unblock them. |
| 401 "Missing Authorization Header" | The token is missing or expired. Log in again. |
| Celery worker cannot connect | Redis is not running or `REDIS_URL` is wrong. |
| Celery worker crashes on Windows | Start it with `--pool=solo`. |
| Emails are not sent | `SENDGRID_API_KEY` is empty or invalid. The task logs `Error sending email` and continues. |
| Monthly report goes to the wrong person | The recipient is hardcoded in `send_monthly_activity_report`. See [SECURITY.md](SECURITY.md). |
| Summary charts show stale data | Summary endpoints are cached. Wait for expiry or restart the app. |
| File upload fails | Check the file type (png, jpg, jpeg, gif, pdf) and the 16 MB limit, and make sure `backend/uploads/` exists. |
| Page loads blank | The frontend loads Vue, Bootstrap and Chart.js from CDNs, so it needs internet access. |
| Port 5000 already in use | Stop the other process or change the port in `app.run(...)`. |
