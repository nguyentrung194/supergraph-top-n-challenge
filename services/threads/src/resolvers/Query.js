import db from "../db.js";

const Query = {
  threads: async (_, { limit }) => {
    const { rows } = await db.query(
      "SELECT * FROM threads ORDER BY created DESC LIMIT $1",
      [limit ?? 10]
    );

    return rows;
  },
};

export { Query as default };
