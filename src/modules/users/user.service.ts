import { pool } from "../../config/db";

// get users
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

export const userService = {
  getUsers,
};
