const { getQueryString, sendRequest } = require("./lib/index.js");

const THREADS_URL = process.env.THREADS_URL || "http://localhost:4001";

module.exports = class {
  static threads(args) {
    console.log(args);
    const documentString = getQueryString(args);
    console.log(documentString);
    return sendRequest(
      `${THREADS_URL}/graphql?query=${documentString}`,
      "threads"
    );
  }
};
