import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const registerUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const pass_hash = bcrypt.hashSync(password, 10);
    console.log("req.body", req.body);
    console.log("pass_hash", pass_hash);
    const user = await prisma.users.create({
      data: {
        email_id: email,
        password: pass_hash,
        first_name: first_name,
        last_name: last_name,
        account_id: 1,
        user_role_id: 1,
      },
    });

    res.json({
      message: "User registered successfully",
      status: true,
      user_id: user.id,
    });
  } catch (error) {
    res.json({
      message: "Error registering user",
      body: error,
      status: false,
    });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    console.log("email", email);
    const user = await prisma.users.findMany({
      where: { email_id: `${email}` },
    });
    console.log("user", user);
    if (user) {
      console.log("user[0].password", user[0].password);
      const isAuthenticate = bcrypt.compareSync(password, user[0].password);
      console.log("isAuthenticate", isAuthenticate);
      if (isAuthenticate) {
        const token = jwt.sign({ email, password }, "bonzoAITokenSecret", { expiresIn: "24h" });
        console.log("token", token);
        res.status(200).send({
          message: "Authentication successful",
          token: token,
          sessionId: user[0].id,
          userRole: "Admin",
          username: `${user[0].first_name} ${user[0].last_name}`,
        });
      } else {
        res.status(401).send({
          message: "Error authenticating user",
        });
      }
    }
  } catch (error) {
    res.json({
      message: "Error authenticating user",
      body: error,
      status: false,
    });
  }
};
