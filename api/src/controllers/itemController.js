const { v4: uuid } = require('uuid');

const itemRepository = require('../repositories/itemRepository');

const getAll = async (req, res) => {
  const { listId } = req.params;

  const items = await itemRepository.getAll(listId);

  if (items) res.status(200).json(items);
  else if (items == undefined)
    res.status(404).json({ message: `This list haven't items already` });
  else res.status(500).json({ message: 'Something went wrong' });
};

const create = async (req, res) => {
  const { listId } = req.params;
  const { title, quantity, unit, price } = req.body;
  const id = uuid();

  if (title == '' || quantity < 0 || unit == '' || price < 0) {
    res.status(400).json({ message: 'Please send all informations' });
    return;
  }

  const response = await itemRepository.save({ id, title, quantity, unit, price, listId });

  if (response) res.status(201).json({ id, title, quantity, unit, price, listId });
  else res.status(500).json({ message: 'Something went wrong' });
};

const mark = async (req, res) => {
  const { itemId } = req.params;

  const item = await itemRepository.getOne(itemId);

  if (typeof item == 'object') {
    await itemRepository.edit(item.id, { bought: !item.bought });
    res.status(200).json({ message: `Item with id ${item.id} was checked/unchecked` });
    return;
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const update = async (req, res) => {
  const { itemId } = req.params;
  const { title, quantity, price } = req.body;

  if (title == '' || quantity < 0 || price < 0) {
    res.status(400).json({ message: 'Please send all informations' });
    return;
  }

  const item = await itemRepository.getOne(itemId);
  console.log(item);

  if (typeof item == 'object') {
    await itemRepository.edit(item.id, { title, quantity, price });
    res.status(200).json({ message: `Item with id ${item.id} was updated` });
    return;
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const destroy = async (req, res) => {
  const { itemId } = req.params;

  const item = await itemRepository.getOne(itemId);

  if (typeof item == 'object') {
    await itemRepository.remove(item.id);
    res.status(200).json({ message: `Item with id ${item.id} was deleted` });
    return;
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { getAll, create, update, mark, destroy };
