"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  email: string;
  role: string;
}
export const getUser = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (token) {
    const decodedToken = jwt.decode(token) as User;
    return decodedToken;
  } else {
    return null;
  }
};
