import { Router } from "express";
import { registerUser, authenticateUser, userInfo, resetPassword } from "../controller/user";

const router = Router();

router.post("/register-user", registerUser);
router.post("/authenticate-user", authenticateUser);
router.get("/user-info", userInfo);
router.put('/reset-password', resetPassword)

export default router;
