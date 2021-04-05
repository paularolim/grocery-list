import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListItem, Text, Overlay, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesLists';

const ListOfLists = ({ navigation }) => {
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
    },
    {
      id: 456,
      title: 'Lista supimpa',
      date: '12/03/2021',
      price: 793.42,
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
      {lists.map((list, index) => (
        <ListItem
          key={index}
          onPress={() => navigation.navigate('GroceryList', { id: list.id })}
          onLongPress={() => toggleOverlayMenu(list.id)}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{list.title}</ListItem.Title>
            <ListItem.Subtitle>{list.date}</ListItem.Subtitle>
          </ListItem.Content>
          <Text>R$ {list.price}</Text>
          <ListItem.Chevron />
        </ListItem>
      ))}

      <Overlay isVisible={visibleMenu} onBackdropPress={toggleOverlayMenu}>
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

      <Overlay isVisible={visibleCreate} onBackdropPress={toggleOverlayCreate}>
        <Input label="Nome" placeholder="Nome" onChangeText={(text) => setNameList(text)} />
        <Button title="Criar" onPress={handlerCreate} />
      </Overlay>

      <Overlay isVisible={visibleUpdate} onBackdropPress={toggleOverlayUpdate}>
        <Input
          label="Nome"
          placeholder="Nome"
          value={nameList}
          onChangeText={(text) => setNameList(text)}
        />
        <Button title="Atualizar" onPress={handlerUpdate} />
      </Overlay>

      <TouchableOpacity style={styles.buttonFloat} onPress={toggleOverlayCreate}>
        <Icon name="plus" size={20} color="#f2f2f2" />
      </TouchableOpacity>
    </View>
  );
};

export default ListOfLists;
