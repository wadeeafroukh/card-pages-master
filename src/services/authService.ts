import axios from "axios";

const api: string = process.env.REACT_APP_API + "/users/login";



export async function userLogin(email: string, password: string) {
  return await axios.post(api, { email, password });
}

export function setToken(token: string) {
  sessionStorage.setItem("token", token);
}

export function getToken(): string | null {
  return sessionStorage.getItem("token");
}

export function removeToken() {
  sessionStorage.removeItem("token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
interface TokenPayLoad {
  id: string;
  isBusiness?: boolean;
  isAdmin?: boolean;
}

export function getUserFromToken(): TokenPayLoad | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    
    
    return {
      id: payload._id,
      isBusiness: payload.isBusiness,
      isAdmin: payload.isAdmin,
    };
  } catch (error) {
    return null;
  }
}
