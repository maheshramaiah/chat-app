import { createSelector } from 'reselect';
import Storage from '../../utils/storage.js';

const usersList = state => state.dashboard.users;
const selectedUser = state => state.dashboard.selectedUser;
const message = state => state.dashboard.message;
const chats = state => state.dashboard.chats;
const chatIds = state => state.dashboard.chatIds;
const notifyIcomingChatUserId = state => state.dashboard.notifyIncomingChatUserId;
const loading = state => state.dashboard.loading;

export const getUsersList = createSelector(
    [usersList],
    (usersList) => {
        const loggedInUser = Storage.get('userInfo');

        return usersList.map(user => {
            const { _id, firstName, lastName, socketId, active } = user;

            return {
                id: _id,
                userName: `${firstName} ${lastName}`,
                socketId,
                active
            };
        }).filter(user => user.id !== loggedInUser._id);
    }
);

export const getSelectedUser = createSelector(
    [selectedUser],
    (user) => user
);

export const getMessageText = createSelector(
    [message],
    (message) => message
);

export const getChatIds = createSelector(
    [chatIds],
    (chatIds) => chatIds
);

export const getChats = createSelector(
    [chats, getSelectedUser, getChatIds],
    (chats, selectedUser, chatIds) => {
        if (selectedUser) {
            const chatId = chatIds[selectedUser.id];

            return chatId ? (chats[chatId] ? chats[chatId].chats : []) : [];
        }

        return [];
    }
);

export const getIncomingChatNotificationUserId = createSelector(
    [notifyIcomingChatUserId],
    (notifyIcomingChatUserId) => notifyIcomingChatUserId
);

export const getLoaderFlag = createSelector(
    [loading],
    (loading) => loading
);