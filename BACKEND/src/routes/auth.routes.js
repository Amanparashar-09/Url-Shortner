import express from "express"
import passport from "passport"
import {
    register_user,
    login_user,
    logout_user,
    get_current_user,
    google_auth_callback,
    google_auth_failure
} from "../controller/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

// Regular authentication routes
router.post("/register", register_user)
router.post("/login", login_user)
router.post("/logout", logout_user)
router.get("/me", authMiddleware, get_current_user)

// Google OAuth routes
router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/google/failure"
    }),
    google_auth_callback
)

router.get("/google/failure", google_auth_failure)

export default router