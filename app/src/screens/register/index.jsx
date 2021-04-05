import React from 'react';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Input
        label="Nome"
        placeholder="Nome"
        leftIcon={<Icon name="user" size={18} color="black" />}
        containerStyle={styles.input}
      />
      <Input
        label="Email"
        placeholder="Email"
        leftIcon={<Icon name="envelope" size={18} color="black" />}
        containerStyle={styles.input}
      />
      <Input
        label="Senha"
        placeholder="*********"
        leftIcon={<Icon name="key" size={18} color="black" />}
        containerStyle={styles.input}
      />
      <Input
        label="Confirme a senha"
        placeholder="*********"
        leftIcon={<Icon name="key" size={18} color="black" />}
        containerStyle={styles.input}
      />
      <Button title="Registrar" containerStyle={styles.button} />
    </View>
  );
};

export default Register;
