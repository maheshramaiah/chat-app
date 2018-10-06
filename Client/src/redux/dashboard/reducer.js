import * as types from './actionTypes.js';

const initialState = {
    users: [],
    selectedUser: null,
    message: '',
    chats: {},
    chatIds: {},
    notifyIncomingChatUserId: null,
    loading: true
};

function generateChatUniqueId(fromId, toId) {
    return `${fromId}-${toId}`;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_USERS_LIST: {
            return {
                ...state,
                users: action.users,
                loading: false
            };
        }
        case types.CHAT_USER_SELECTION_CHANGE: {
            const { user } = action;

            return {
                ...state,
                selectedUser: user,
                message: '',
                ...(state.notifyIncomingChatUserId && state.notifyIncomingChatUserId === user.id ? { notifyIncomingChatUserId: null } : {})
            };
        }
        case types.ON_MESSAGE_CHANGE: {
            const { message } = action;

            return {
                ...state,
                message
            };
        }
        case types.SAVE_MESSAGE: {
            const { id, chatParams } = action;
            const { chatId, msg } = chatParams;
            const { chats, chatIds } = state;
            const userChat = chats[chatId] || {};

            return {
                ...state,
                chats: {
                    ...chats,
                    [chatId]: {
                        ...userChat,
                        chats: [...(userChat.chats || []), chatParams]
                    }
                },
                chatIds: {
                    ...chatIds,
                    [id]: chatId
                },
                message: ''
            };
        }
        case types.NOTIFY_INCOMING_CHAT: {
            return {
                ...state,
                notifyIncomingChatUserId: action.userId
            };
        }
        default: return state;
    }
}