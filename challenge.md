# Backend Practice Exam #1

## Coworking Room Reservation System

### Objective

Build the backend design for a coworking room reservation system.

Users can reserve meeting rooms for specific time slots.

The focus of this exercise is **architecture**, not implementation.

---

## Technical Requirements

* Node.js
* TypeScript
* PostgreSQL
* Prisma
* JWT Authentication
* Role-based Authorization
* Layered Architecture

---

## Required Architecture

Each module must contain:

```text
controllers/
services/
repositories/
dto/
```

Example:

```text
src/

modules/

├── auth/
├── users/
├── rooms/
└── reservations/
```

Controllers must not access Prisma directly.

---

## Roles

```ts
enum UserRole {
  ADMIN,
  MEMBER
}
```

### ADMIN

Can:

* Create rooms
* Edit rooms
* Delete rooms
* View all reservations

### MEMBER

Can:

* View rooms
* Create reservations
* Cancel their own reservations

---

## Entity: Room

Fields:

```ts
id
name
capacity
createdAt
```

Examples:

```text
Room A
Room B
Executive Room
```

---

## Entity: Reservation

Fields:

```ts
id
roomId
userId
startDate
endDate
status
```

Status:

```ts
PENDING
CONFIRMED
CANCELLED
```

---

## Business Rule #1

A room cannot have overlapping reservations.

Example:

Existing reservation:

```text
10:00 - 11:00
```

Invalid reservation:

```text
10:30 - 11:30
```

---

## Business Rule #2

Reservations cannot be created in the past.

Invalid example:

```text
Yesterday
```

---

## Business Rule #3

A MEMBER can only cancel their own reservations.

---

## Authentication

Public endpoints:

```http
POST /auth/register
POST /auth/login
```

Protected endpoints:

```http
POST /rooms
POST /reservations
DELETE /reservations/:id
```

---

# Tasks

## Part 1 - Database Design

Design the tables:

* User
* Room
* Reservation

Questions:

* What columns should each table contain?
* Which columns should be unique?
* Which relationships should exist?

---

## Part 2 - DTO Design

Create the DTOs required for the system.

Example:

```ts
CreateRoomDto
```

Questions:

* Which DTOs would you create?
* What properties should each DTO contain?

---

## Part 3 - Service Design

Design the services.

Example:

```ts
RoomService
ReservationService
AuthService
```

Questions:

* Which methods should each service expose?
* What business rules belong in each service?

---

## Part 4 - Repository Design

Design the repositories.

Example:

```ts
RoomRepository
ReservationRepository
```

Questions:

* Which methods should each repository expose?
* Which methods are strictly data access operations?

---

## Part 5 - Business Rule Placement

Business Rule:

```text
Do not allow overlapping reservations
```

Where should this validation be implemented?

Choose one:

* Controller
* Service
* Repository

Explain your reasoning.

---

## Part 6 - Authorization Placement

Rule:

```text
Only ADMIN users can create rooms
```

Where should this validation be implemented?

Choose one:

* Controller
* Middleware
* Service

Explain your reasoning.

---

# Evaluation Criteria

The goal is not to write code.

The goal is to demonstrate understanding of:

* Controllers
* Services
* Repositories
* DTOs
* JWT Authentication
* Authorization
* Responsibility separation
* Backend architecture

---

# Bonus

Describe how you would structure the project folders.

Example:

```text
src/
├── modules/
├── shared/
├── config/
├── database/
└── main.ts
```

Explain the purpose of each folder.
