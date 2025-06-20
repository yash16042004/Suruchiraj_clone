require("dotenv").config(); // ✅ Load .env variables

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const { connectMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");

// 1. CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL, // your frontend URL
  credentials: true // ✅ Send cookies across domains
}));




// 2. Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Session configuration
app.use(session({
  secret: "Aaditya@3737",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // ✅ Required for localhost
    sameSite: "lax", // or 'none' with secure:true + HTTPS
  },
}));

// 4. Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
app.use("/auth", require("./routes/auth")); // Google OAuth
app.use("/user", require("./routes/user")); // User-related routes
app.use("/open", require("./routes/openRouter")); // Public routes
app.use("/", restrictToLoggedInUserOnly, require("./routes/staticRouter")); // Authenticated routes

// 6. View engine (if you're using EJS for rendering pages)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// 7. MongoDB connection
connectMongoDB(process.env.MONGO_URI);

// 8. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
