const {Level} = require('../database/index');
const Joi = require('joi');

const validateRegister = Joi.object({
    id: Joi.number().integer().min(1).max(99999).positive().required().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be an integer.',
        'number.min': 'The id should be a valid number.',
        'number.max': 'the id should be a valid number.',
        'any.required': 'The id is mandatory.'
    }),
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    speed: Joi.number().integer().min(1).max(99999).positive().required().messages({
        'number.base': 'The speed must be a number.',
        'number.integer': 'The speed must be an integer.',
        'number.min': 'The speed should be a valid number.',
        'number.max': 'the speed should be a valid number.',
        'any.required': 'The speed is mandatory.'
    }),
  });
  
  const registerLevel = async (req, res) => {
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
              speed:'',
              validationErrors: errorMessages
            }
        });
      }
  
      const { id, name, speed,} = req.body;
      
      const levelExist = await Level.findByPk(id);
      
      if (levelExist) {
        return res.status(400).json(
        { 
          message: 'the level already exists',
          result: null 
        });
      }
  
      const newLevel = await Client.create({ id, name, speed });

      res.status(201).json(
        { 
          message:'Level created',
          result: {
            id:newLevel.id,
            name:newLevel.name,
            speed:newLevel.speed,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message,result: null});
    }
  };
  
  const listLevels = async (req, res) => {
    try {
      const levels = await User.findAll();
      res.status(200).json({ message: 'Levels listed', result: levels });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateLevel = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, speed } = req.body;
      const level = await Level.findByPk(id);
      
      if (!level) {
        return res.status(404).json({ message: 'The level does not exist', result: null });
      }
      
      const newLevel = await Level.update({ name, email, speed });
      res.status(200).json({ message: 'User information updated', result: newLevel });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteLevel = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Level.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'The level does not exist', result: null });
      }
      
      const deleteLevel = await Level.destroy(id);
      res.status(200).json({ message: 'Level information deleted', result: deleteLevel });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerLevel,
      listLevels,
      updateLevel,
      deleteLevel
  };
