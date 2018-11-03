import React from 'react';
import './style.scss';

const Button = (props) => {
    const { text, onClick, disabled } = props;

    function onBtnClick(e) {
        e.preventDefault();
        onClick();
    }

    return (
        <button className="btn" onClick={onBtnClick} disabled={disabled}>{text}</button>
    );
}

export default Button;