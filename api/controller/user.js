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
    const user = await prisma.users.findMany({
      where: { email_id: `${email}` },
    });
    if (user) {
      const current_user = user[0];
      const first_name = current_user.first_name;
      const last_name = current_user.last_name;
      const isAuthenticate = bcrypt.compareSync(password, current_user.password);
      if (isAuthenticate) {
        const token = jwt.sign({ email, first_name, last_name }, "bonzoAITokenSecret", { expiresIn: "24h" });
        console.log("token", token);
        res.status(200).send({
          message: "Authentication successful",
          token: token,
          sessionId: current_user.id,
          userRole: "Admin",
          username: `${first_name} ${last_name}`,
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

export const userInfo = async (req, res) => {
  var token = req.headers.authorization;
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ""), "bonzoAITokenSecret", function(err, decoded) {
      if (err) {
        return res.status(401).json({ message: "unauthorized" });
      } else {
        return res.json({ user: decoded });
      }
    });
  } else {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users =  await prisma.users.findMany({
      select: {
        first_name: true,
        email_id: true,
        id: true
      }
    })
    res.status(200).json({
      users
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in shared scenario list api",
      error: `${error}`,
    });
  }
};
