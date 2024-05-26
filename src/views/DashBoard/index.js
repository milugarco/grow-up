import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, StatusBar, SafeAreaView, Text, View, Button, FlatList } from 'react-native';
import CustomButton2 from "../../components/Button2";
import CustomButton from "../../components/Button";
import { signOut } from '../../client/routes/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findAllDebts, getDebtReport } from '../../client/routes/debt';
import { formatDate } from '../../utils/date-format';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const navigation = useNavigation()
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [day, setDay] = useState(new Date().getDate())
  const [year, setYear] = useState(new Date().getFullYear())
  const [debts, setDebts] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          navigation.navigate('SignIn')
        }
      } catch (error) {
        console.error('Erro ao verificar o authToken:', error);
      }
    };
    checkAuthToken();
    handleFindDebts();
    handleReport();
  }, []);

  useEffect(() => {
    handleFindDebts();
    handleReport();
  }, [day, month])

  const handleFindDebts = async () => {
    try {
      const newMonth = month.toString().padStart(2, '0');
      const newDay = day.toString().padStart(2, '0');
      const initialDate = `${year}-${newMonth}-${newDay}T00:00:00.000Z`
      const finalDate = `${year}-${newMonth}-${newDay}T23:59:59.999Z`
      const response = await findAllDebts(initialDate, finalDate, 1, 3);
      if (response.status === 200) {
        setDebts(response.data.data);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  const handleReport = async () => {
    try {
      const response = await getDebtReport();
      let subTotal = 0

      if (response.status === 200) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = months[month - 1];

        response.data.map((month) => {
          if (month.month === currentMonth) {
            month.debts.map((debt) => {
              subTotal += Number(debt.value)
            })
          }
        })
      }
      setTotal(subTotal)
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  const handleDate = (itemValue, state) => {
    if (state === 'day') {
      setDay(itemValue)
      return;
    }
    else if (state === 'month') {
      setMonth(itemValue)
      return;
    }
  }

  const handleAddDebt = () => {
    navigation.navigate('DebtScreen')
  }

  const handleListDebts = () => {
    navigation.navigate('ListDebtsScreen', { day: day, month: month, year: year })
  }

  const handleSignOut = async () => {
    await signOut()
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginTop: 50 }}>
        <Button title='SAIR' onPress={handleSignOut} style={{ width: '25%' }} />
        <View style={{ display: 'flex', justifyContent: 'center', width: '60%', alignItems: 'center' }}>
          <Text style={styles.symbol}>
            R$
            <Text style={styles.total}>{total}
              <Text style={styles.arrow}>↑</Text>
            </Text>
          </Text>
          <Text style={styles.debt}>Gasto total deste mês</Text>
        </View>
        <Button title='SAIR' onPress={handleSignOut} style={{ width: '25%' }} />
      </View>
      <View style={styles.quadrado}>
        <View style={styles.btnContainer}>
          <Text style={{ color: 'white', }}>
            DIA:
          </Text>
          <Picker
            selectedValue={day.toString()}
            onValueChange={(itemValue) => handleDate(itemValue, 'day')}
            style={{ height: 45, width: 100, backgroundColor: '#535353', color: 'white', }}
          >
            {[...Array(31).keys()].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>

          <Text style={{ color: 'white', }}>
            MÊS:
          </Text>
          <Picker
            selectedValue={month.toString()}
            onValueChange={(itemValue) => handleDate(itemValue, 'month')}
            style={{ height: 45, width: 100, backgroundColor: '#535353', color: 'white', }}
          >
            {[...Array(12).keys()].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>


        </View>

        <View style={styles.quadrado2}>
          <View style={styles.conteiner2}>
            <View style={styles.esquerda}>
              <Text style={[styles.gastos]}>Gastos</Text>
            </View>
            <View style={styles.direita}>
              <CustomButton title={'+'} textColor={'black'} backgroundColor={'#3B9A00'} fontSize={25} alignItems={'center'} justifyContent={'center'} padding={0} width={45} height={45} onPress={handleAddDebt} />
              <CustomButton title={'V'} textColor={'black'} backgroundColor={'#3B9A00'} fontSize={25} alignItems={'center'} justifyContent={'center'} padding={0} width={45} height={45} onPress={handleListDebts} />
            </View>
          </View>
          <View style={styles.textogasto}>
            {debts.length > 0 ? debts.map((debt) => {
              return (
                <View key={debt.id} style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                  <Text style={[styles.texto]}>
                    {debt.description} R${Number(debt.value).toFixed(2)}
                  </Text>
                  <Text style={[styles.texto]}>
                    {formatDate(debt.createdAt)}
                  </Text>
                </View>
              )
            }) : (
              <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                <Text style={[styles.texto]}>
                  NENHUMA DIVIDA ENCONTRADA!
                </Text>
              </View>

            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181C16',
    justifyContent: 'center',
  },
  quadrado: {
    backgroundColor: '#222222',
    height: 630,
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20, // Adicionado espaçamento interno para o conteúdo dentro do quadrado
    alignItems: 'center',
  },
  total: {
    color: '#ADFF30',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center', // Ajuste para centralizar horizontalmente

  },
  arrow: {
    color: '#ADFF30',
    fontSize: 25,
  },
  symbol: {
    color: '#ADFF30',
    fontWeight: 'bold',
    fontSize: 25,
  },
  debt: {
    color: '#ADFF30',
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: 'row', // Ajuste para alinhar os botões na mesma linha
    gap: 10,
    width: '100%',
    justifyContent: 'space-around', // Ajuste para centralizar horizontalmente
  },
  espacamento: {
    width: 150, // Ajuste para adicionar espaçamento entre os botões
  },
  quadrado2: {
    width: 355,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 410,
  },
  esquerda: {
    display: 'flex',
    marginRight: 20,
  },
  direita: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    marginLeft: 20,
  },
  conteiner2: {
    flexDirection: 'row', // Ajuste para alinhar os botões na mesma linha
    justifyContent: 'space-between', // Ajuste para centralizar horizontalmente
    alignItems: 'center',
    padding: 10,
  },
  gastos: {
    fontSize: 20,
  },
  textogasto: {
    display: 'flex',
    height: '50%',
  },
  texto: {
    fontSize: 16,
  }
});
