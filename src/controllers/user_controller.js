const {User} = require('../database/index');
const Joi = require('joi');
const { generateToken, verifyToken, hashPassword, comparePassword} = require('../utils/auth');

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

  const validateLogin = Joi.object({
    id: Joi.string().min(1).max(50).required().messages({
        'string.base': 'The id has to be a text.',
        'string.empty': 'The id is mandatory.',
        'any.required': 'The name is mandatory.'
    }),
    password: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The password has to be a text.',
        'string.empty': 'The password is mandatory.',
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
          message: 'The user already exists',
          result: null 
        });
      }
      
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({ id, name, hashedPassword });
      const token = await generateToken(newUser);
      res.status(201).json(
        { 
          message:'User created',
          result: {
            token:token,
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

  const loginUser = async (req, res) => {
    try {
      const { error } = validateLogin.validate(req.body, { abortEarly: false });
      
      if (error) {
        const errors = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          menssage: errors,
          result: null
        });
      }
      
      const { id, password } = req.body;
      const user = await User.findOne({
        where: {
          id: id
        },
      });
     
      if (!user) {
        return res.status(404).json({ message:"The user does not exist", result:null });
      }
      
      const valid = await comparePassword(password, user.password);
      if (!valid) {
        return res.status(401).json({ message:"The password is incorrect", result:null });
      }
      const token = generateToken(user);
      res.status(200).json({ mensaje:"Sesion iniciada",
        resultado: {
          token: token,
          id:user.id,
          name: user.name
        }
      });
    } catch (error) {
      res.status(500).json({ message:error.message, result:null });
    }
};
  
  const listUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      if(users.length === 0){
        res.status(200).json({ message: 'There are no users listed', result: users });
      }
      else{
        res.status(200).json({ message: 'Users listed', result: users });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, password } = req.body;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'The user does not exist', result: null });
      }
      
      const newUser = await user.update({ name, password });
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
      
      const deleteUser = await user.destroy(id);
      res.status(200).json({ message: 'User information deleted', result: deleteUser });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerUser,
      loginUser,
      listUsers,
      updateUser,
      deleteUser
  };
