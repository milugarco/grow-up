import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View } from "react-native"

import InputCustom from "../../components/Input";
import Logo from "../../components/Logo";
import CustomButton from "../../components/Button";
import { login } from "../../client/routes/auth";

const background = require('../../../assets/FUNDO.jpg')

const SignIn = () => {

    const [userInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const navigation = useNavigation()

    const handleInputUserChange = (value) => {
        setUserInput(value);
    };

    const handleInputPasswordChange = (value) => {
        setPasswordInput(value);
    };

    const handleLogin = async () => {
        try {
            const { status } = await login(userInput, passwordInput);

            if (status === 200) {
                navigation.navigate('DashBoard');
                return;
            }

            return alert('Erro ao realizar login')
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={[styles.container]}>
            <ImageBackground source={background} resizeMode="cover" style={styles.background} >
                <Logo width={200} height={70} marginBottom={100} />
                <Text style={[styles.title]}>
                    Faça login:
                </Text>

                <InputCustom placeholder={'Digite aqui seu email'} backgroundColor={'#fff'} width={250} onChange={handleInputUserChange} top={80} marginBottom={25} marginTop={45} />

                <InputCustom placeholder={'Digite aqui sua senha'} backgroundColor={'#fff'} width={250} onChange={handleInputPasswordChange} top={80} marginBottom={18} />

                <CustomButton title={'Acessar'} backgroundColor={'#102900'} width={150} marginBottom={5} marginTop={5} textColor={'#fff'} fontSize={20} top={80} onPress={handleLogin} />

                <CustomButton title={'Criar conta'} width={150} textColor={'#fff'} fontSize={20} top={80} onPress={handleRegister} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    title: {
        color: '#a6d390',
        fontWeight: 'bold',
        fontSize: 24,
        top: 80
    },
});

export default SignIn
