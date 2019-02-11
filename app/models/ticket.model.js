const Joi = require('joi');
const BaseModal = require('../utils/base-model.js');

module.exports = new BaseModal('Ticket', {
  title: Joi.string().required(),
  date: Joi.date().required(),
  student: Joi.string().required(),
});
