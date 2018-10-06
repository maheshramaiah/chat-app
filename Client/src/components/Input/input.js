import React from 'react';
import './style.scss';

const Input = (props) => {
    const { type, value, label, onChange } = props;
    return (
        <div className="form-field">
            <label className="label">{label}</label>
            <div className="field">
                <input type={type} onChange={(e) => onChange(e.target.value)} value={value} />
            </div>
        </div>

    );
};

export default Input;