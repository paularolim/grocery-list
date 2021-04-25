import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ListItem, Text, Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../../contexts/authContext';
import api from '../../services/api';

import styles from '../_styles/lists';

const ListOfLists = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);

  const [title, setTitle] = useState('');

  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [notification, setNotification] = useState('');

  const [activedList, setActivedList] = useState({});

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLists();
    });
    return unsubscribe;
  }, [navigation]);

  const getLists = async () => {
    console.log(`getting lists from database`);
    await api
      .get(`/users/${user.id}/lists`)
      .then((response) => setLists(response.data))
      .catch((err) => console.log(err));
  };

  const toggleOverlayCreate = () => {
    setVisibleCreate(!visibleCreate);
  };

  const toggleOverlayUpdate = () => {
    setTitle(activedList.title);
    setVisibleMenu(!visibleMenu);
    setVisibleUpdate(!visibleUpdate);
  };

  const toggleOverlayMenu = (id) => {
    setActivedList(id);
    setVisibleMenu(!visibleMenu);
  };

  const handlerCreate = async () => {
    try {
      console.log(`creating list`);
      await api.post(`/users/${user.id}/lists`, { title });
      setTitle('');
      getLists();
      toggleOverlayCreate();
      sendNotification('Lista criada');
    } catch (err) {
      sendNotification('Revise as informações');
    }
  };

  const handlerUpdate = async () => {
    try {
      console.log(`Updating list`);
      await api.put(`/users/${user.id}/lists/${activedList.id}`, { title });
      setTitle('');
      getLists();
      sendNotification('Lista atualizada');
    } catch (err) {
      sendNotification('Revise as informações');
    }

    setVisibleUpdate(!visibleUpdate);
  };

  const handlerDelete = async () => {
    setVisibleMenu(!visibleMenu);

    try {
      console.log(`Deleting list`);
      await api.delete(`/users/${user.id}/lists/${activedList.id}`);
      getLists();
      sendNotification('A lista foi deletada');
    } catch (err) {
      sendNotification('Não foi possivel deletar a lista');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const sendNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {notification != '' ? (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      ) : (
        <></>
      )}

      <ScrollView style={styles.scroll}>
        {lists.length > 0 ? (
          lists.map((list, index) => (
            <ListItem
              key={index}
              onPress={() => navigation.navigate('GroceryList', { listId: list.id })}
              onLongPress={() => toggleOverlayMenu(list)}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{list.title}</ListItem.Title>
                <ListItem.Subtitle>{list.itemsQuantity} items</ListItem.Subtitle>
                <ListItem.Subtitle>{formatDate(list.createdAt)}</ListItem.Subtitle>
              </ListItem.Content>
              <Text>R$ {list.total.toFixed(2)}</Text>
              <ListItem.Chevron />
            </ListItem>
          ))
        ) : (
          <View>
            <Text>Nenhuma lista encontrada</Text>
          </View>
        )}
      </ScrollView>

      <Overlay
        isVisible={visibleCreate}
        onBackdropPress={toggleOverlayCreate}
        overlayStyle={styles.overlay}
      >
        <Input label="Nome" placeholder="Nome" onChangeText={(text) => setTitle(text)} />

        <TouchableOpacity style={styles.button} onPress={handlerCreate}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </Overlay>

      <Overlay
        isVisible={visibleUpdate}
        onBackdropPress={toggleOverlayUpdate}
        overlayStyle={styles.overlay}
      >
        <Input
          label="Nome"
          placeholder="Nome"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handlerUpdate}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </Overlay>

      <Overlay
        isVisible={visibleMenu}
        onBackdropPress={toggleOverlayMenu}
        overlayStyle={styles.overlay}
      >
        <ListItem onPress={toggleOverlayUpdate} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              <Icon name="edit" size={20} color="black" />
              Editar
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={handlerDelete}>
          <ListItem.Content>
            <ListItem.Title>
              <Icon name="trash" size={20} color="black" />
              Excluir
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Overlay>

      <View style={styles.footer}>
        <Text style={styles.link} onPress={signOut}>
          Perfil
        </Text>
        <TouchableOpacity style={styles.floatButton} onPress={toggleOverlayCreate}>
          <Icon name="plus" size={20} color="rgb(248, 110, 69)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListOfLists;
