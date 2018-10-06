const bcrypt = require('bcrypt');
const collections = require('../dataAccess/collections');
const db = require('../dataAccess/dataAccess');

function loginService() {
    function checkPassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    function login(req) {
        return new Promise((resolve, reject) => {
            const { email, password } = req;
            const collection = collections.USER;

            db.getOne({ collection, params: { email } }).then(user => {
                if (!user || !checkPassword(password, user.password)) {
                    throw new Error('Authentication Failed: Bad credentials');
                }

                delete user.password;

                resolve({ msg: 'Login successfull', user });
            }).catch(err => {
                reject(err.message);
            });
        });
    }

    return {
        login
    };
}

module.exports = loginService();