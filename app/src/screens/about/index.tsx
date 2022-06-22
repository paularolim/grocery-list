import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import styles from '../styles/profile';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.about}>
        <Text style={styles.description}>
          Aplicativo criado para gerenciamento de lista de compras.
        </Text>
        <Text style={styles.version}>Version 1.0</Text>
      </View>
    </View>
  );
};

export default Profile;
