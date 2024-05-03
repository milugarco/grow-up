import { useState } from "react";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import InputCustom from "../../components/Input";
import CustomButton from "../../components/Button";
import Logo from "../../components/Logo";
import { createUser } from "../../client/routes/user";
import { login } from "../../client/routes/auth";

const background = require('../../../assets/FUNDO.jpg')

const SignIn = () => {
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigation = useNavigation()

  const handleInputUserNameChange = (value) => {
    setUserName(value);
  };

  const handleInputEmailChange = (value) => {
    setEmail(value);
  };

  const handleInputPasswordChange = (value) => {
    setPassword(value);
  };

  const handleSignInScreen = () => {
    navigation.navigate('SignIn');
  }

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      alert('Preencha todos os campos')
      return;
    }
    const user = await createUser(userName, email, password)

    if (user.status === 201) {
      await login(email, password);
      navigation.navigate('DashBoard');
    } else {
      alert('Não foi possível cadastrar o usuário')
    }
  }

  return (
    <View style={[styles.container]}>
      <ImageBackground source={background} resizeMode="cover" style={styles.background} >
        <View style={{ height: '25%' }}>
          <Logo width={200} height={70} />
        </View>

        <View style={[styles.containerInputs]}>
          <Text style={[styles.title]}>
            Registre-se:
          </Text>
          <InputCustom onChange={handleInputUserNameChange} placeholder={'Digite aqui seu nome'} backgroundColor={'#fff'} width={250} height={50} />
          <InputCustom onChange={handleInputEmailChange} placeholder={'Digite aqui seu email'} backgroundColor={'#fff'} width={250} height={50} />
          <InputCustom onChange={handleInputPasswordChange} placeholder={'Digite aqui sua senha'} backgroundColor={'#fff'} width={250} height={50} />
        </View>

        <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 }}>
          <CustomButton onPress={handleRegister} title={'Cadastrar'} backgroundColor={'#102900'} width={150} textColor={'#fff'} fontSize={20} />
          <Text >
            Já possui uma conta?
            <Text onPress={handleSignInScreen} style={[styles.text]}>
              {'  '}
              Faça login aqui.
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#a6d390',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    color: '#a6d390',
    fontWeight: 'bold'
  },
  containerInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  }
});

export default SignIn
