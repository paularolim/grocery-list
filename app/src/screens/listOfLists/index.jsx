import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ListItem, Text, Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../../contexts/authContext';
import api from '../../services/api';

const ListOfLists = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);

  const [title, setTitle] = useState('');

  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [notification, setNotification] = useState('');

  const [activedList, setActivedList] = useState(0);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

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
      sendNotification('Lista criada');
    } catch (err) {
      sendNotification('Revise as informações');
    }

    toggleOverlayCreate();
  };

  const handlerUpdate = () => {
    setVisibleUpdate(!visibleUpdate);
  };

  const handlerDelete = async () => {
    setVisibleMenu(!visibleMenu);

    try {
      console.log(`Deleting list`);
      const url = `/users/${user.id}/lists/${activedList}`;
      console.log(url);
      await api.delete(url);
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
              onPress={() => navigation.navigate('GroceryList', { id: list.id })}
              onLongPress={() => toggleOverlayMenu(list.id)}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{list.title}</ListItem.Title>
                <ListItem.Subtitle>{list.quantity} items</ListItem.Subtitle>
                <ListItem.Subtitle>{formatDate(list.createdAt)}</ListItem.Subtitle>
              </ListItem.Content>
              <Text>R$ {list.price}</Text>
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height - 60,
    width: width,
  },
  notification: {
    zIndex: 2,
    backgroundColor: 'rgb(250, 142, 112)',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
  },
  notificationText: {
    color: 'rgb(255, 255, 255)',
  },
  scroll: {
    height: 460,
    marginBottom: 100,
  },
  listTitle: {
    color: 'rgb(248, 110, 69)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'rgb(248, 110, 69)',
    width: width - 40,
    padding: 15,
    margin: 20,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  link: {
    color: 'rgb(245, 245, 245)',
    fontSize: 20,
  },
  floatButton: {
    backgroundColor: 'rgb(245, 245, 245)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
  button: {
    backgroundColor: 'rgb(248, 110, 69)',
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
  },
  overlay: {
    width: width / 2,
  },
  labelMenu: {
    marginLeft: 20,
  },
});
