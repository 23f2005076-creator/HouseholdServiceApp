# Database

SQLite, file `backend/instance/db.sqlite`. Tables are created automatically by `db.create_all()`. There is no migration tool.

## ER diagram

```mermaid
erDiagram
    users ||--o| customer_profiles : has
    users ||--o| professional_profiles : has
    users ||--o{ service_requests : "customer_id"
    users ||--o{ service_requests : "professional_id"
    services ||--o{ service_requests : requested

    users {
        int id PK
        string username UK
        string password "hashed"
        string role "admin | customer | professional"
        datetime date_created
        bool approve "default false"
        bool blocked "default true"
    }
    services {
        int id PK
        string name
        float price
        string description
        string service_type
    }
    service_requests {
        int id PK
        int service_id FK
        int customer_id FK
        int professional_id FK
        datetime date_of_request
        datetime date_of_accept_reject
        datetime date_of_completion
        string service_status
        string remarks
    }
    professional_profiles {
        int id PK
        int user_id FK
        string full_name
        string service_type
        string experience
        string filename "uploaded document"
        datetime uploaded_at
        string address
        string pin_code
        float reviews "average rating"
    }
    customer_profiles {
        int id PK
        int user_id FK
        string full_name
        string address
        string pin_code
    }
```

## Service request status lifecycle

```
requested --accept--> accepted --customer closes--> completed
    '------reject---> rejected
```
A customer cannot create a new request for the same professional and service while one is `requested` or `accepted`.

## Notes
- Passwords are stored as PBKDF2-SHA256 hashes.
- `professional_profiles.reviews` is a running average, `(new_rating + old) / 2`, not a true mean of all ratings.
- A professional is matched to a request by comparing `professional_profiles.service_type` with the requested service id. Keep this in mind when adding services.
- SQLite does not enforce foreign keys unless `PRAGMA foreign_keys=ON` is set.
