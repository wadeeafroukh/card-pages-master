import axios from "axios";
import { User } from "../interfaces/User";

const api: string = process.env.REACT_APP_API + "/users";

export async function getAllUsers(token: string) {
  return await axios.get(api, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export async function addNewUser(newUser: User) {
  return await axios.post(api, newUser);
}
