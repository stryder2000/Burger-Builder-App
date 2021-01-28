import React from 'react';
import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import classes from './CheckoutSummary.css';


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div 
                style={{
                        width: '100%',
                        display: 'block',
                        alignItems: 'center',
                        margin: 'auto'
                    }}>
                <Burger/>
            </div>
            <Button 
                BtnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                BtnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;