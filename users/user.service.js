const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    calculateAverageAges,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    const user = new db.User(params);
    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}


async function calculateAverageAges() {

    const users = await db.User.findAll();

    let accumulated = 0;
    let today = new Date();
    let age, m, birthDate;
    let count = 0;
    users.map((u) => {
        birthDate = new Date(u.bornDate);
        age = today.getFullYear() - birthDate.getFullYear();
        m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        count++;
        accumulated += age;
    });


    return accumulated/count;
}