import React from 'react';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
      <Button title="Entrar" containerStyle={styles.button} />
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Registre-se
      </Text>
    </View>
  );
};

export default Login;
