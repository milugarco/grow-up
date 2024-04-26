import axios from "axios";

export const api = async () => {
  const { port, ip } = await allInfo();

  return axios.create({
    baseURL: `https://grow-up-api-jcvi.onrender.com/api/`,
    timeout: 60000
  })
}
