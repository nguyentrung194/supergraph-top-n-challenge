const { print } = require("graphql");
const fetch = require("node-fetch");

function sendRequest(url, queryFn) {
  return fetch(url)
    .then(async (res) => {
      const data = await res.json();
      return data.data[`${queryFn}`];
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

function getQueryString(args) {
  const operationString = print(args[3].operation);
  const fragmentsString = Object.keys(args[3].fragments)
    .map((fragmentName) => print(args[3].fragments[fragmentName]))
    .join("\n\n");
  const documentString = `${operationString}\n${fragmentsString}&variables=${JSON.stringify(
    args[3].variableValues
  )}`;
  return documentString;
}

module.exports = { getQueryString, sendRequest };
