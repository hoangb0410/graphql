import { pool } from "./db.js";

export const root = {
  users: async () => {
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
  },

  user: async ({ id }) => {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  },

  createUser: async ({ name, email }) => {
    const res = await pool.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    return res.rows[0];
  },

  updateUser: async ({ id, name, email }) => {
    const res = await pool.query(
      `UPDATE users SET 
         name = COALESCE($2, name),
         email = COALESCE($3, email)
       WHERE id = $1
       RETURNING *`,
      [id, name, email]
    );
    return res.rows[0];
  },

  deleteUser: async ({ id }) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return true;
  },
};
