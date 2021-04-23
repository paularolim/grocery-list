const models = require('../models/index');

const findAll = () => {
  return models.User.findAll()
    .then((users) => {
      if (users) return users;
      else return undefined;
    })
    .catch((err) => err);
};

const findById = (id) => {
  return models.User.findByPk(id)
    .then((user) => {
      if (user) return user;
      else return undefined;
    })
    .catch((err) => err);
};

const findByEmail = (email) => {
  return models.User.findAll({ where: { email } })
    .then((user) => {
      if (user) return user[0];
      else return undefined;
    })
    .catch((err) => err);
};

const save = (user) => {
  return models.User.create(user)
    .then(() => true)
    .catch((err) => err);
};

module.exports = { findAll, findById, findByEmail, save };
