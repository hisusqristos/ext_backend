import jwt from "jsonwebtoken";

const generateToken = async (id: any, email: string) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "12H",
  });
};

const validate = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    return userData;
  } catch (e) {
    return null;
  }
};
export { generateToken, validate };
