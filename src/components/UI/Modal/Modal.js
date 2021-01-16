import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary';
import classes from './Modal.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const modal = (props) => (
    <Auxilliary>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Auxilliary>
);

export default modal;