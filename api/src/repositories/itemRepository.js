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

const count = (listId) => {
  return models.Item.sum('quantity', { where: { listId } })
    .then((c) => c)
    .catch((err) => err);
};

const total = async (listId) => {
  let subtotal = 0;

  await models.Item.findAll({ where: { listId } })
    .then(async (items) => {
      const promises = items.map((item) => {
        subtotal += item.quantity * item.price;
      });
      await Promise.all(promises);
    })
    .catch((err) => err);

  return subtotal;
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

module.exports = { getAll, getOne, count, total, save, edit, remove };
