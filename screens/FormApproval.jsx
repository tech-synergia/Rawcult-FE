import {View, Text, SafeAreaView, ImageBackground, Alert} from 'react-native';
import React from 'react';
import {Button, Card} from 'react-native-paper';

const WaitingApprovalScreen = ({navigation}) => {
  const handleOk = () => {
    // navigation.navigate("Signin");
    navigation.navigate('Signin');

    // Implement navigation to the Create Account screen here
    // Example: navigation.navigate('CreateAccount');
  };
  const handleEdit = () => {
    // navigation.navigate("Signin");
    // navigation.navigate('');
    Alert.alert("Can't edit for now!");

    // Implement navigation to the Create Account screen here
    // Example: navigation.navigate('CreateAccount');
  };
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={{width: '100%', height: '100%', backgroundColor: '006DFF'}}>
        <Card style={{margin: 20, marginTop: 180}}>
          <Card.Cover source={require('../assets/saved.png')} />
          <Card.Content>
            <Text
              style={{fontSize: 20, textAlign: 'center', fontWeight: '600'}}>
              Form Submitted
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                fontWeight: '500',
                color: 'grey',
              }}>
              Wait for Admin approval
            </Text>
          </Card.Content>
          <Card.Actions style={{alignSelf: 'center'}}>
            <Button onPress={handleOk}>Ok</Button>
            <Button onPress={handleEdit}>Edit</Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default WaitingApprovalScreen;
