const collections = require('../dataAccess/collections');
const db = require('../dataAccess/dataAccess');

function chatService() {
    function saveChat(data) {
        return new Promise((resolve, reject) => {
            const { fromUserId, toUserId, date, msg } = data;
            const config = {
                collection: collections.CHAT,
                params: {
                    fromUserId,
                    toUserId,
                    date,
                    msg
                }
            };

            db.insert(config).then(() => {
                console.log('Chat saved');
                resolve();
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        });
    }

    return {
        saveChat
    };
}

module.exports = chatService();