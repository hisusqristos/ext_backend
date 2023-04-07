import { validateUser } from "../userValidator"

const validUser = {
  username: "example",
  email: "test@example.com",
  role: "normal",
  password: "password123"
};

describe("VALIDATIONS", () => {
  test("User validation", () => {
    const missingField = {
      username: "example",
      email: "test@example.com"
    };

    const incorrectType = { ...validUser, username: 3 } // username is number, should be string

    expect(validateUser(validUser)).toEqual(true);
    expect(validateUser(missingField)).toEqual(false);
    expect(validateUser(incorrectType)).toEqual(false);
  });

  test("password not long enough", () => {
    expect(validateUser({ ...validUser, password: "smol" })).toBe(false);
  });

  test("vaidate email", () => {
    expect(validateUser({ ...validUser, email: "incorrect" })).toBe(false);
  });
});
