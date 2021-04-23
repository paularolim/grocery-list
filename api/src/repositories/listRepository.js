const models = require('../models');

const getAll = (userId) => {
  return models.List.findAll({ where: { userId } })
    .then((lists) => {
      if (lists.length > 0) return lists;
      else return undefined;
    })
    .catch((err) => err);
};

const getOne = (id) => {
  return models.List.findByPk(id)
    .then((list) => (list ? list : undefined))
    .catch((err) => err);
};

const save = (data) => {
  return models.List.create(data)
    .then(() => true)
    .catch((err) => err);
};

const remove = (id) => {
  return models.List.destroy({ where: { id } })
    .then(() => true)
    .catch((err) => err);
};

module.exports = { getAll, getOne, save, remove };
