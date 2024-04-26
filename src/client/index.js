import axios from "axios";

export const api = async () => {

  return axios.create({
    baseURL: `https://grow-up-api-jcvi.onrender.com/api/`,
    timeout: 60000
  })
}
