const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const taskService = require('./task.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);


module.exports = router;

// route functions

function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(next);
}

function getById(req, res, next) {
    taskService.getById(req.params.id)
        .then(task => res.json(task))
        .catch(next);
}

function create(req, res, next) {
    taskService.create(req.body)
        .then(() => res.json({ message: 'Task created' }))
        .catch(next);
}

function update(req, res, next) {
    taskService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Task updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({ message: 'Task deleted' }))
        .catch(next);
}



// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({   
        name: Joi.string().required(),
        completed: Joi.string()    
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        completed: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}



