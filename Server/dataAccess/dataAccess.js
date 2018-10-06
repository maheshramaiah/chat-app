const db = require('./connection.js');

function dataAccess() {
    function get(config) {
        return new Promise((resolve, reject) => {
            const { collection, params, projection = {} } = config;

            db.get().collection(collection).find(params, { projection }).toArray((err, res) => {
                if (err) reject(err);
                if (res) resolve(res);
            })
        });
    }

    function getOne(config) {
        return new Promise((resolve, reject) => {
            const { collection, params } = config;

            db.get().collection(collection).findOne(params).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    function insert(config) {
        return new Promise((resolve, reject) => {
            const { collection, params } = config;

            db.get().collection(collection).insertOne(params).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    function updateOne(config) {
        return new Promise((resolve, reject) => {
            const { collection, query, values } = config;

            db.get().collection(collection).updateOne(query, values).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    return {
        get,
        getOne,
        insert,
        updateOne
    };
}

module.exports = dataAccess();