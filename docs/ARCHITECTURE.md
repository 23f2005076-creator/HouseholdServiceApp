# Architecture

```
 Browser (Vue 2 SPA, Bootstrap, Chart.js)
        |  fetch() with  Authorization: Bearer <JWT>
        v
 Flask app  (backend/app.py)
   |- Flask-JWT-Extended   login tokens carrying role and user_id claims
   |- Flask-SQLAlchemy     SQLite database (backend/instance/db.sqlite)
   |- Flask-Caching        summary endpoints (in-memory or Redis)
   |- Flasgger             Swagger UI at /apidocs/
   |- Flask-Mail           SendGrid SMTP
   '- Celery client  ---> Redis (broker and result backend) ---> Celery worker and beat
```

## Frontend
Flask serves `frontend/index.html` as a template and the `frontend/` folder as static files. The Vue app (`app.js`) uses Vue Router (`utils/router.js`) with one page component per screen under `pages/`. The JWT is stored in `localStorage` and sent on every API call.

Routes: `/`, `/login`, `/register`, `/admin/{login,dashboard,profile,search,summary,downloadReport,services/...}`, `/customer/{dashboard,profile,search,summary,closeServiceRequest/:id}`, `/professional/{dashboard,profile,search,summary}`.

## Backend
A single `app.py` holds configuration, Celery tasks and all routes. Every protected route reads the `role` claim from the JWT and rejects the wrong role with 401. Customers and professionals can only read their own summary data (the `user_id` claim is compared with the URL id).

## Request flow: booking a service
1. A customer opens the search page and picks a service.
2. `POST /customer/create_service_request/<service_id>` finds a professional whose `service_type` matches. That professional must be approved and not blocked, and must have no open request for the same service. A `requested` row is then created.
3. The professional sees it on their dashboard and calls `PUT /professional/update_request_status/<accept|reject>/<id>`.
4. After the work, the customer calls `PUT /customer/close_service_request/<id>` with remarks and a rating. The status becomes `completed` and the professional's average rating is updated.

## Account approval
New users start with `approve=False, blocked=True`. Login is refused until an admin approves them and unblocks them (`/admin/manage_user/...`).

## Caching
The five summary endpoints are cached with `@cache.cached()` or `@cache.memoize()`. Cached summaries may therefore lag behind new data until the cache expires.

## Background jobs
Defined in `app.py` and scheduled with Celery beat (see [SETUP.md](SETUP.md)). They need Redis running.
