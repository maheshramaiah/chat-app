import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './actionCreator';
import SocketManager from './socketManager';
import * as selectors from './selector';
import './app.scss';
import {
    LeftPanel,
    ChatWindow,
    Loader
} from '../../components/all';
import Storage from '../../utils/storage';

class Dashboard extends React.Component {
    constructor() {
        super();

        this.loggedInUser = Storage.get('userInfo');
        this.chatUserSelectionChange = this.chatUserSelectionChange.bind(this);
        this.receiveUsersList = this.receiveUsersList.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.receivePrivateMessage = this.receivePrivateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.socket = new SocketManager({
            receiveUsersList: this.receiveUsersList,
            receivePrivateMessage: this.receivePrivateMessage
        })
    }

    generateChatUniqueId(fromId, toId) {
        return `${fromId}-${toId}`;
    }

    receiveUsersList(users) {
        this.props.actions.updateUsersList(users);
    }

    onMessageChange(val) {
        this.props.actions.onMessageChange(val);
    }

    receivePrivateMessage(chatParams) {
        const { selectedUser, actions } = this.props;
        const { fromUserId } = chatParams;

        if (!selectedUser || selectedUser.id !== fromUserId) {
            actions.notifyIncomingChat(fromUserId);
        }

        actions.onSaveMessage(chatParams, chatParams.fromUserId);
    }

    sendMessage() {
        const { selectedUser, messageText: msg, chatIds } = this.props;
        const { id: toUserId, socketId } = selectedUser;
        const chatId = chatIds[toUserId] ? chatIds[toUserId] : this.generateChatUniqueId(this.loggedInUser._id, toUserId);
        const chatParams = {
            chatId,
            msg,
            socketId,
            fromUserId: this.loggedInUser._id,
            toUserId,
            date: (new Date()).toISOString()
        };

        this.props.actions.onSaveMessage(chatParams, toUserId);
        this.socket.sendPrivateMessage(chatParams);
    }

    chatUserSelectionChange(user) {
        this.props.actions.onChatUserSelectionChange(user);
    }

    render() {
        const { users, selectedUser, messageText, chats = [], notifyIncomingChatUserId, showLoader } = this.props;

        return (
            <div className="dashboard">
                <header className="header clearfix">
                    <div className="profile">
                        Hello, {this.loggedInUser.firstName}
                    </div>
                </header>
                <section className="section">
                    <div className="leftPanel">
                        <LeftPanel
                            users={users}
                            selectedUser={selectedUser}
                            chatUserSelectionChange={this.chatUserSelectionChange}
                            notifyIncomingChatUserId={notifyIncomingChatUserId}
                        />
                    </div>
                    <div className="rightPanel">
                        {
                            selectedUser &&
                            <ChatWindow
                                chats={chats}
                                user={selectedUser}
                                message={messageText}
                                onMessageChange={this.onMessageChange}
                                sendMessage={this.sendMessage}
                            />
                        }
                    </div>
                </section>
                {showLoader && <Loader />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: selectors.getUsersList(state),
        selectedUser: selectors.getSelectedUser(state),
        messageText: selectors.getMessageText(state),
        chats: selectors.getChats(state),
        chatIds: selectors.getChatIds(state),
        notifyIncomingChatUserId: selectors.getIncomingChatNotificationUserId(state),
        showLoader: selectors.getLoaderFlag(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);