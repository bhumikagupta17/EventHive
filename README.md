# EventHive 🐝

> A campus event and workshop portal for university communities — discover, register, and manage events all in one place.

**Live Demo:** [event-hive-live.vercel.app](https://event-hive-live.vercel.app)

---

## ✨ What is EventHive?

EventHive is a full-stack web application built for university campuses. Students can browse and register for upcoming hackathons, guest lectures, club mixers, athletic games, and creative arts workshops. Organizers get a dedicated dashboard to create events, manage attendees, and track registrations in real time.

---

## 🚀 Features

### 🎓 For Students
- Browse all campus events with search, category, and price filters
- Register for events and receive a digital pass with a unique ticket code
- Download calendar invites (.ics) for registered events
- Bookmark events to save them for later
- Cancel registrations from the My Registrations page

### 🛠️ For Organizers
- Create and manage events from a dedicated dashboard
- View real-time attendee lists with check-in status
- Toggle attendee check-in directly from the management panel
- Add walk-in guests manually
- Export attendee rosters as CSV

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | React Router v6 |
| State | React Context API + custom hooks |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT (stored in localStorage) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
EventHive/
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios client configured with VITE_API_URL
│   │   ├── components/   # Reusable UI components (EventCard, modals, etc.)
│   │   ├── constants/    # Category options and shared constants
│   │   ├── context/      # EventContext and custom hooks for global state
│   │   └── pages/        # Route-level page components
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/  # Route handler logic
    │   ├── db/           # MongoDB connection
    │   ├── middleware/   # Auth middleware (JWT verification)
    │   ├── models/       # Mongoose schemas
    │   └── routes/       # Express route definitions
    ├── app.js
    └── server.js
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone https://github.com/bhumikagupta17/EventHive.git
cd EventHive
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventhive
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## ☁️ Deployment

### Backend — Render
1. Create a new Web Service on [Render](https://render.com)
2. Connect the `bhumikagupta17/EventHive` GitHub repo
3. Set Root Directory to `backend`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL`

### Frontend — Vercel
1. Import the repo on [Vercel](https://vercel.com)
2. Set Root Directory to `frontend`
3. Add environment variable: `VITE_API_URL=https://<your-render-url>/api`

---

## 🔐 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `PORT` | Port the server listens on (Render sets this automatically) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `CLIENT_URL` | Frontend URL for CORS (your Vercel URL) |
| `NODE_ENV` | `development` or `production` |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the backend API |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
