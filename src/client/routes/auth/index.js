import { api } from "../..";

export async function login(email, password) {
  (await api())
    .get(`auth/v1/auth?email=${email}&password=${password}`)
    .then(response => { return response })
    .catch(error => { return error })
}
