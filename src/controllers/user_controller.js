const {User} = require('../database/index');
const Joi = require('joi');

const validateRegister = Joi.object({
    id: Joi.string().min(1).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    password: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    })
  });
  
  const registerUser = async (req, res) => {
    try {
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              id:'',
              name:'',
              password:'',
              validationErrors: errorMessages
            }
        });
      }
  
      const { id, name, password,} = req.body;
      
      const userExist = await User.findByPk(id);
      
      if (userExist) {
        return res.status(400).json(
        { 
          message: 'the user already exists',
          result: null 
        });
      }
  
      const newUser = await Client.create({ id, name, password });
      res.status(201).json(
        { 
          message:'User created',
          result: {
            id:newUser.id,
            name:newUser.name,
            password:newUser.password,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message,result: null});
    }
  };
  
  const listUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      if(!users){
        res.status(200).json({ message: 'There are no users listed', result: users });
      }
      res.status(200).json({ message: 'Users listed', result: users });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'The user does not exist', result: null });
      }
      
      const newUser = await Client.update({ name, email, password });
      res.status(200).json({ message: 'User information updated', result: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'The user does not exist', result: null });
      }
      
      const deleteUser = await User.destroy(id);
      res.status(200).json({ message: 'User information deleted', result: deleteUser });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerUser,
      listUsers,
      updateUser,
      deleteUser
  };
