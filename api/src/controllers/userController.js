const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const userRepository = require('../repositories/userRepository');

const getAll = async (req, res) => {
  const users = await userRepository.findAll();

  if (users) res.status(200).json(users);
  else if (users == undefined) res.status(404).json({ message: `Couldn't find any users` });
  else res.status(500).json({ message: 'Something went wrong' });
};

const create = async (req, res) => {
  const user = {
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    createdAt: Date.now(),
  };

  const result = await userRepository.save(user);
  if (result) res.status(201).json({ id: user.id, name: user.name, email: user.email });
  else res.status(500).json({ message: 'Something went wrong' });
};

module.exports = { getAll, create };
