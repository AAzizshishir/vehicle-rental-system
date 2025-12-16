import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

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

export const authServices = {
  signUp,
};
