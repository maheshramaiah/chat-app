import * as types from './actionTypes';

export default {
    updateUsersList(users) {
        return {
            type: types.UPDATE_USERS_LIST,
            users
        };
    },
    onChatUserSelectionChange(user) {
        return {
            type: types.CHAT_USER_SELECTION_CHANGE,
            user
        };
    },
    onMessageChange(message) {
        return {
            type: types.ON_MESSAGE_CHANGE,
            message
        };
    },
    onSaveMessage(chatParams, id) {
        return {
            type: types.SAVE_MESSAGE,
            chatParams,
            id
        };
    },
    notifyIncomingChat(userId) {
        return {
            type: types.NOTIFY_INCOMING_CHAT,
            userId
        };
    }
}