import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import authContext from '../../contexts/authContext';

const Login = ({ navigation }) => {
  const { signIn } = useContext(authContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye-outline');

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordIcon(passwordIcon == 'eye-outline' ? 'eye-off-outline' : 'eye-outline');
  };

  const handlerLogin = async () => {
    await signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        label="Email"
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

      <TouchableOpacity style={styles.button} onPress={handlerLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Registre-se
      </Text>
    </View>
  );
};

export default Login;

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
