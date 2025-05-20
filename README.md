#  MemoRoam

MemoRoam is a sleek and dynamic web application designed to let users explore, manage, and book various types of listings with ease. Whether it's properties, events, or services, MemoRoam offers a smooth and intuitive platform for both users and administrators.

With powerful features like a smart search system, detailed listings, secure bookings, and a robust admin dashboard, MemoRoam simplifies the way people discover and manage opportunities—all in one place.

It’s more than just a listing site — it’s a complete solution for showcasing, scheduling, and connecting.



 **Live Demo**: [https://memo-roam.onrender.com/listing](https://memo-roam.onrender.com/listing)

---

##  Features

* ** Explore Listings** – Browse through various listings with details like price, description, images, and more.
* ** Create Listings** – Admins can easily add new listings with complete information.
* ** Booking System** – Book available items for a specific date or time.
* ** Smart Search & Filters** – Filter listings by price, location, category, and more.
* ** User Authentication** – Secure sign-up and login for users and admins using JWT.
* **🛠 Admin Panel** – Admins can manage, edit, and delete listings.

---

## 🛠 Tech Stack

| Layer             | Technology           |
| ----------------- | -------------------- |
| **Frontend**      | HTML, CSS (EJS)      |
| **Backend**       | Node.js, Express.js  |
| **Database**      | MongoDB              |
| **Auth**          | JSON Web Token (JWT) |
| **Image Storage** | Cloudinary or AWS S3 |

---

## 🚀 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Avinashpasham07/MemoRoam.git
cd MemoRoam
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `server/` directory with the following contents:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8080
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Backend Server

```bash
node app.js
```

If everything is set up correctly, you should see:

```
Server is running on port 8080
Connected to Database
```

### 🔗 Final Check

Visit: [http://localhost:8080/listing](http://localhost:8080/listing)

---

## 👤 Author

Developed with 💡 by **Avinash Pasham**
📫 [Connect with me on LinkedIn](https://www.linkedin.com/in/avinashyadavpasham/)




