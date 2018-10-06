import React from 'react';
import './style.scss';
import classNames from 'classnames';
import Avatar from '../Avatar/avatar.js';

const LeftPanel = (props) => {
    const { users, selectedUser, chatUserSelectionChange, notifyIncomingChatUserId } = props;

    return (
        <div>
            <ul className="list">
                {
                    users.map((user, index) => {
                        const color = user.active ? 'yellow' : 'red';
                        const cssClassNames = classNames('item', {
                            selected: selectedUser && selectedUser.id === user.id,
                            notifyChat: user.id === notifyIncomingChatUserId
                        });

                        return (
                            <li key={index} className={cssClassNames} onClick={() => chatUserSelectionChange(user)}>
                                <div>
                                    <Avatar name={user.userName} />
                                    <span className="name">{user.userName}</span>
                                </div>
                                <div className="status" style={{ backgroundColor: color }}></div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default LeftPanel;