const mongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/config').db;

function mongoConnection() {
    let state = {
        db: null
    }

    function get() {
        return state.db;
    }

    async function connect() {
        const { url, database } = dbConfig;

        try {
            const client = await mongoClient.connect(url, { useNewUrlParser: true });
            state.db = client.db(database);
            return;
        }
        catch(e) {
            throw e;
        }
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
