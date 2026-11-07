# User Guide

Add screenshots next to each step when you submit this.

## Getting an account
1. Open the app and choose **Register**.
2. Pick **Customer** or **Professional**, then enter a username and password.
3. Your account starts **unapproved and blocked**. You can log in only after an admin approves and unblocks you.
4. After the first login, complete your profile. Professionals also choose a service type, enter experience and address, and upload a document (png, jpg, jpeg, gif or pdf, up to 16 MB).

## Admin
1. Log in at `/admin/login`.
2. **Dashboard:** approve, block or unblock customers and professionals. Approve a professional after checking their uploaded document.
3. **Services:** create, edit or delete services (name, type, price, description).
4. **Search:** find users and requests.
5. **Summary:** charts of ratings and request statuses.
6. **Download report:** export a professional's requests as CSV.

## Customer
1. **Search:** browse services and open one.
2. **Book:** request the service. A matching approved professional receives the request. You cannot book the same service again while the earlier request is still open.
3. **Dashboard:** track the status (requested, accepted, rejected, completed).
4. **Close a request:** once the work is done, choose close, give a rating and remarks.
5. **Summary:** charts of your own requests.

## Professional
1. **Dashboard:** see pending requests and choose **Accept** or **Reject**.
2. **Profile:** update your details.
3. **Summary:** your ratings and completed requests per day.

## Emails and reminders
- Professionals with pending requests are reminded daily at 18:00 (when the Celery jobs are running).
- Customers receive a monthly activity report on the 1st.
