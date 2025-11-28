# Event Management System 🎉

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing events with user registration and ticketing functionality.

![Event Management System](https://img.shields.io/badge/MERN-Stack-green) ![License](https://img.shields.io/badge/license-ISC-blue)

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Role-Based Access**: Separate features for regular users and event organizers
- **Event Management**: Create, view, update, and delete events
- **Event Registration**: Users can register for events and receive unique ticket codes
- **Responsive Design**: Modern, mobile-friendly UI with gradient designs and animations
- **RESTful API**: Well-structured backend with proper error handling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **npm** or **yarn**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mern-final-project-DawitiHunde
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/event_management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

> **Note**: For production, use MongoDB Atlas and generate a strong JWT secret using:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory (optional for local development):

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### Start the Backend Server

```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### Start the Frontend

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

## 📱 Usage Guide

### For Regular Users

1. **Register**: Create an account by selecting "User" role
2. **Browse Events**: View all available events on the home page
3. **View Event Details**: Click on an event to see full details
4. **Register for Events**: Click "Register for Event" button
5. **View Dashboard**: Check your registered events and ticket codes

### For Event Organizers

1. **Register**: Create an account by selecting "Organizer" role
2. **Create Events**: Use the "Create Event" button to add new events
3. **Manage Events**: View, edit, and delete your created events
4. **View Registrations**: See who has registered for your events

## 🏗️ Project Structure

```
mern-final-project-DawitiHunde/
├── server/                 # Backend
│   ├── config/            # Database configuration
│   │   └── db.js
│   ├── controllers/       # Route controllers
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/        # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── .env               # Environment variables
│   ├── package.json
│   └── server.js          # Entry point
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── context/       # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── utils/         # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   └── App.css
│   ├── .env               # Environment variables
│   └── package.json
├── .gitignore
├── DEPLOYMENT.md          # Deployment guide
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Organizer only)
- `PUT /api/events/:id` - Update event (Organizer only)
- `DELETE /api/events/:id` - Delete event (Organizer only)

### Registrations
- `POST /api/registrations` - Register for an event
- `GET /api/registrations/my` - Get user's registrations
- `GET /api/registrations/event/:eventId` - Get event registrations (Organizer only)

## 🎨 Technologies Used

### Backend
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Socket.io**: Real-time communication (ready for implementation)
- **UUID**: Unique ticket code generation

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management
- **Vite**: Build tool and dev server
- **CSS3**: Modern styling with gradients and animations

## 🚢 Deployment

### Deploy to Render (Backend)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/event_management
   JWT_SECRET=<your-generated-secret>
   ```

### Deploy to Vercel (Frontend)

1. Create a new project on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication with token expiration
- Protected routes with middleware
- Role-based authorization (User vs Organizer)
- Input validation on both client and server
- CORS configuration for secure cross-origin requests

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Event creation (organizer)
- [ ] Event listing and details
- [ ] Event registration (user)
- [ ] Dashboard view
- [ ] Ticket code generation
- [ ] Authentication flow
- [ ] Responsive design on mobile

### Future Testing Implementation

- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Cypress or Playwright

## 📝 Environment Variables Reference

### Backend (.env in server/)
```env
PORT=5000                                    # Server port
MONGO_URI=mongodb://localhost:27017/event_management  # MongoDB connection
JWT_SECRET=your_secret_key                   # JWT secret for token signing
```

### Frontend (.env in client/)
```env
VITE_API_URL=http://localhost:5000          # Backend API URL
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Dawiti Hunde**

## 🙏 Acknowledgments

- PLP Academy for the MERN Stack Development course
- Week 8 Capstone Project requirements
- MongoDB documentation
- React and Vite communities

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Made with ❤️ using the MERN Stack**
