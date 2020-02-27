const bcrypt = require('bcrypt');
const collections = require('../dataAccess/collections');
const db = require('../dataAccess/dataAccess');

function loginService() {
    function checkPassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    async function login(req) {
        const { email, password } = req;
        const collection = collections.USER;

        try {
            const user = await db.getOne({ collection, params: { email } });

            if (!user || !checkPassword(password, user.password)) {
                throw new Error('Authentication Failed: Bad credentials');
            }

            delete user.password;

            return { msg: 'Login successfull', user }
        }
        catch (err) {
            throw err.message;
        }
    }

    return {
        login
    };
}

module.exports = loginService();