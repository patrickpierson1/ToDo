const express = require('express');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db.js');
const User = require('./models/User');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

const allowedOrigins = [
	process.env.FRONTEND_URL,
	"https://f416-76-28-209-119.ngrok-free.app"
];

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
); // Enable CORS

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", 
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
      	let user = await User.findOne({ googleId: profile.id });

      	if (!user) {
      		user = new User({
      			googleId: profile.id,
      			email: profile.emails[0].value,
      			username: profile.displayName,
      			profilePic: profile.photos[0].value,
      		});
      		await user.save();
      	}
      	return done(null, user);
      } catch (error) {
      	console.error("Google OAuth Error:", error);
      	return done(error, null);
      }
    }
   )
);
 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
  	const user = await User.findById(id);
  	done(null, user);
  } catch (err) {
  	done(err, null);
  }
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
//root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
