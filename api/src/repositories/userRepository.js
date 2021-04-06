const models = require('../models/index');

const findAll = () => {
  return models.User.findAll()
    .then((users) => {
      if (users) return users;
      else return undefined;
    })
    .catch((err) => err);
};

const save = (user) => {
  return models.User.create(user)
    .then(() => true)
    .catch((err) => err);
};

module.exports = { findAll, save };
