const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Task.findAll();
}

async function getById(id) {
    return await getTask(id);
}

async function create(params) {
    const task = new db.Task(params);
    // save task
    await task.save();
}

async function update(id, params) {
    const task = await getTask(id);

    // copy params to task and save
    Object.assign(task, params);
    await task.save();
}

async function _delete(id) {
    const task = await getTask(id);
    await task.destroy();
}

// helper functions

async function getTask(id) {
    const task = await db.Task.findByPk(id);
    if (!task) throw 'Task not found';
    return task;
}


