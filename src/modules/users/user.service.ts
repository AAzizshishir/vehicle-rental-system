// import bcrypt from "bcryptjs";
// import { pool } from "../../config/db";

// // create user
// const createUser = async (payload: Record<string, unknown>) => {
//   const { name, email, password, role } = payload;

//   const hashedPassword = await bcrypt.hash(password as string, 10);

//   const result = await pool.query(
//     "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
//     [name, email, hashedPassword, role]
//   );

//   return result;
// };

// export const userService = {
//     createUser,
// };
