# BCard – Business Cards Platform

BCard is a full React + TypeScript web application for managing business cards.  
The system supports authentication, role-based permissions, card creation, editing, liking, and responsive UI with dark mode support.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based access:
  - Regular users
  - Business users
  - Admin users

### 🪪 Business Cards

- View all business cards (Home)
- Like / Unlike cards
- View favourite cards
- Business users can:
  - Create new cards
  - Edit their cards
  - Delete their cards
- Admin users can:
  - Delete any card

### 📄 Pages

- Home (all cards + search)
- Favourite Cards
- My Cards (business/admin only)
- Create Card
- Edit Card
- Login / Register
- About
- Sandbox (admin only)
- Page Not Found (404)

### 🔍 Search

- Real-time search from the Navbar
- Search by title, subtitle, or description

### 🌙 Dark Mode

- Global dark mode toggle
- Applies to all pages and components
- Saved in `localStorage`

### 📱 Responsive Design

- Fully responsive layout
- Optimized for mobile, tablet, and desktop
- Responsive Navbar with hamburger menu
- Responsive card grid using Bootstrap

---

## 🛠️ Technologies Used

- **React**
- **TypeScript**
- **React Router**
- **Formik + Yup**
- **Axios**
- **Bootstrap 5**
- **Font Awesome**
- **JWT Authentication**

---

## 📂 Project Structure (Main)
