

## User

- id
- email
- name
- password
- role
- createdAt
- updatedAt

Unique:
- email

Reason:
A user must have a unique email address to authenticate.

---

## Room

- id
- name
- capacity
- createdAt
- updatedAt

Unique:
- name

Reason:
Two rooms should not share the same name.

---

## Reservation

- id
- userId
- roomId
- startDate
- endDate
- status
- createdAt

---
---

User
  |
  | 1:N — A user can have many reservations
  |
Reservation
  |
  | N:1 — Many reservations can belong to one room
  |
Room