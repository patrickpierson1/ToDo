const express = require("express");
const paspport = require("passport");
const { register, login } = require("../controllers/auth");
const router = express.Router();

//standard auth routes
router.post("/register", register);
router.post("/login", login);

//google oauth login route
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

//google oauth callback route
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/login",
		successRedirect: "/profile",
	})
);

//check auth status
router.get("/status", (req res) => {
	if (req.isAuthenticated()) {
		res.json({ user: req.user });
	} else {
		res.status(401).json({ error: "Not authenticated" });
	}
});

//logout route
router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
});

module.exports=router;
