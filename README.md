# ShipSmart - Logistics Management System 

A complete end-to-end logistics and supply chain solution built with **React**, **Express**, and **MongoDB**.

# Project Members
1. [Shikha Sharma] - [RA2411030030060]
2. [Aditya Mukherji] - [RA2411030030052]


## 📁 Project Documents

| Sr | Description                                  | Link |
|----|----------------------------------------------|------|
| 1  | Project Code                                | [View](https://github.com/Aadi2355/ShipSmart-) |
| 2  | Project Report                              | [View](https://github.com/Aadi2355/ShipSmart-/blob/70a1942a0b1f97757e1ddfd0d4d874af39c265cb/DBMS%20FINAL%20REPORT%20F.pdf) |
| 3  | 1st PPT                                     | [View](https://github.com/Aadi2355/ShipSmart-/blob/8774184dbac6b55af1c648eab010fb7fc8c9c38f/ShipSmart%201st.pdf) |
| 4  | Final PPT                                   | [View](https://github.com/Aadi2355/ShipSmart-/blob/70a1942a0b1f97757e1ddfd0d4d874af39c265cb/dbms%20final%20ppt.pptx) |
| 5  | RA2411030030052_Certificate                 | [View](https://github.com/Aadi2355/ShipSmart-/blob/70a1942a0b1f97757e1ddfd0d4d874af39c265cb/Reg%2052%20Cert.jpeg) |
| 6  | RA2411030030060_Certificate                 | [View](https://github.com/Aadi2355/ShipSmart-/blob/70a1942a0b1f97757e1ddfd0d4d874af39c265cb/Reg%2060%20Cert.jpeg) |
| 7  | RA2411030030052_CourseReport                | [View](https://github.com/Aadi2355/ShipSmart-/blob/70a1942a0b1f97757e1ddfd0d4d874af39c265cb/course_report_52.pdf) |
| 8  | RA2411030030060_CourseReport                | [View](https://github.com/Aadi2355/ShipSmart-/blob/70a1942a0b1f97757e1ddfd0d4d874af39c265cb/course%20reoport_60.docx) |

---

## 🚀 Features

| Module | Description |
|--------|-------------|
| 🔐 **Authentication** | Multi-role (Admin/Seller/Buyer) login/register with JWT and hashed passwords |
| 📦 **Seller Portal** | Manage products, track inventory value, and monitor current stock |
| 🛠️ **Admin Portal** | Oversee all orders, manage delivery agents, and system health |
| 🛒 **Buyer Portal** | Interactive product browsing, cart management, and order placement |
| 📍 **Order Tracking** | Real-time status updates (Pending, In-Transit, Delivered) |
| 📊 **Analytics** | Visual charts (Recharts) for tracking sales and performance trends |
| 📂 **File Management** | Local file storage for product images using Multer |

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Frontend:** React.js, Tailwind CSS
- **Visualization:** Recharts, Lucide Icons
- **Auth:** JWT (Json Web Token), Bcrypt

---

## ⚡ Quick Setup

### 1. Prerequisites
- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas URI

### 2. Configure Backend
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Install Dependencies
```bash
# Install root (backend) dependencies
npm install

# Install frontend dependencies
cd logistics-frontend
npm install
```

### 4. Run the Application
```bash
# Start backend (From root)
node server.js

# Start frontend (From logistics-frontend)
npm run dev
```
Open http://localhost:5173 for the frontend.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@gmail.com` | `password= 1234` |
| **Seller** | `seller@gmail.com` | `password= 1234` |
| **Buyer** | `buyer@gmail.com` | `password= 1234` |

---

## 📂 Project Structure

```
gravity/
├── server.js              # Main Express entry point
├── .env                   # Environment variables
├── models/                # Mongoose schemas
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/                # API Endpoints
│   ├── auth.js
│   ├── seller.js
│   ├── buyer.js
│   └── admin.js
├── middlewares/           # Auth validation
├── uploads/               # Product image storage
└── logistics-frontend/    # React (Vite) Frontend
    ├── src/
    │   ├── api/           # Axios interceptors (api.js)
    │   ├── components/    # Reusable UI (Layout, RequireAuth)
    │   ├── context/       # AuthContext for state
    │   ├── pages/         # Dashboard & Auth views
    │   └── App.jsx        # Main routing table
    ├── index.html
    └── tailwind.config.js
```

---

<p align="center">Made for Supply Chain Optimization</p>
