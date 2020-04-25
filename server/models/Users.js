const Joi = require('joi');
const Schwifty = require('schwifty');

module.exports = class Users extends Schwifty.Model {
  static get tableName() {
    return 'users';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number(),
      name: Joi.string(),
      created_at: Joi.date(),
      updated_at: Joi.date(),
    });
  }
};
