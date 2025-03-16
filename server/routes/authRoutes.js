const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Standard Authentication Routes
const { register, login } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);

// Google OAuth login route
router.get(
  "/google",
  (req, res, next) => {
  	console.log("Google login route accessed");
  	next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback route(OAUTH)
router.get(
  "/google/callback",
  (req, res, next) => {
  	console.log("Google callback route accessed");
  	next();
  },
  passport.authenticate("google", { failureRedirect: "/login"}),
  async (req, res) => {
	console.log("Google callback hit, processing user.");
	if (!req.user) {
		console.error("No user received from Passport!");
		return res.status(500).json({ error: "Authentication failed"});
	}
  	try {
  		console.log("Received user from Google:", req.user); //debug
  		let user = await User.findOne({ googleId: req.user.googleId });

  		if (!user) {
			console.log("User not found in DB, creating new user...");
  			//create new entry if user does not exist in db
  			user = new User({
  				googleId: req.user.googleId,
  				email: req.user.email,
  				username: req.user.username,
  				profilePic: req.user.profilePic,
  			});
  			await user.save();
  			console.log("New user saved in MongoDB:", user); //debug
  		} else{
  			console.log("User already exists in DB", user); //debug
  		}

  		// set session and redirect to dash
  		req.login(user, (err) => {
  			if (err) {
  				console.error("Error logging in user:", err);
  				return res.status(500).json({ error: "Login failed" });
  			}
  			console.log("User successfully logged in. Redirecting...");
  			res.redirect("/dashboard");
  		});
  	} catch (error) {
  		console.error("Google OAuth error", error);
  		res.redirect("/login");
  	}
  }
);

// check auth status
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

router.post("/google/signup", async (req, res) => {
	try {
		console.log("Received Google Signup Request:", req.body);
		const { googleId, email, username, profilePic } = req.body;

		if (!googleId || !email ) {
			return res.status(400).json({ error: "Google ID and email are required fields"});
		}
		let user = await User.findOne({ googleId });

		if (!user) {
			console.log("Creating new Google user...");
			user = new User({
				googleId,
				email,
				username,
				profilePic,
			});
			await user.save();
			console.log("User saved in MongoDB:", user);
		} else {
			console.log("Google user already exists in DB:", user);
		}

		res.status(200).json({ message: "Google signup Succesful for:", user});
	} catch (error) {
		console.error("Google signup error:", error);
		res.status(500).json({ error: "internal server error"});
	}
});

router.post("/google/login", async (req, res) => {
	try {
		const { googleId, email, username, profilePic } = req.body;
		console.log("Recieved Google Login Request", req.body);
		//find user in DB
		let user = await User.findOne({ googleId });

		if (!user) {
			return res.status(404).json({ error: "User not found. Please sign up first"});
		}
		// Successful login
		console.log("Google User Authenticated:", user);
		req.login(user, (err) => {
			if (err) return res.status(500).json({ error: "Login Failed"});
			res.status(200).json({ user });
		});
	} catch (error) {
		console.error("Google login error:", error);
		res.status(500).json({ error: "Google login failed"});
	}
});

module.exports = router;
