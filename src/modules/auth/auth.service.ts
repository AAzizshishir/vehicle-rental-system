import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const signUp = async (payload: RegisterPayload) => {
  const { name, email, password, phone, role } = payload;

  if (typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters";
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
    [name, email.toLocaleLowerCase(), hashedPassword, phone, role]
  );

  return result.rows[0];
};

const signIn = async (email: string, password: string, role: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return "No user Found";
  }

  const user = result.rows[0];

  const matchedPass = await bcrypt.compare(password, user.password);

  if (!matchedPass) {
    return false;
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    `Bearer ${config.jwtSecret}`,
    { expiresIn: "30d" }
  );

  return { user, token };
};

export const authServices = {
  signUp,
  signIn,
};
