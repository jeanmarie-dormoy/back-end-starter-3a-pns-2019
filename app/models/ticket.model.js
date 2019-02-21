const Joi = require('joi');
const BaseModal = require('../utils/base-model.js');

module.exports = new BaseModal('Ticket', {
  title: Joi.string().required(),
  date: Joi.date().required(),
  author: Joi.string().required(),
});
