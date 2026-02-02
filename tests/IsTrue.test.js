const IsNullFunc = require("../modules/IsNull.js");

test("Algo com valor não é nulo", () =>{
  expect(IsNullFunc.IsNull(1)).toBe(false);
  expect(IsNullFunc.IsNull(null)).toBe(true);
});
