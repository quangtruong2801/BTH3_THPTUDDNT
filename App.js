import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {MyContextControllerProvider} from './src/store';
import Router from './src/screens/Router';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import COLORS from './src/assets/theme/COLOR';

const Stack = createNativeStackNavigator();
const initial = () => {
  const USERS = firestore().collection('USERS');
  const admin = {
    name: 'admin',
    phone: '01234567890',
    address: 'BD',
    email: 'it.minhquangpham@gmail.com',
    password: '123456',
    role: 'admin',
  };
  USERS.doc(admin.email).onSnapshot(u => {
    if (!u.exists) {
      auth()
        .createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() =>
          USERS.doc(admin.email)
            .set(admin)
            .then(() => console.log('Add new user admin! ')),
        );
    }
  });
};
export default App = () => {
  useEffect(() => {
    initial();
  }, []);
  return (
    <PaperProvider>
      {/* <StatusBar backgroundColor={COLORS.pink} /> */}
      <MyContextControllerProvider>
        <NavigationContainer>
          <Router></Router>
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
});
