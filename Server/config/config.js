const config = {
    port: 3000,
    db: {
        //url: 'mongodb://chat-db:27017',
        url: 'mongodb://localhost:27017',
        database: 'chat'
    },
    saveChat: false
};

module.exports = config;