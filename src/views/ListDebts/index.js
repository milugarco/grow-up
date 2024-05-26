import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteDebt, findAllDebts } from "../../client/routes/debt";
import { formatDate } from "../../utils/date-format";
import { ReactNativeModal } from 'react-native-modal'

export default function ListDebtsScreen() {
  const navigation = useNavigation()
  const route = useRoute();

  const { day, month, year } = route.params;

  const [debts, setDebts] = useState([]);
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeDebt, setActiveDebt] = useState(null);

  useEffect(() => {
    handleFindDebts()
  }, [page]);

  const toggleModal = (debtId) => {
    if (debtId) {
      setActiveDebt(debtId);
    }

    setIsModalVisible(!isModalVisible);
  };

  const handleFindDebts = async () => {
    try {
      const newMonth = month.toString().padStart(2, '0');
      const newDay = day.toString().padStart(2, '0');
      const initialDate = `${year}-${newMonth}-${newDay}T00:00:00.000Z`
      const finalDate = `${year}-${newMonth}-${newDay}T23:59:59.999Z`
      const response = await findAllDebts(initialDate, finalDate, page, 2);
      if (response.status === 200) {
        console.log(response.data.pageInfo)
        setDebts(response.data.data);
        setNextPage(response.data.pageInfo.remainingPages);
        setTotalPages(response.data.pageInfo.totalPages);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangePage = (next) => {
    if (next === true) {
      if (page === totalPages) {
        return;
      }
      return setPage(page + 1)
    } else {
      if ((nextPage === 0 && page != totalPages) && (nextPage === 0)) {
        console.log(totalPages)
        return;
      }
      if (page === 1) {
        return;
      }
      return setPage(page - 1)
    }
  }

  const handleDeleteDebt = async () => {
    try {
      const response = await deleteDebt(activeDebt);
      if (response.status === 200) {
        setActiveDebt(null);
        toggleModal(null)
        alert('Divida deletada com sucesso');
        return handleFindDebts()
      } else {
        toggleModal(null)
        alert('Erro ao deletar divida');
        return handleFindDebts()
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateDebt = (debtId) => {
    navigation.navigate('DebtScreen', { activeDebt: debtId });
  }

  return (
    <SafeAreaView style={styles.containerMain}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>Gastos</Text>

        <View style={{ display: 'flex', width: '100%', height: '90%' }}>
          {debts.length > 0 ? debts.map((debt) => {
            return (
              <View key={debt.id} style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 5, }}>
                  <Text style={[styles.texto]}>
                    {debt.description} R${Number(debt.value).toFixed(2)}
                  </Text>
                  <Text style={[styles.texto]}>
                    {formatDate(debt.createdAt)}
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', gap: 16 }}>
                  <TouchableOpacity onPress={() => handleUpdateDebt(debt.id)} style={{ width: 64, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#3B9A00' }}>
                    <Text style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>
                      Editar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleModal(debt.id)}
                    style={{ width: 72, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#FF0000' }}>
                    <Text style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
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

        <View style={{ display: 'flex', flexDirection: 'row', width: '80%', gap: 10, }}>
          <TouchableOpacity
            style={{ width: '50%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#3B9A00' }}
            onPress={() => handleChangePage(false)}>
            <Text style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>
              {`<- Voltar`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '50%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#3B9A00' }}
            onPress={() => handleChangePage(true)}>
            <Text style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>
              {`Proximo ->`}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ position: 'absolute', bottom: 4, left: 295, backgroundColor: '#3B9A00', width: 25, height: 25, textAlign: 'center', borderRadius: 25, color: 'white' }}>
          {page}
        </Text>
        {page - 1 !== 0 && (
          <Text style={{ position: 'absolute', bottom: 4, left: 5, backgroundColor: '#3B9A00', width: 25, height: 25, textAlign: 'center', borderRadius: 25, color: 'white' }}>
            {page - 1}
          </Text>
        )}
      </View >

      <ReactNativeModal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Deseja realmente excluir a divida? {activeDebt}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', gap: 16 }}>
            <TouchableOpacity onPress={handleDeleteDebt} style={{ width: 64, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#3B9A00' }}>
              <Text style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>
                Sim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleModal(null)} style={{ width: 72, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#FF0000' }}>
              <Text style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>
                Não
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView >
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
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    gap: 10,
    width: '90%',
    height: '85%',
    borderRadius: 20,
    padding: 20,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 250,
    padding: 22,
    gap: 10,
    alignSelf: 'center',
  },
  title: {
    color: '#102900',
    fontSize: 28,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 18,
    fontWeight: 400,
  }
});
