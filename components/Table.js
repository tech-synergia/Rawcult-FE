import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {DataTable} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <DataTable.Title>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#000'}}>
            Size
          </Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#000'}}>
            Color
          </Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#000'}}>
            Quantity
          </Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#000'}}>
            Total Price
          </Text>
        </DataTable.Title>
      </DataTable.Header>

      {tableData.map(val => (
        <>
          <DataTable.Row style={{display: 'flex', alignItems: 'center'}}>
            <DataTable.Cell>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: 'grey',
                }}>
                {val.size}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 17, fontWeight: '600', color: 'grey'}}>
                {val.color}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    decreaseQuantity(val);
                  }}>
                  <Ionicons
                    name="remove-circle-sharp"
                    size={20}
                    color={'#c90e30'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '800',
                    fontSize: 18,
                  }}>
                  {val.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    increaseQuantity(val);
                  }}>
                  <Ionicons name="add-circle-sharp" size={20} color="#068c06" />
                </TouchableOpacity>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{fontSize: 17, fontWeight: '600', color: 'grey'}}>
                <FontAwesome name="rupee" size={18} />
                {val.price * val?.quantity}
              </Text>
            </DataTable.Cell>
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
