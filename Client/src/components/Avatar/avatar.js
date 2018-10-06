import React from 'react';
import './style.scss';

const Avatar = (props) => {
    const { name } = props;

    return (
        <span className="avatar">
            {name.split(' ').map(a => a.charAt(0)).join('').toUpperCase()}
        </span>
    );
}

export default Avatar;