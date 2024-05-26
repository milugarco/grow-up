import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export async function login(email, password) {
  try {
    const response = await axios.get('https://grow-up-api-jcvi.onrender.com/api/auth/v1/auth', {
      params: {
        email: email,
        password: password
      },
    });

    if (response.status === 200) {
      const token = response.data;

      await AsyncStorage.setItem('authToken', token);

      return {
        status: response.status
      };
    }

  } catch (error) {
    console.error('Erro ao realizar o login:', error);
    return {
      error: error.message
    };
  }
}

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    console.log('Logout bem-sucedido!');
  } catch (error) {
    console.error('Erro ao realizar o logout:', error);
    Alert.alert('Erro', 'Erro ao tentar fazer logout. Por favor, tente novamente.');
  }
};
