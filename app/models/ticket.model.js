const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Ticket', {
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  studentID: Joi.number().required(),
  major: Joi.string().required(),
  archived: Joi.boolean().required(),
  id: Joi.number().required(),
});
