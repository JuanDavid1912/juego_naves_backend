const {UserLevel} = require('../database/index');
const Joi = require('joi');

const validateRegister = Joi.object({
    id: Joi.string().integer().min(1).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    id_user: Joi.string().integer().min(1).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    id_level: Joi.number().integer().min(1).max(99999).positive().required().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be an integer.',
        'number.min': 'The id should be a valid number.',
        'number.max': 'the id should be a valid number.',
        'any.required': 'The id is mandatory.'
    })
  });
  
  const registerUserLevel = async (req, res) => {
    try {
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              id:'',
              id_user:'',
              id_level:'',
              validationErrors: errorMessages
            }
        });
      }
  
      const { id, id_user, id_level,} = req.body;
      
      const userLevelExist = await UserLevel.findByPk(id);
      
      if (userLevelExist) {
        return res.status(400).json(
        { 
          message: 'the userLevel already exists',
          result: null 
        });
      }
  
      const newUserLevel = await Client.create({ id, id_user, id_level });
      res.status(201).json(
        { 
          message:'UserLevel created',
          result: {
            id:newUser.id,
            id_user:newUserLevel.id_user,
            id_level:newUserLevel.id_level,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message,result: null});
    }
  };
  
  const listUsersLevels = async (req, res) => {
    try {
      const users = await UserLevel.findAll();
      res.status(200).json({ message: 'UsersLevels listed', result: users });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateUserLevel = async (req, res) => {
    try {
      const { id } = req.params;
      const { id_user, id_level } = req.body;
      const userLevel = await UserLevel.findByPk(id);
      
      if (!userLevel) {
        return res.status(404).json({ message: 'The userLevel does not exist', result: null });
      }
      
      const newUserLevel = await Client.update({ id_user, id_level });
      res.status(200).json({ message: 'UserLevel information updated', result: newUserLevel });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteUserLevel = async (req, res) => {
    try {
      const { id } = req.params;
      const userLevel = await UserLevel.findByPk(id);
      
      if (!userLevel) {
        return res.status(404).json({ message: 'The userlevel does not exist', result: null });
      }
      
      const deleteUserLevel = await User.destroy(id);
      res.status(200).json({ message: 'UserLevel information deleted', result: deleteUserLevel });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerUserLevel,
      listUsersLevels,
      updateUserLevel,
      deleteUserLevel
  };