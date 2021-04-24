const models = require('../models');

const getAll = (listId) => {
  return models.Item.findAll({ where: { listId } })
    .then((items) => {
      if (items.length > 0) return items;
      else return undefined;
    })
    .catch((err) => err);
};

const getOne = (id) => {
  return models.Item.findByPk(id)
    .then((list) => (list ? list : undefined))
    .catch((err) => err);
};

const save = (data) => {
  return models.Item.create(data)
    .then(() => true)
    .catch((err) => err);
};

const edit = (id, data) => {
  return models.Item.update(data, { where: { id } })
    .then(() => true)
    .catch((err) => err);
};

const remove = (id) => {
  return models.Item.destroy({ where: { id } })
    .then(() => true)
    .catch((err) => err);
};

module.exports = { getAll, getOne, save, edit, remove };
