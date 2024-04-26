import { useState } from "react";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, StatusBar, SafeAreaView, Text, View  } from 'react-native';
import InputCustom from "../../components/Input";
import CustomButton from "../../components/Button";


const SignIn = () => {
  const [titulo, setTituloInput] = useState("");
  const [descricao, setDescricaoInput] = useState("");
  const [dia, setDiaInput] = useState("");
  const [mes, setMesInput] = useState("");
  const [ano, setAnoInput] = useState("");
  const [gasto, setGastoInput] = useState("");
  const navigation = useNavigation(); // Certifique-se de ter importado useNavigation corretamente

  const handleInputTituloChange = (value) => {
    setTituloInput(value);
  };

  const handleInputDescricaoChange = (value) => {
    setDescricaoInput(value);
  };

  const handleInputDiaChange = (value) => {
    setDiaInput(value);
  };

  const handleInputMesChange = (value) => {
    setMesInput(value);
  };

  const handleInputAnoChange = (value) => {
    setAnoInput(value);
  };

  const handleInputGastoChange = (value) => {
    setGastoInput(value);
  };

  const salvar = () => {
    if (titulo && descricao && dia && mes && ano && gasto) {
      alert('Novo gasto salvo com sucesso!');
      navigation.navigate('DashBoard');
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  const cancelar = () => {
    alert('Operação cancelada');
    navigation.navigate('DashBoard');
  };


  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Text style={styles.addgasto}>Adicionar Gasto</Text>
        <View style={styles.containertitulo}>
          <Text style={styles.titulo}>Título:</Text>
          <InputCustom placeholder={'Insira o título do seu gasto'} backgroundColor={'#91AE73'} width={300} onChange={handleInputTituloChange} top={80} marginBottom={0} marginTop={-80} />
        </View>
        <View style={styles.containerdescricao}>
          <Text style={styles.descricao}>Descrição:</Text>
          <InputCustom placeholder={'Insira a descrição do seu gasto'} backgroundColor={'#91AE73'} width={300} onChange={handleInputDescricaoChange} top={80} marginBottom={25} marginTop={-80} />
        </View>
        <View style={styles.containerdata}>
          <Text style={styles.data}>Data:</Text>
          <View style={styles.containerinputdata}>
            <InputCustom placeholder={'DIA'} backgroundColor={'#91AE73'} width={90} onChange={handleInputDiaChange} top={80} marginBottom={25} marginTop={-80} />
            <View style={styles.espacamento} />
            <InputCustom placeholder={'MÊS'} backgroundColor={'#91AE73'} width={90} onChange={handleInputMesChange} top={80} marginBottom={25} marginTop={-80} />
            <View style={styles.espacamento} />
            <InputCustom placeholder={'ANO'} backgroundColor={'#91AE73'} width={90} onChange={handleInputAnoChange} top={80} marginBottom={25} marginTop={-80} />
          </View>
        </View>
        <View style={styles.containervalorgasto}>
          <Text style={styles.valorgasto}>Valor Gasto:</Text>
          <InputCustom placeholder={'Insira o seu valor gasto:'} backgroundColor={'#91AE73'} width={300} onChange={handleInputGastoChange} top={80} marginBottom={0} marginTop={-80} />
        </View>
        <View style={styles.containerbotoes}>
          <CustomButton title={'Salvar'} backgroundColor={'#3B9A00'} width={150} marginBottom={5} marginTop={5} textColor={'#fff'} fontSize={20} top={0} onPress={salvar}/>
          <View style={styles.espacamento} />
          <CustomButton title={'Cancelar'} backgroundColor={'#3B9A00'} width={150} marginBottom={5} marginTop={5} textColor={'#fff'} fontSize={20} top={0} onPress={cancelar}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#181C16',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
    width:355,
    height: 700,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  addgasto: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#102900',
    marginTop: 60,
  },
  containertitulo: {
    display: 'flex',
    height: 100,
    width:355,
    alignItems: 'center',
    padding: 0,
  },
  titulo: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102900',
  },
  containerdescricao: {
    display: 'flex',
    height: 100,
    width:355,
    alignItems: 'center',
    padding: 0,
  },
  descricao: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102900',
  },
  containerdata: {
    display: 'flex',
    height: 100,
    width:355,
    alignItems: 'center',
    padding: 0,
  },
  data: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102900',
  },
  containerinputdata: {
    display: 'flex',
    flexDirection: 'row',
  },
  espacamento: {
    width: 15, // Ajuste para adicionar espaçamento entre os botões
  },
  containervalorgasto: {
    display: 'flex',
    height: 100,
    width:355,
    alignItems: 'center',
    padding: 0,
  },
  valorgasto: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102900',
  },
  containerbotoes: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    width:355,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});

export default SignIn