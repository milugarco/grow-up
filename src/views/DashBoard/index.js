import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, StatusBar, SafeAreaView, Text, View, Button } from 'react-native';


import CustomButton2 from "../../components/Button2";
import CustomButton from "../../components/Button";
import { signOut } from '../../client/routes/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const navigation = useNavigation()

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
  }, []);

  const alertames = () => {
    alert(`Escolha um mês`);
  };
  const alertadia = () => {
    alert(`Escolha um dia`);
  };
  const addgasto = () => {
    navigation.navigate('Register')
  };

  const handleSignOut = async () => {
    await signOut()
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.r$}>
        R$<Text style={styles.valor}>00,00<Text style={styles.seta}>↑</Text> </Text>{' '}
      </Text>
      <Text style={styles.gasto}>Gasto total deste mês</Text>
      <View style={styles.quadrado}>
        <View style={styles.botoesContainer}>
          <CustomButton2
            title={'DIA'}
            backgroundColor={'#535353'}
            width={100}
            marginBottom={5}
            marginTop={5}
            textColor={'#fff'}
            fontSize={20}
            onPress={alertadia}
          />
          <View style={styles.espacamento} />
          <Button title='SAIR' onPress={handleSignOut} />
          <CustomButton2
            title={'MÊS'}
            backgroundColor={'#535353'}
            width={100}
            marginBottom={5}
            marginTop={5}
            textColor={'#fff'}
            fontSize={20}
            onPress={alertames}
          />
        </View>
        <View style={styles.quadrado2}>
          <View style={styles.conteiner2}>
            <View style={styles.esquerda}>
              <Text style={[styles.gastos]}>Gastos</Text>
            </View>
            <View style={styles.espacamento} />
            <View style={styles.direita}>
              <CustomButton title={'+'} textColor={'black'} backgroundColor={'#3B9A00'} fontSize={25} alignItems={'center'} justifyContent={'center'} padding={0} width={45} height={100} onPress={addgasto}> </CustomButton>
            </View>
          </View>
          <View style={styles.textogasto}>
            <Text style={[styles.texto]}>Vacina bovina R$139,26         26 NOV 2023</Text>
            <Text style={[styles.texto]}>Vacina bovina R$139,26         26 NOV 2023</Text>
            <Text style={[styles.texto]}>Vacina bovina R$139,26         26 NOV 2023</Text>
            <Text style={[styles.texto]}>Vacina bovina R$139,26         26 NOV 2023</Text>
            <Text style={[styles.texto]}>Vacina bovina R$139,26         26 NOV 2023</Text>
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
    justifyContent: 'center', // Ajuste para centralizar verticalmente
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
  valor: {
    color: '#ADFF30',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center', // Ajuste para centralizar horizontalmente
    marginTop: 80,
    marginLeft: 30,
  },
  seta: {
    color: '#ADFF30',
    fontSize: 25,
    marginTop: 80,
    marginLeft: 30,
    textAlign: 'center', // Ajuste para centralizar horizontalmente
  },
  r$: {
    color: '#ADFF30',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 80,
    marginLeft: 30,
    textAlign: 'center', // Ajuste para centralizar horizontalmente
  },
  gasto: {
    color: '#ADFF30',
    fontSize: 18,
    textAlign: 'center',
  },
  botoesContainer: {
    flexDirection: 'row', // Ajuste para alinhar os botões na mesma linha
    justifyContent: 'center', // Ajuste para centralizar horizontalmente
  },
  espacamento: {
    width: 150, // Ajuste para adicionar espaçamento entre os botões
  },
  quadrado2: {
    width: 355,
    height: 190,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 320,
  },
  esquerda: {
    display: 'flex',
    marginRight: 20,
  },
  direita: {
    display: 'flex',
    marginLeft: 20,
  },
  conteiner2: {
    flexDirection: 'row', // Ajuste para alinhar os botões na mesma linha
    justifyContent: 'center', // Ajuste para centralizar horizontalmente
    alignItems: 'center',
    padding: 3,
  },
  gastos: {
    fontSize: 20,
  },
  textogasto: {
    display: 'flex',
    alignItems: 'center',
    height: 130,
  },
  texto: {
    fontSize: 16,
  }
});
