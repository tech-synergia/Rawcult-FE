import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {DataTable} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddRemove from './AddRemove';

const Table = ({
  tableData,
  setTableData,
  setTotalQuantity,
  sizes,
  colorChart,
}) => {
  const [quantity, setQuantity] = useState(0); // Default quantity
  // const [availablelQuantity, setAvailablelQuantityy] = useState(totalQuantity);

  const increaseQuantity = val => {
    const matches = sizes?.findIndex(
      item => item.size === val.size && item.quantity === val.quantity,
    );
    if (matches !== -1) {
      return Alert.alert(
        'Quantity Limit',
        'you have reached to maximum quantity',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
    const newQuantity = {...val, quantity: val.quantity + 1};
    const index = tableData.findIndex(
      item => item.size === val.size && item.color === colorChart,
    );
    setTotalQuantity(prev => prev + 1);
    setTableData(prev => {
      const updatedData = [...prev];
      updatedData[index] = {...updatedData[index], ...newQuantity};
      return updatedData;
    });
  };

  const decreaseQuantity = val => {
    if (val.quantity > 1) {
      const newQuantity = {...val, quantity: val.quantity - 1};
      const index = tableData.findIndex(item => item.size === val.size);
      setTotalQuantity(prev => prev - 1);
      setTableData(prev => {
        const updatedData = [...prev];
        updatedData[index] = {...updatedData[index], ...newQuantity};
        return updatedData;
      });
      // setQuantity(quantity - 1);
    } else {
      Alert.alert(
        'Quantity Limit',
        'Minimum quantity is 1',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('?????????', val, tableData);

              setTableData(prev => {
                const updatedData = prev.filter(item => item.size !== val.size);
                console.log('nvjhuhuhrvu', updatedData, val, tableData);
                return updatedData;
              });
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Size</DataTable.Title>
        <DataTable.Title>Colour</DataTable.Title>
        <DataTable.Title>Quantity</DataTable.Title>
        <DataTable.Title>Total Price</DataTable.Title>
      </DataTable.Header>

      {tableData.map(val => (
        <>
          <DataTable.Row>
            <DataTable.Cell>{val.size}</DataTable.Cell>
            <DataTable.Cell>{val.color}</DataTable.Cell>
            <DataTable.Cell>
              <TouchableOpacity
                onPress={() => {
                  decreaseQuantity(val);
                }}>
                <Ionicons
                  style={{marginTop: 10}}
                  name="remove-outline"
                  size={24}
                  color={'#c90e30'}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '800',
                  fontSize: 15,
                }}>
                {val.quantity}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  increaseQuantity(val);
                }}>
                <Ionicons
                  style={{marginTop: 10}}
                  name="add-outline"
                  size={24}
                  color="#068c06"
                />
              </TouchableOpacity>
            </DataTable.Cell>
            <DataTable.Cell>{val.price * val?.quantity}</DataTable.Cell>
          </DataTable.Row>
        </>
      ))}
    </DataTable>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 120,
    marginLeft: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
