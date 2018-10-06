const mongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/config').db;

function mongoConnection() {
    let state = {
        db: null
    }

    function get() {
        return state.db;
    }

    function connect() {
        return new Promise((resolve, reject) => {
            const { url, database } = dbConfig;

            mongoClient.connect(url, { useNewUrlParser: true }).then(client => {
                state.db = client.db(database);
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    function close() {
        if (state.db) {
            state.db.close((err, res) => {
                state.db = null;
            });
        }
    }

    return {
        get,
        connect,
        close
    };
}

module.exports = mongoConnection();
