import axios from "axios";
import { Card } from "../interfaces/Card";
import { getToken } from "./authService";

const api: string = process.env.REACT_APP_API + "/cards";

export async function getAllCards() {
  return await axios.get(api);
}

export async function getMyCards() {
  const token = getToken();
  if (!token) throw new Error("No token found");
  return await axios.get(`${api}/my-cards`, {
    headers: { "x-auth-token": token },
  });
}
export async function createCard(newCard: Card) {
  const token = getToken();
  if (!token) throw new Error("No token found");
  return await axios.post(api, newCard, { headers: { "x-auth-token": token } });
}
export async function updateCard(_id: string, updateCard: Card) {
  const token = getToken();
  if (!token) throw new Error("No token found");
  return await axios.put(`${api}/${_id}`, updateCard, {
    headers: { "x-auth-token": token },
  });
}
export async function deleteCard(_id: string) {
  const token = getToken();
  if (!token) throw new Error("No token found");
  return await axios.delete(`${api}/${_id}`, {
    headers: { "x-auth-token": token },
  });
}

export async function getCardById(_id: string) {
  return await axios.get(`${api}/${_id}`);
}

export async function toggleLike(_id: string) {
  const token = getToken();
  if (!token) throw new Error("No token found");
  console.log(token);
  return axios.patch(
    `${api}/${_id}`,
    {},
    { headers: { "x-auth-token": token } }
  );
}
