import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function createDebt(description, value, createdAt) {

  const request = {
    description,
    value,
    createdAt: createdAt ? createdAt : new Date(),
  }

  const token = await AsyncStorage.getItem('authToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Envia o token JWT no cabeçalho Authorization
    }
  };

  try {
    const response = await axios.post('https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt', request, config);

    if (response.status === 201) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao criar divida:', error.message);
    return {
      error: error.message
    };
  }
}

export async function findAllDebts(initialDate, finalDate, page, perPage) {
  const token = await AsyncStorage.getItem('authToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Envia o token JWT no cabeçalho Authorization
    },
    params: {
      initialDate,
      finalDate,
      page,
      perPage,
    }
  };

  try {
    const response = await axios.get('https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt', config);

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao encontrar dividas:', error.message);
    return {
      error: error.message
    };
  }
}

export async function updateDebt(debtId, description, value, createdAt) {
  const token = await AsyncStorage.getItem('authToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Envia o token JWT no cabeçalho Authorization
    },
    params: {
      description,
      value,
      createdAt,
    }
  };

  try {
    const response = await axios.patch(`https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/${debtId}`, config);

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao atualizar divida:', error.message);
    return {
      error: error.message
    };
  }
}

export async function findOneDebt(debtId) {
  const token = await AsyncStorage.getItem('authToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Envia o token JWT no cabeçalho Authorization
    },
  };

  try {
    const response = await axios.patch(`https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/${debtId}`, config);

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao buscar divida:', error.message);
    return {
      error: error.message
    };
  }
}

export async function getDebtReport() {
  const token = await AsyncStorage.getItem('authToken');

  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get('https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/report/2024', config);

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao buscar relatório de dívidas para 2024:', error.message);
    return {
      error: error.message
    };
  }
}

export async function deleteDebt(debtId) {
  const token = await AsyncStorage.getItem('authToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Envia o token JWT no cabeçalho Authorization
    }
  };

  try {
    const response = await axios.patch(`https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/${debtId}/delete`, config);

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status
      };
    }
  } catch (error) {
    console.log('Erro ao deletar divida:', error.message);
    return {
      error: error.message
    };
  }
}
