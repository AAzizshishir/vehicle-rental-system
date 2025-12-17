import { pool } from "../../config/db";

// get users
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

// update user

interface userData {
  name: string;
  phone: string;
  role: string;
}
const updateUser = async (payload: userData, id: string) => {
  const { name, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users SET name = $1, phone = $2, role = $3 WHERE id = $4 RETURNING *`,
    [name, phone, role, id]
  );

  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );

  return result;
};

export const userService = {
  getUsers,
  updateUser,
  deleteUser,
};
