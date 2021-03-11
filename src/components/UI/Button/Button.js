import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
        className={[classes.Button, classes[props.BtnType]].join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}
    >
        <center>{props.children}</center>
    </button>
);

export default button;
