const _ = require("lodash");
const { getQueryString, sendRequest } = require("./lib/index.js");

const POSTS_URL = process.env.POSTS_URL || "http://localhost:4002";

module.exports = class {
  static posts(args) {
    let args_clone;
    if (!!args[0].id) {
      args_clone = _.cloneDeep(args[3]);
      args_clone.operation.variableDefinitions = [];
      args_clone.operation.selectionSet.selections = [
        args_clone.operation.selectionSet.selections?.[0].selectionSet.selections.filter(
          (e) => {
            if (e.name.value == "posts") {
              e.arguments = [];
              if (args[1].limit) {
                e.arguments.push({
                  kind: "Argument",
                  name: {
                    kind: "Name",
                    value: "limit",
                    loc: { start: 105, end: 110 },
                  },
                  value: {
                    kind: "IntValue",
                    value: args[1].limit,
                    loc: { start: 48, end: 49 },
                  },
                  loc: { start: 112, end: 122 },
                });
              }
              e.arguments.push({
                kind: "Argument",
                name: {
                  kind: "Name",
                  value: "thread_id",
                  loc: { start: 105, end: 110 },
                },
                value: {
                  kind: "IntValue",
                  value: args[0].id,
                  loc: { start: 48, end: 49 },
                },
                loc: { start: 112, end: 122 },
              });
            }
            return e.name.value == "posts";
          }
        )?.[0],
      ];
    }

    args_clone.operation.variableDefinitions =
      args_clone.operation.variableDefinitions.filter((e, i) => {
        return e.name.value != "thread_id";
      });

    const documentString = getQueryString([
      args[0],
      args[1],
      args[2],
      args_clone,
    ]);
    console.log(documentString);
    return sendRequest(`${POSTS_URL}/graphql?query=${documentString}`, "posts");
  }
};
