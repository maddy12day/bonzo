import { Router } from "express";
import { registerUser, authenticateUser, userInfo } from "../controller/user";

const router = Router();

router.post("/register-user", registerUser);
router.post("/authenticate-user", authenticateUser);
router.get("/user-info", userInfo);

export default router;
