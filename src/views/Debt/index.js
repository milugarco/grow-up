import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputCustom from "../../components/Input";
import CustomButton from "../../components/Button";
import { Picker } from "@react-native-picker/picker";
import { createDebt } from "../../client/routes/debt";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DebtScreen() {
  const navigation = useNavigation()
  const route = useRoute();
  const { activeDebt } = route.params;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (activeDebt === null) {
      setTitle("Adicionar Gasto");
    } else {
      setTitle("Editar Gasto");
    }

    const date = new Date();

    setDay(date.getDay());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  }, [activeDebt]);

  const handleInputDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleInputValueChange = (value) => {
    setValue(value);
  };

  const handleInputDayChange = (value) => {
    setDay(value);
  };

  const handleInputMonthChange = (value) => {
    setMonth(value);
  };

  const handleInputYearChange = (value) => {
    setYear(value);
  };

  const handleCreateDebt = async () => {
    try {
      if (!description || !value || !month || !day || !year) {
        alert('Preencha todos os campos');
        return;
      }

      const newMonth = month.toString().padStart(2, '0');
      const newDay = day.toString().padStart(2, '0');
      const createdAt = `${year}-${newMonth}-${newDay}T00:00:00.000Z`

      const response = await createDebt(description, Number(value), createdAt);

      if (response.status === 201) {
        navigation.navigate('DashBoard')
        alert('Gasto cadastrado com sucesso!');
        return;
      } else {
        alert('Gasto não cadastrado')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.containerMain}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>Título:</Text>
        <InputCustom onChange={handleInputDescriptionChange} placeholder={'Insira o título do seu gasto'} backgroundColor={'#91AE73'} width={260} height={50} />

        <Text style={styles.label}>Data:</Text>
        <View style={styles.dateContainer}>
          <InputCustom onChange={handleInputDayChange} placeholder={'Dia'} backgroundColor={'#91AE73'} width={82} height={50} />
          <Picker
            selectedValue={month}
            onValueChange={(itemValue) => handleInputMonthChange(itemValue)}
            style={{ height: 50, width: 100, backgroundColor: '#91AE73', color: 'white' }}
          >
            {[...Array(12).keys()].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
          <InputCustom onChange={handleInputYearChange} placeholder={'Ano'} backgroundColor={'#91AE73'} width={82} height={50} />
        </View>

        <Text style={styles.label}>Valor Gasto:</Text>
        <InputCustom onChange={handleInputValueChange} placeholder={'Insira o seu valor gasto'} backgroundColor={'#91AE73'} width={260} height={50} />

        <View style={styles.buttonContainer}>
          <CustomButton onPress={handleCreateDebt} title={'Salvar'} backgroundColor={'#3B9A00'} width={111} textColor={'#fff'} fontSize={20} />
          <CustomButton title={'Cancelar'} backgroundColor={'#3B9A00'} width={141} textColor={'#fff'} fontSize={20} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#181C16',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  containerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    gap: 10,
    width: '90%',
    height: '85%',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    color: '#102900',
    fontSize: 28,
    fontWeight: 'bold',
  },
  label: {
    color: '#102900',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
});
