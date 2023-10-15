import db from "../db.js";

const Query = {
  posts: async (_, { limit, thread_id }) => {
    const { rows } = await db.query(
      `SELECT * FROM posts ${
        thread_id ? "WHERE thread_id = $2" : ""
      } ORDER BY created DESC LIMIT $1`,
      [limit ?? 10, thread_id]
    );

    return rows;
  },
  threads: async (_, { limit }) => {
    const { rows } = await db.query(
      "SELECT * FROM posts ORDER BY created DESC LIMIT $1",
      [limit ?? 10]
    );

    return rows;
  },
};

export { Query as default };
