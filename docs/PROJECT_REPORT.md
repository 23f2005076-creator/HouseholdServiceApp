# Project Report: A-Z Household Services

> Template. Fill in the bracketed parts yourself; they depend on your course requirements and your own work.

**Name:** [your name]
**Roll number / ID:** [ID]
**Course:** Modern Application Development 2
**Date:** [date]

## 1. Problem statement
[Describe the problem: people struggle to find trusted household service providers, and providers lack a platform to receive and manage requests.]

## 2. Approach
[How you broke the problem down: roles, approval flow, booking flow, reporting.]

## 3. Technologies used
| Technology | Why it was used |
|------------|-----------------|
| Flask | Backend REST API |
| SQLAlchemy and SQLite | Data storage |
| Flask-JWT-Extended | Token authentication and role-based access |
| Vue 2 and Vue Router | Single-page frontend |
| Bootstrap 5 | Styling |
| Chart.js | Summary charts |
| Redis | Caching and Celery broker |
| Celery | Scheduled reminders, monthly reports, CSV export |
| SendGrid | Email delivery |
| Flasgger | API documentation |

## 4. Database design
See [DATABASE.md](DATABASE.md) for the ER diagram. [Add a short explanation of your design choices.]

## 5. Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md).

## 6. Features implemented
- [ ] Role-based login (admin, customer, professional)
- [ ] Admin approval and blocking of users
- [ ] Service management (create, edit, delete)
- [ ] Search
- [ ] Booking, accept or reject, close with rating and remarks
- [ ] Summary charts for each role
- [ ] CSV export (async job)
- [ ] Daily reminders and monthly reports (scheduled jobs)
- [ ] Caching
- [ ] Swagger API docs

[Tick what applies and add anything extra.]

## 7. Challenges and limitations
[For example: single-file backend, no automated tests, hardcoded demo values in scheduled tasks. See [SECURITY.md](SECURITY.md).]

## 8. Future work
[For example: user email field, real unit tests, migrations, production database, payments.]

## 9. Demo
Video link: [URL]
Repository: [URL]
