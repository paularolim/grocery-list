const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const userRepository = require('../repositories/userRepository');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == undefined || password == undefined)
    res.status(400).json({ message: 'Please send email and password' });

  const user = await userRepository.findByEmail(email);

  if (typeof user != 'object') res.status(400).json({ message: 'Something went wrong' });
  if (!bcrypt.compareSync(password, user.password))
    res.status(400).json({ message: 'Email or password incorrect' });

  jwt.sign(
    { name: user.name, email: user.email },
    's3cr3t',
    { expiresIn: '1d' },
    (err, token) => {
      if (err) res.status(400).json({ message: 'Internal error' });
      else
        res
          .status(200)
          .json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
  );
};

const getAll = async (req, res) => {
  const users = await userRepository.findAll();

  if (users) res.status(200).json(users);
  else if (users == undefined) res.status(404).json({ message: `Couldn't find any users` });
  else res.status(500).json({ message: 'Something went wrong' });
};

const create = async (req, res) => {
  const { name, email } = req.body;

  const fetchedUser = await userRepository.findByEmail(email);
  if (typeof fetchedUser == 'object') res.status(400).json({ message: 'User already exists' });

  const user = {
    id: uuid(),
    name,
    email,
    password: bcrypt.hashSync(req.body.password, salt),
    createdAt: Date.now(),
  };

  const result = await userRepository.save(user);
  if (result) res.status(201).json({ id: user.id, name: user.name, email: user.email });
  else res.status(500).json({ message: 'Something went wrong' });
};

module.exports = { login, getAll, create };
