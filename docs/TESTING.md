# Testing

## Automated checks
GitHub Actions (`.github/workflows/python-app.yml`) runs on pushes and pull requests to `master`. It installs `backend/requirements.txt` and runs flake8: it fails on syntax errors and undefined names, and reports other style issues as warnings. There are no unit tests in the repository yet.

Run the same lint locally:
```
pip install flake8
cd backend
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
```

## Manual test checklist

**Accounts**
- [ ] Register a customer and a professional
- [ ] Registering a duplicate username is rejected
- [ ] Registering with role `admin` is rejected
- [ ] A new user cannot log in before approval
- [ ] After approval and unblocking, login works
- [ ] A blocked user cannot log in

**Admin**
- [ ] Admin login works; a non-admin token gets 401 on admin routes
- [ ] Create, edit and delete a service
- [ ] Approve, block and unblock users
- [ ] Search returns users and requests
- [ ] Summary charts load
- [ ] CSV export runs (needs Redis and a Celery worker)

**Booking flow**
- [ ] A customer can book a service
- [ ] A duplicate open request is rejected
- [ ] Booking fails when no approved professional offers the service
- [ ] The professional can accept and reject
- [ ] The customer can close with a rating and remarks; the status becomes `completed`

**Access control**
- [ ] A customer cannot open another customer's summary (expect 401)
- [ ] A professional cannot open another professional's summary (expect 401)

**Background jobs**
- [ ] With the schedule temporarily set to every minute, the daily reminder and monthly report tasks run without errors
