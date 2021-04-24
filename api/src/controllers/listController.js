const { v4: uuid } = require('uuid');

const listRepository = require('../repositories/listRepository');

const getAll = async (req, res) => {
  const { userId } = req.params;

  const lists = await listRepository.getAll(userId);

  if (lists) res.status(200).json(lists);
  else if (lists == undefined)
    res.status(404).json({ message: `This user haven't lists already` });
  else res.status(500).json({ message: 'Something went wrong' });
};

const create = async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;
  const id = uuid();
  const createdAt = Date.now();
  const updatedAt = Date.now();

  if (title == '') {
    res.status(400).json({ message: 'Please send a title' });
    return;
  }

  const response = await listRepository.save({ id, title, userId, createdAt, updatedAt });

  if (response) res.status(201).json({ id, title, userId });
  else res.status(500).json({ message: 'Something went wrong' });
};

const update = async (req, res) => {
  const { listId } = req.params;
  const { title } = req.body;
  const updatedAt = Date.now();

  if (title == '') {
    res.status(400).json({ message: 'Please send a title' });
    return;
  }

  const list = await listRepository.getOne(listId);

  if (typeof list == 'object') {
    await listRepository.edit(list.id, { title, updatedAt });
    res.status(200).json({ message: `List with id ${list.id} was updated` });
    return;
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const destroy = async (req, res) => {
  const { listId } = req.params;

  const list = await listRepository.getOne(listId);

  if (typeof list == 'object') {
    await listRepository.remove(list.id);
    res.status(200).json({ message: `List with id ${list.id} was deleted` });
    return;
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { getAll, create, update, destroy };
