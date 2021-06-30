import { Router } from "express";
import { registerUser, authenticateUser } from "../controller/user";

const router = Router();

router.post("/register-user", registerUser);
router.post("/authenticate-user", authenticateUser);

export default router;
