import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';

import { AuthContext } from '../../contexts/authContext';

import styles from '../styles/profile';

function Profile({ navigation }: StackScreenProps<ParamListBase, any>) {
  const { user, signOut } = useContext(AuthContext);

  const getInitial = () => {
    const { name } = user;
    return name.indexOf(' ') > 0
      ? name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)
      : name.charAt(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          title={getInitial()}
          size={150}
          containerStyle={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.menu}>
        <ListItem
          bottomDivider
          onPress={() => navigation.navigate('About')}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        >
          <ListItem.Content>
            <ListItem.Title>Sobre o aplicativo</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={signOut}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        >
          <ListItem.Content>
            <ListItem.Title>Sair</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </View>
  );
}

export default Profile;
