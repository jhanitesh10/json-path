const data = require("./data/get-relationship.json");
const jp = require("jsonpath");

const validateJsonPathArgument = (path, data) => {
  if (!path && !data) {
    throw new Error("path and data are empty!");
  }
  if (!path) {
    throw new Error("path is empty!");
  }
  if (!data) {
    throw new Error("data is empty!");
  }
  return { path, data };
};

const fetchValueFromPath = (pathValue, dataValue) => {
  const { path, data } = validateJsonPathArgument(pathValue, dataValue);
  const nodes = jp.apply(dataValue, pathValue, function (value) {
    return value;
  });
  console.log("nodes", nodes);
  return nodes;
};

module.exports = {
  validateJsonPathArgument,
  fetchValueFromPath,
};
