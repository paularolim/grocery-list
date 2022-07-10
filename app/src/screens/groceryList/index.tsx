import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import {
  ListItem,
  Text,
  Overlay,
  Input,
  CheckBox,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';

import styles from '../styles/lists';

export function GroceryList({ route }: StackScreenProps<ParamListBase, any>) {
  const { listId } = route.params;

  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit] = useState('un');
  const [price, setPrice] = useState(0.0);

  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [notification, setNotification] = useState('');

  const [activedItem, setActivedItem] = useState<{
    id: string;
    title: string;
    quantity: number;
    price: number;
  } | null>(null);

  const [items, setItems] = useState({ items: [], itemsQuantity: 0, total: 0 });

  const sendNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  const getItems = async () => {
    // eslint-disable-next-line no-console
    console.log('getting items from database');
    try {
      const response = await api.get(`/lists/${listId}/items`);
      setItems(response.data);
    } catch (err) {
      setItems({ items: [], itemsQuantity: 0, total: 0 });
    }
  };

  const cleanState = () => {
    setTitle('');
    setQuantity(1);
    setPrice(0.0);
  };

  const toggleOverlayCreate = () => {
    setVisibleCreate(!visibleCreate);
  };

  const toggleOverlayUpdate = () => {
    setTitle(activedItem.title);
    setQuantity(activedItem.quantity);
    setPrice(activedItem.price);

    setVisibleMenu(!visibleMenu);
    setVisibleUpdate(!visibleUpdate);
  };

  const toggleOverlayMenu = (item) => {
    setActivedItem(item);
    setVisibleMenu(!visibleMenu);
  };

  const handlerCreate = async () => {
    try {
      // eslint-disable-next-line no-console
      console.log('creating item');
      await api.post(`/lists/${listId}/items`, {
        title,
        quantity,
        unit,
        price,
      });

      toggleOverlayCreate();
      cleanState();
      getItems();

      sendNotification('Item criado');
    } catch (err) {
      sendNotification('Revise as informações');
    }
  };

  const handlerUpdate = async () => {
    try {
      // eslint-disable-next-line no-console
      console.log('Updating item');
      await api.put(`/lists/${listId}/items/${activedItem.id}`, {
        title,
        quantity,
        price,
      });
      cleanState();
      getItems();
      setVisibleUpdate(!visibleUpdate);
      sendNotification('Item atualizado');
    } catch (err) {
      sendNotification('Revise as informações');
    }
  };

  const handlerCheck = async (itemId) => {
    try {
      // eslint-disable-next-line no-console
      console.log('Check/Uncheck item');
      await api.put(`/lists/${listId}/items/${itemId}/check`);
      getItems();
      sendNotification('O item foi marcado/desmarcado');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      sendNotification('Não foi possivel marcar/desmarcar o item');
    }
  };

  const handlerDelete = async () => {
    setVisibleMenu(!visibleMenu);

    try {
      // eslint-disable-next-line no-console
      console.log('Deleting item');
      await api.delete(`/lists/${listId}/items/${activedItem.id}`);
      getItems();
      sendNotification('O item foi deletado');
    } catch (err) {
      sendNotification('Não foi possivel deletar o item');
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <View style={styles.container}>
      {notification !== '' ? (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      ) : null}

      <ScrollView style={styles.scroll}>
        {items.items.length > 0 ? (
          items.items.map((item, index) => (
            <ListItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onLongPress={() => toggleOverlayMenu(item)}
              bottomDivider
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            >
              <CheckBox
                checked={item.bought}
                checkedColor="rgb(248, 110, 69)"
                onPress={() => handlerCheck(item.id)}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle>
                  R$
                  {item.price.toFixed(2)}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </ListItem>
          ))
        ) : (
          <Text>Nenhum item na lista</Text>
        )}
      </ScrollView>

      <Overlay
        isVisible={visibleCreate}
        onBackdropPress={toggleOverlayCreate}
        overlayStyle={styles.overlay}
      >
        <Input
          label="Nome"
          placeholder="Nome"
          value={title}
          onChangeText={(text) => setTitle(text)}
          autoCompleteType={undefined}
        />
        <Input
          label="Quantidade"
          placeholder="Quantidade"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(parseInt(text, 10) || 1)}
          autoCompleteType={undefined}
        />
        <Input
          label="Preço"
          placeholder="Preço"
          value={price.toString()}
          onChangeText={(text) => setPrice(parseFloat(text) || 1)}
          autoCompleteType={undefined}
        />

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
          autoCompleteType={undefined}
        />
        <Input
          label="Quantidade"
          placeholder="Quantidade"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(parseInt(text, 10) || 1)}
          autoCompleteType={undefined}
        />
        <Input
          label="Preço"
          placeholder="Preço"
          value={price.toString()}
          onChangeText={(text) => setPrice(parseFloat(text) || 1)}
          autoCompleteType={undefined}
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
        <ListItem
          onPress={toggleOverlayUpdate}
          bottomDivider
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Icon name="edit" size={20} color="black" />
              Editar
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={handlerDelete}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Icon name="trash" size={20} color="black" />
              Excluir
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Overlay>

      <View style={styles.footer}>
        <Text style={styles.link}>
          {`R$ ${items.total.toFixed(2)} / ${items.itemsQuantity} itens`}
        </Text>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={toggleOverlayCreate}
        >
          <Icon name="plus" size={20} color="rgb(248, 110, 69)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
