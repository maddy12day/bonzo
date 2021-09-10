import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const registerUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const pass_hash = bcrypt.hashSync(password, 10);

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
export const resetPassword = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const hash_pass = bcrypt.hashSync(password, 10);
    const user = await prisma.$queryRaw(`update morphe_staging.users set password='${password}' where email_id=${email};`);
    res.json({
      user,
      message: "password updated successfully....",
    });
  } catch (error) {
    res.json({
      error: error,
      mess: "something went wrong in password reset api...",
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
      const user_id = current_user.id;
      const isAuthenticate = bcrypt.compareSync(
        password,
        current_user.password
      );
      if (isAuthenticate) {
        const token = jwt.sign(
          { email, first_name, last_name, user_id },
          process.env.BONZO_AI_TOKEN_SALT,
          { expiresIn: "24h" }
        );
        res.status(200).send({
          message: "Authentication successful",
          token: token,
          sessionId: current_user.id,
          userRole: "Admin",
          username: `${first_name} ${last_name}`,
          user_id,
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
    jwt.verify(
      token.replace(/^Bearer\s/, ""),
      process.env.BONZO_AI_TOKEN_SALT,
      function(err, decoded) {
        if (err) {
          return res.status(401).json({ message: "unauthorized" });
        } else {
          return res.json({ user: decoded });
        }
      }
    );
  } else {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      select: {
        first_name: true,
        email_id: true,
        id: true,
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};
