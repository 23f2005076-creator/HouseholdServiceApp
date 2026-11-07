# API Reference

The interactive Swagger UI at `/apidocs/` is the authoritative reference for request and response bodies. This page is a map of the endpoints.

- Auth: `POST /login` returns an `access_token`. Send it as `Authorization: Bearer <token>`. The token carries `role` and `user_id` claims.
- Responses are JSON of the form `{"message": "...", "category": "success|danger"}` unless data is returned.
- Wrong role or someone else's data returns `401`.

## Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Serves the Vue app |
| POST | `/register` | Register a `customer` or `professional` (starts unapproved and blocked) |
| POST | `/login` | Customer and professional login. Refused if not approved or if blocked |
| POST | `/admin/login` | Admin login |
| GET | `/get-claims` | Returns the claims from the current token (JWT required) |
| GET | `/download/<filename>` | Download an uploaded file |

## Admin (role `admin`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/admin/profile` | Admin profile |
| POST | `/admin/dashboard` | Users and services overview |
| POST | `/admin/search` | Search users and requests |
| POST | `/admin/manage_user/<user_id>/<field>/<value>` | Set `approve` or `blocked` on a user |
| GET | `/admin/services/get/<service_id>` | Get one service |
| POST | `/admin/services/create_services` | Create a service |
| PUT | `/admin/services/update/<service_id>` | Update a service |
| DELETE | `/admin/services/delete/<service_id>` | Delete a service |
| GET | `/admin/export/<professional_id>` | Start a CSV export (Celery task) |
| GET | `/admin/reports/list` | List generated reports |
| GET | `/admin/reports/download/<filename>` | Download a report |
| GET | `/admin/summary/reviews` | Chart data: ratings (cached) |
| GET | `/admin/summary/service_requests` | Chart data: requests by status (cached) |

## Customer (role `customer`)

| Method | Path | Description |
|--------|------|-------------|
| GET, POST | `/customer/profile` | View or save profile |
| GET, POST | `/customer/dashboard` | Own requests |
| GET, POST | `/customer/search` | Search services |
| GET, POST | `/customer/create_service_request/<service_id>` | Book a service |
| GET, PUT | `/customer/close_service_request/<request_id>` | GET shows the request, PUT closes it with `remarks` and `rating` |
| GET | `/customer/summary/service_requests/<customer_id>` | Own chart data (cached) |

## Professional (role `professional`)

| Method | Path | Description |
|--------|------|-------------|
| GET, POST | `/professional/profile` | View or save profile, with document upload |
| GET, POST | `/professional/dashboard` | Pending and past requests |
| GET, POST | `/professional/search` | Search requests |
| PUT | `/professional/update_request_status/<accept\|reject>/<request_id>` | Accept or reject a request |
| GET | `/professional/summary/reviews/<professional_id>` | Own ratings (cached) |
| GET | `/professional/summary/service_requests/<professional_id>` | Completed requests per day (cached) |

## Exporting a static copy

With the app running, save `http://127.0.0.1:5000/apispec_1.json` to produce an OpenAPI file for submission.
