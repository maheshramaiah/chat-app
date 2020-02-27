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

    async function getOne(config) {
        const { collection, params } = config;

        try {
            const data = await db.get().collection(collection).findOne(params);

            return data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async function insert(config) {
        const { collection, params } = config;

        try {
            const data = await db.get().collection(collection).insertOne(params);

            return data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async function updateOne(config) {
        const { collection, query, values } = config;

        try {
            await db.get().collection(collection).updateOne(query, values);

            return;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    return {
        get,
        getOne,
        insert,
        updateOne
    };
}

module.exports = dataAccess();