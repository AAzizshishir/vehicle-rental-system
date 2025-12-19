# 🚗 Vehicle Rental System

**Live API URL:** https://vehicle-rental-system-cyan.vercel.app/

A backend system for managing vehicle rentals, bookings, and users with role-based access control. Built with scalability, security, and clean architecture in mind.

---

## 📌 Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (`admin`, `customer`)
- Secure password hashing using **bcrypt**

### 👤 User Management

- Admin can manage all users
- Customers can update their own profile
- Protected routes using authentication middleware

### 🚘 Vehicle Management

- Admin can add, update, and delete vehicles
- Vehicles cannot be deleted if they have active bookings
- Vehicle availability automatically updates based on booking status

### 📅 Booking Management

- Customers can create and cancel bookings
- Admin can mark bookings as returned
- Automatic rental price calculation based on duration
- Prevents double booking using database transactions
- Clean API responses with joined relational data

### 🗄️ Database Integrity

- PostgreSQL relational constraints
- Transaction-based operations
- Date formatting handled at SQL level

---

## 🛠️ Technology Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQL**
- **bcrypt**
- **jsonwebtoken (JWT)**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AAzizshishir/vehicle-rental-system
cd rental-vehicle-system
```
