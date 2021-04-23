import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye-outline');

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordIcon(passwordIcon == 'eye-outline' ? 'eye-off-outline' : 'eye-outline');
  };

  const handlerRegister = async () => {
    try {
      await api.post('/users', { name, email, password });
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        placeholder="Nome"
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Senha</Text>
      <View style={[styles.input, styles.inputWithIcon]}>
        <TextInput
          placeholder="*********"
          secureTextEntry={passwordVisibility}
          onChangeText={(text) => setPassword(text)}
          style={{ flex: 1 }}
        />
        <Ionicons
          name={passwordIcon}
          size={20}
          color={'rgb(248, 110, 69)'}
          onPress={changePasswordVisibility}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlerRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 30,
  },
  label: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgb(235, 235, 235)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 30,
    fontSize: 16,
  },
  inputWithIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgb(248, 110, 69)',
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 40,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
  },
  link: {
    color: 'rgb(248, 110, 69)',
    fontSize: 16,
    textAlign: 'center',
  },
});
