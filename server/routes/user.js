const express = require("express");
const { handleUserSignUP, 
    handleUserlogin, 
    handleUserLogout, 
    handleForgotPassword, 
    handleResetPassword } = require("../controllers/user");
const router = express.Router();

//router.post("/",);

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", handleUserSignUP);
router.post("/login", handleUserlogin);
router.get("/login", (req, res) => {
    res.render("login");
});

// Logout route
router.post("/logout", handleUserLogout);
router.get("/logout", handleUserLogout);

// Forgot password routes
router.get("/forgot-password", (req, res) => {
    res.render("forgotPassword");
});
router.post("/forgot-password", handleForgotPassword);

// Reset password routes
router.get("/reset-password/:token", (req, res) => {
    res.render("resetPassword", { token: req.params.token });
});
router.post("/reset-password/:token", handleResetPassword);

// ✅ API endpoint to return JSON user data
router.get("/userinfo", async (req, res) => {
  if (req.isAuthenticated() && req.user) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({
        user: {
          name: user.name,
          email: user.email,
          photo: user.photo,
          phone: user.phone || null,
          walletBalance: user.walletBalance || 0,
        },
      });
    } catch (err) {
      console.error("❌ Error fetching user info:", err);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});


module.exports = router;
