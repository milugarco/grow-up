import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputCustom from "../../components/Input";
import CustomButton from "../../components/Button";
import { Picker } from "@react-native-picker/picker";
import { createDebt, findOneDebt, updateDebt } from "../../client/routes/debt";
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
      const date = new Date();

      setDay(date.getDate());
      setMonth(date.getMonth() + 1);
      setYear(date.getFullYear());
    } else {
      handleFindOneDebt(activeDebt)
      setTitle("Editar Gasto");
    }
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

  const handleCancel = () => {
    navigation.navigate('DashBoard')
  }

  const handleUpdateDebt = async () => {
    try {
      if (!description || !value || !month || !day || !year) {
        alert('Preencha todos os campos');
        return;
      }

      const newMonth = month.toString().padStart(2, '0');
      const newDay = day.toString().padStart(2, '0');
      const createdAt = `${year}-${newMonth}-${newDay}T00:00:00.000Z`

      const response = await updateDebt(activeDebt, description, Number(value), createdAt);

      if (response.status === 200) {
        navigation.navigate('DashBoard')
        alert('Gasto atualizado com sucesso!');
        return;
      } else {
        alert('Gasto não atualizado')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFindOneDebt = async (debtId) => {
    try {
      const response = await findOneDebt(debtId)
      setDescription(response.data.description)
      const date = new Date(response.data.createdAt)
      setDay(date.getDate())
      setYear(date.getFullYear())
      setValue(Number(response.data.value))
      setMonth(date.getMonth() + 1)
    } catch (error) {
      alert('Erro ao buscar divida')
      console.log(error);
    }
  }

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

  const handleCreateOrUpdate = () => {
    if (activeDebt === null) {
      handleCreateDebt();
    } else {
      handleUpdateDebt();
    }
  }

  return (
    <SafeAreaView style={styles.containerMain}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          value={description}
          onChangeText={handleInputDescriptionChange}
          placeholder={'Insira o título do seu gasto'}
          style={{
            backgroundColor: '#91AE73',
            width: 260,
            fontSize: 15,
            height: 50,
            padding: 15,
            textAlign: 'center',
            borderRadius: 50,
            marginBottom: 0,
            marginTop: 0,
            top: 0
          }}
        />

        <Text style={styles.label}>Data:</Text>
        <View style={styles.dateContainer}>
          <TextInput
            value={day.toString()}
            onChangeText={handleInputDayChange}
            placeholder={'Dia'}
            style={{
              backgroundColor: '#91AE73',
              width: 82,
              fontSize: 15,
              height: 50,
              padding: 15,
              textAlign: 'center',
              borderRadius: 50,
              marginBottom: 0,
              marginTop: 0,
              top: 0
            }}
          />

          <Picker
            selectedValue={month.toString()}
            onValueChange={(itemValue) => handleInputMonthChange(itemValue)}
            style={{ height: 50, width: 100, backgroundColor: '#91AE73', color: 'white' }}
          >
            {[...Array(12).keys()].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
          <TextInput
            value={year.toString()}
            onChangeText={handleInputYearChange}
            placeholder={'Ano'}
            style={{
              backgroundColor: '#91AE73',
              width: 82,
              fontSize: 15,
              height: 50,
              padding: 15,
              textAlign: 'center',
              borderRadius: 50,
              marginBottom: 0,
              marginTop: 0,
              top: 0
            }}
          />
        </View>

        <Text style={styles.label}>Valor Gasto:</Text>

        <TextInput
          value={value.toString()}
          onChangeText={handleInputValueChange}
          placeholder={'Insira o seu valor gasto'}
          style={{
            backgroundColor: '#91AE73',
            width: 260,
            fontSize: 15,
            height: 50,
            padding: 15,
            textAlign: 'center',
            borderRadius: 50,
            marginBottom: 0,
            marginTop: 0,
            top: 0
          }}
        />

        <View style={styles.buttonContainer}>
          <CustomButton onPress={handleCreateOrUpdate} title={'Salvar'} backgroundColor={'#3B9A00'} width={111} textColor={'#fff'} fontSize={20} />
          <CustomButton onPress={handleCancel} title={'Cancelar'} backgroundColor={'#FF0000'} width={141} textColor={'#fff'} fontSize={20} />
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
