const bcrypt = require('bcrypt');
const collections = require('../dataAccess/collections');
const db = require('../dataAccess/dataAccess');

function registerService() {
    function encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    }

    function register(req) {
        return new Promise((resolve, reject) => {
            const { email, firstName, lastName, password } = req;
            const collection = collections.USER;

            db.getOne({ collection, params: { email } }).then(user => {
                if (user) {
                    throw new Error('User Exist');
                }

                return;
            }).then(() => {
                const config = {
                    collection: collections.USER,
                    params: {
                        email,
                        firstName,
                        lastName,
                        password: encryptPassword(password)
                    }
                };

                return db.insert(config);
            }).then(() => {
                resolve('Successfully created user');
            }).catch(err => {
                reject(err.message);
            });
        });
    }

    return {
        register
    };
}

module.exports = registerService();