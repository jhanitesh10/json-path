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

describe("json path argument validation:", () => {
  test("has valid data directory ", () => {
    expect(data).not.toBeUndefined();
  });
  test("has both path and data empty", () => {
    expect(() => validateJsonPathArgument()).toThrow(
      "path and data are empty!"
    );
  });
  test("has empty data", () => {
    expect(() => validateJsonPathArgument("/data/", null)).toThrow(
      "data is empty!"
    );
  });
  test("has empty path", () => {
    expect(() => validateJsonPathArgument(null, { data: {} })).toThrow(
      "path is empty!"
    );
  });
  test("has valid arguments", () => {
    expect(() => validateJsonPathArgument("/path", { data: {} })).not.toThrow();
  });
  test("has valid and same argument as passed", () => {
    const result = validateJsonPathArgument("/path", { name: "Nitesh" });
    expect(result).toMatchObject({
      path: "/path",
      data: { name: "Nitesh" },
    });
  });
});

const fetchValueFromPath = (pathValue, dataValue) => {
  const { path, data } = validateJsonPathArgument(pathValue, dataValue);
  const nodes = jp.apply(dataValue, pathValue, function (value) {
    return value;
  });
  console.log("nodes", nodes);
  return nodes;
};

describe("fetch value via json path", () => {
  test("has path undefined will return empty array ", () => {
    const path = "$.empty";
    const result = fetchValueFromPath(path, data);
    expect(result).toEqual([]);
  });
  test("has valid path and returns name", () => {
    const path = "$.data.relationshipQuery.getRelationshipItems.items[*].name";
    const result = fetchValueFromPath(path, data);
    expect(result[0].value).toEqual("Super Man");
  });
  test("has valid path and returns all the stakeholders", () => {
    const path =
      "$.data.relationshipQuery.getRelationshipItems.items[*].stakeholderRoles.items[*]";
    const result = fetchValueFromPath(path, data);
    expect(result).toHaveLength(2);
  });
  test("has valid path and returns null for title", () => {
    const path = "$.data.relationshipQuery.getRelationshipItems.items[0].title";
    const result = fetchValueFromPath(path, data);
    expect(result[0].value).toBeNull();
  });
});
