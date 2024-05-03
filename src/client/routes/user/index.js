import axios from "axios";

export async function createUser(userName, email, password) {
  try {
    const request = {
      name: userName,
      email: email,
      password: password
    }

    const response = await axios.post('https://grow-up-api-jcvi.onrender.com/api/users/v1/user', request);

    if (response.status === 201) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao criar conta:', error.message);
    return {
      error: error.message
    };
  }
}
