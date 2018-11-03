import React from 'react';
import moment from 'moment';
import './style.scss';

const ChatWindow = (props) => {
    const { chats, user, onMessageChange, message = '', sendMessage } = props;
    const placeholder = `Write a message to ${user.userName}`;

    function onKeyDown(e) {
        if (e.keyCode === 13) {
            sendMessage();
        }
    }

    return (
        <div className="chatWindow">
            <div className="chatsContainer">
                <ul className="chatList">
                    {
                        chats.map((chat, index) => {
                            const { fromUserId, msg, date } = chat;
                            const formattedDate = moment(date).format('lll');

                            return (
                                <li key={index} className="chat">
                                    <div>
                                        <span className="name">{fromUserId !== user.id ? 'You' : user.userName}</span>
                                        <span className="timeStamp">{formattedDate}</span>
                                    </div>

                                    <p className="msg">{msg}</p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className="inputContainer">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={message}
                    autoFocus={true}
                    onChange={(e) => onMessageChange(e.target.value)}
                    onKeyDown={onKeyDown}>
                </input>
            </div>
        </div>
    );
};

export default ChatWindow;