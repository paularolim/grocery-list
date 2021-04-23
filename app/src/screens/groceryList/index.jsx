import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListItem, Text, Overlay, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//import styles from '../stylesLists';

const GroceryList = ({ navigation, route }) => {
  // id da lista selecionada
  const id = route.params.id;

  // estados com os dados iniciais do item (produto)
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.0);

  // estados com a visibilidade dos modais
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  // estado com o id do produto selecionado "onLongPress"
  const [activedProduct, setActivedProduct] = useState(0);

  // estado com a lista de listas
  const [lists, setLists] = useState([
    {
      id: 123,
      items: [
        {
          id: 111,
          name: 'Manteiga 500g',
          quantity: 1,
          price: 5.89,
        },
        {
          id: 222,
          name: 'Farinha 1Kg',
          quantity: 3,
          price: 4.76,
        },
      ],
    },
    {
      id: 456,
      items: [
        {
          id: 333,
          name: 'Escova de dentes 1un',
          quantity: 1,
          price: 3.98,
        },
        {
          id: 444,
          name: 'Creme dental menta',
          quantity: 4,
          price: 2.78,
        },
        {
          id: 555,
          name: 'Enxaguante bucal',
          quantity: 1,
          price: 9.68,
        },
      ],
    },
  ]);

  // função para limpar o item no estado
  const cleanState = () => {
    setProduct('');
    setQuantity(1);
    setPrice(0.0);
  };

  // função que retorna a lista selecionada
  const findList = () => {
    let fetchedList;

    lists.forEach((list) => {
      if (list.id == id) fetchedList = list;
    });

    return fetchedList ? fetchedList : null;
  };

  // função para trocar a visibilidade do modal de criação
  const toggleOverlayCreate = () => {
    setVisibleCreate(!visibleCreate);
  };

  // função para mostrar o modal de update
  // e colocar os dados nos campos
  const toggleOverlayUpdate = () => {
    setVisibleMenu(!visibleMenu);
    setVisibleUpdate(!visibleUpdate);

    let fetchedList;
    lists.forEach((list) => {
      if (list.id == id) fetchedList = list;
    });
    fetchedList.items.forEach((item) => {
      if (item.id == activedProduct) {
        setProduct(item.name);
        setQuantity(item.quantity);
        setPrice(item.price);
      }
    });
  };

  // função para mostrar o menu (editar/excluir)
  const toggleOverlayMenu = (id) => {
    setActivedProduct(id);
    setVisibleMenu(!visibleMenu);
  };

  // função para criar um item em uma lista
  const handlerCreate = () => {
    const newProduct = {
      id: Math.floor(Math.random() * 9999),
      name: product,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    let listExists = false;
    lists.forEach((list) => {
      if (list.id == id) {
        listExists = true;
        list.items.push(newProduct);
      }
    });

    // se a lista não estiver no array, é criada uma nova lista
    if (!listExists) {
      lists.push({
        id: id,
        items: [newProduct],
      });
    }

    setLists(lists);
    cleanState();
  };

  // função para atualizar o item de uma lista
  const handlerUpdate = () => {
    setVisibleUpdate(!visibleUpdate);

    let fetchedList;
    lists.forEach((list) => {
      if (list.id == id) fetchedList = list;
    });
    fetchedList.items.forEach((item) => {
      if (item.id == activedProduct) {
        item.name = product;
        item.quantity = quantity;
        item.price = price;
      }
    });

    setLists(lists);
  };

  // função para deletar o item de uma lista
  const handlerDelete = () => {
    setVisibleMenu(!visibleMenu);

    lists.forEach((list) => {
      if (list.id == id) {
        list.items = list.items.filter((item) => item.id != activedProduct);
      }
    });

    setLists(lists);
  };

  return (
    <View>
      {findList() ? (
        findList().items.map((item, index) => (
          <ListItem key={index} onLongPress={() => toggleOverlayMenu(item.id)} bottomDivider>
            <ListItem.Content>
              <Text>{item.quantity}</Text>
              <Text>{item.name}</Text>
            </ListItem.Content>
            <Text>R$ {item.price}</Text>
          </ListItem>
        ))
      ) : (
        <Text>Nenhum item na lista</Text>
      )}

      <Overlay isVisible={visibleCreate} onBackdropPress={toggleOverlayCreate}>
        <Input
          label="Produto"
          placeholder="Produto"
          value={product}
          onChangeText={(text) => setProduct(text)}
        />
        <Input
          label="Quantidade"
          placeholder="Quantidade"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
        <Input
          label="Preço"
          placeholder="Preço"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Button title="Criar" onPress={handlerCreate} />
      </Overlay>

      <Overlay isVisible={visibleUpdate} onBackdropPress={toggleOverlayUpdate}>
        <Input
          label="Produto"
          placeholder="Produto"
          value={product}
          onChangeText={(text) => setProduct(text)}
        />
        <Input
          label="Quantidade"
          placeholder="Quantidade"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
        <Input
          label="Preço"
          placeholder="Preço"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Button title="Atualizar" onPress={handlerUpdate} />
      </Overlay>

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

      <TouchableOpacity onPress={toggleOverlayCreate}>
        <Icon name="plus" size={20} color="#f2f2f2" />
      </TouchableOpacity>
    </View>
  );
};

export default GroceryList;
