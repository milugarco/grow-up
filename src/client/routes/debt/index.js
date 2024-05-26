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
  if (!token) {
    console.log('Token not found');
    return { error: 'Token not found' };
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'Origin': 'https://grow-up-api-jcvi.onrender.com',
      'Referer': 'https://grow-up-api-jcvi.onrender.com/api',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/125.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"'
    }
  };

  try {
    const response = await axios.patch(
      `https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/${debtId}?description=${description}&value=${value}&createdAt=${createdAt}`,
      null,
      config
    );

    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status
      };
    } else {
      console.log('Unexpected response status:', response.status);
      return {
        error: `Unexpected response status: ${response.status}`
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
    const response = await axios.get(`https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/${debtId}`, config);

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
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.log('Token not found');
      return { error: 'Token not found' };
    }

    console.log(debtId);

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Origin': 'https://grow-up-api-jcvi.onrender.com/',
        'Referer': 'https://grow-up-api-jcvi.onrender.com/api',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      }
    };

    const response = await axios.patch(`https://grow-up-api-jcvi.onrender.com/api/debts/v1/debt/${debtId}/delete`, null, config);

    if (response.status === 200) {
      console.log(response.status)
      return {
        data: response.data,
        status: response.status
      };
    } else {
      console.log('Unexpected response status:', response.status);
      return {
        error: `Unexpected response status: ${response.status}`
      };
    }
  } catch (error) {
    console.log('Erro ao deletar divida:', error.message);
    return {
      error: error.message
    };
  }
}
