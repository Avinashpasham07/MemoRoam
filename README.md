MemoRoam
MemoRoam is a modern web application that allows users to explore and manage various types of listings with ease.
Whether it's for properties, events, or services, MemoRoam provides a smooth experience for both users and admins to create, browse, and book items.

Features
Explore Listings – Browse through various available items with details like price, description, and more.
Create Listings – Admins can add new items with pricing, images, descriptions, and other relevant details.
Booking System – Allows users to book available items for a specific date or time.
Smart Search & Filters – Easily find listings using filters like price range, location, or type.
User Authentication – Sign-up and login system for both users and admins.
Admin Panel – Admins can manage, edit, and delete listings.

Tech Stack

Frontend: html,css
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT for secure user sessions
Image Storage: Cloudinary or S3 (for image uploads)

Installation Guide
Step 1: Clone the Repository
# Clone the repository
git clone https://github.com/Avinashpasham07/MemoRoam.git
cd MemoRoam

Step 2: Install Backend Dependencies
# Go to the server directory
cd server

# Install backend dependencies
npm install

Step 3: Setup Environment Variables
Create a .env file in the server directory with the following:

MONGODB_URI=your_mongodb_connection_string
PORT=8080
JWT_SECRET=your_jwt_secret_key

Step 4: Start the Backend Server
# Start the backend server

node app.js

If everything is set up correctly, you should see:
Server is running on port 8080
Connected to Database

 Final Check
 
http://localhost:8080/listing


Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Live Demo : https://memo-roam.onrender.com/listing


Contact
Developed by Avinash Pasham

If you like this project, please ⭐ the repo!
