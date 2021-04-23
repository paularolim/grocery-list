import React, { useState, useContext } from 'react';
import { ScrollView, SafeAreaView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Text, Overlay, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../../contexts/authContext';

const ListOfLists = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  // estado com o nome inicial da lista
  const [nameList, setNameList] = useState('');

  // estados co a visibilidade dos modais
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  // estado com id da lista selecionada "onLongPress"
  const [activedList, setActivedList] = useState(0);

  // estado com a lista de listas
  const [lists, setLists] = useState([
    {
      id: 123,
      title: 'Lista top',
      date: '05/04/2021',
      price: 353.44,
      quantity: 2,
    },
    {
      id: 456,
      title: 'Lista supimpa',
      date: '12/03/2021',
      price: 793.42,
      quantity: 2,
    },
  ]);

  // função para trocar a visibilidade do modal de criação
  const toggleOverlayCreate = () => {
    setVisibleCreate(!visibleCreate);
  };

  // função para mostrar o modal de update
  // e colocar os dados nos campos
  const toggleOverlayUpdate = () => {
    setVisibleMenu(!visibleMenu);
    setVisibleUpdate(!visibleUpdate);

    lists.forEach((list) => {
      if (list.id == activedList) setNameList(list.title);
    });
  };

  // função para mostrar o menu (editar/excluir)
  const toggleOverlayMenu = (id) => {
    setActivedList(id);
    setVisibleMenu(!visibleMenu);
  };

  // função para criar uma lista
  const handlerCreate = () => {
    const newList = {
      id: Math.floor(Math.random() * 9999),
      title: nameList,
      date: Date.now(),
      price: 0,
      quantity: 0,
    };

    setLists([...lists, newList]);
    toggleOverlayCreate(!visibleCreate);
  };

  // função para atualizar o nome de uma lista
  const handlerUpdate = () => {
    setVisibleUpdate(!visibleUpdate);

    lists.forEach((list) => {
      if (list.id === activedList) {
        list.title = nameList;
      }
    });

    setLists(lists);
  };

  // função para deletar uma lista
  const handlerDelete = () => {
    setVisibleMenu(!visibleMenu);

    const updatedLists = lists.filter((list) => list.id != activedList);

    setLists(updatedLists);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {lists.map((list, index) => (
          <ListItem
            key={index}
            onPress={() => navigation.navigate('GroceryList', { id: list.id })}
            onLongPress={() => toggleOverlayMenu(list.id)}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>{list.title}</ListItem.Title>
              <ListItem.Subtitle>{list.quantity} items</ListItem.Subtitle>
              <ListItem.Subtitle>{list.date}</ListItem.Subtitle>
            </ListItem.Content>
            <Text>R$ {list.price}</Text>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ScrollView>

      <Overlay isVisible={visibleCreate} onBackdropPress={toggleOverlayCreate}>
        <Input label="Nome" placeholder="Nome" onChangeText={(text) => setNameList(text)} />

        <TouchableOpacity style={styles.button} onPress={handlerCreate}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </Overlay>

      <View style={styles.footer}>
        <Text style={styles.link}>Perfil</Text>
        <TouchableOpacity style={styles.floatButton} onPress={toggleOverlayCreate}>
          <Icon name="plus" size={20} color="rgb(248, 110, 69)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListOfLists;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scroll: {
    height: 460,
    backgroundColor: 'rgba(0,0,0)',
    marginBottom: 100,
  },
  listTitle: {
    color: 'rgb(248, 110, 69)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'rgb(248, 110, 69)',
    width: 'fill-available',
    padding: 15,
    margin: 20,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  link: {
    color: 'rgb(245, 245, 245)',
    fontSize: 20,
  },
  floatButton: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: 'fit-content',
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
});
