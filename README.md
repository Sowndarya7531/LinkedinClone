# LinkedIn Clone

This is a full-stack LinkedIn clone built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in, update their profiles, create posts with optional images, and like posts. The UI and functionality are inspired by LinkedIn, with custom styling and real-time feed updates.

## Live Demo

- **Frontend (Vercel)**: [https://linkedin-clone12-git-main-sowndaryavathi-cherukuris-projects.vercel.app/](https://linkedin-clone12-git-main-sowndaryavathi-cherukuris-projects.vercel.app/)
- **Backend (Render)**: [https://linkedinclone-ce15.onrender.com/](https://linkedinclone-ce15.onrender.com/)

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios (for API communication)
- CSS (custom styling)
- Deployed using Vercel

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (image uploads)
- JSON Web Tokens (JWT)
- CORS
- Deployed using Render

---

## Features

- User Registration & Login using JWT
- Profile Management with image, name, and bio
- Create Posts with optional image upload
- View Posts in reverse chronological order
- Like Posts (stored and counted)
- Responsive UI built with custom CSS
- Static File Handling for uploaded images

---

## Getting Started (Local Development)

Follow these steps to run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Sowndarya7531/LinkedinClone.git
cd LinkedinClone
```

---

### 2. Backend Setup

This part runs the server, connects to MongoDB, and handles all API logic.

```bash
cd backend
npm install
```

This installs all dependencies including:

- `express` for server handling
- `mongoose` to connect to MongoDB
- `dotenv` to use environment variables
- `multer` for handling file uploads
- `cors` to allow frontend communication
- `jsonwebtoken` for secure authentication

#### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/linked-clone?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_custom_jwt_secret
```

Replace:

- `<your_username>` and `<your_password>` with your MongoDB Atlas credentials.
- `your_custom_jwt_secret` with any strong random string (e.g., `MyJWTSecretKey123`).

#### Start the Backend Server

```bash
node server.js
```

The server will start on: [http://localhost:5000](http://localhost:5000)

All APIs like `/api/auth`, `/api/users`, and `/api/posts` will be available under this base URL.

---

### 3. Frontend Setup

This part runs the user interface using React.

```bash
cd ../frontend
npm install
```

This installs dependencies like:

- `react` and `react-dom`
- `react-router-dom` for navigation
- `axios` to make HTTP requests to the backend

#### Update API URLs

In your React components (like `Home.jsx`, `Register.jsx`, etc.), replace:

```js
http://localhost:5000
```

with your deployed backend URL:

```js
https://linkedinclone-ce15.onrender.com
```

This allows the frontend (hosted on Vercel) to interact with the backend (hosted on Render).

#### Start the Frontend

```bash
npm start
```

App will run at: [http://localhost:3000](http://localhost:3000)

---

## Deployment Instructions

### Frontend (Vercel)

- Go to [https://vercel.com](https://vercel.com)
- Login with GitHub and import the repo
- During setup, set the project root to `frontend/`
- Click **Deploy**
- Your frontend will be live at a Vercel URL

### Backend (Render)

- Go to [https://render.com](https://render.com)
- Create a new Web Service
- Connect your GitHub repo
- Set **Root Directory** to `backend/`
- Set **Start Command** to:

```bash
node server.js
```

- Add Environment Variables:

| Key        | Value                            |
|------------|----------------------------------|
| MONGO_URI  | your MongoDB connection string   |
| JWT_SECRET | your custom secret for JWT       |

- Click **Deploy**

---

## Demo User Credentials

| Email            | Password  |
|------------------|-----------|
| sow123@gmail.com | Sow123@   |

You can use the above account to test the app immediately after deployment.

---

## Folder Structure

```bash
LinkedinClone/
│
├── backend/
│   ├── models/         # MongoDB schemas for User and Post
│   ├── routes/         # Express routes for auth, posts, users
│   ├── uploads/        # Folder for storing uploaded images
│   ├── server.js       # Entry point for backend server
│   └── .env            # Environment variables (not pushed to GitHub)
│
├── frontend/
│   ├── public/         # Public assets (favicon, index.html)
│   ├── src/            # React components and pages
│   ├── Home.jsx        # Main feed showing posts
│   ├── App.js          # Routing and global state
│   └── package.json    # Frontend dependencies and scripts
│
└── README.md           # Project documentation
```

---

## Notes

- Uploaded images are saved to the `uploads/` folder and served via Express using a static path.
- JWT is used for secure, stateless authentication and `localStorage` is used to persist sessions.
- API calls from frontend use absolute URLs pointing to the deployed backend.

---

## Contributions

This project is part of a learning and internship initiative. Contributions are welcome, and suggestions are appreciated.
