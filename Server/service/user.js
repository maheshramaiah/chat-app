const fs = require('fs');
const collections = require('../dataAccess/collections');
const db = require('../dataAccess/dataAccess');

function userService() {
    const collection = collections.USER;

    function getAll() {
        return new Promise((resolve, reject) => {
            db.get({ collection, projection: { password: 0 } })
                .then(users => resolve(users))
                .catch(err => reject(err.message));
        });
    }

    function update(query, values) {
        const params = {
            collection,
            query,
            values
        };

        return new Promise((resolve, reject) => {
            db.updateOne(params)
                .then(users => resolve(users))
                .catch(err => reject(err.message));
        });
    }

    function updateProfilePath(req) {
        const { path: filePath, originalname } = req.file;
        const ext = originalname.split('.').pop();
        const newPath = `${filePath}.${ext}`;

        return new Promise((resolve, reject) => {
            fs.rename(filePath, newPath, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(newPath);
                }
            });
        });
    }

    return {
        getAll,
        update,
        updateProfilePath
    };
}

module.exports = userService();