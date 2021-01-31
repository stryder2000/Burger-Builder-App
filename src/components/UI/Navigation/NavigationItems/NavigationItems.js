import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxilliary from './../../../../hoc/Auxilliary/Auxilliary';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" clicked={props.clicked} exact>
            Burger Builder
        </NavigationItem>

        {props.isAuthenticated ? (
            <Auxilliary>
                <NavigationItem link="/orders" clicked={props.clicked}>
                    My Orders
                </NavigationItem>
                <NavigationItem link="/logout" clicked={props.clicked}>
                    Logout
                </NavigationItem>
            </Auxilliary>
        ) : (
            <NavigationItem link="/auth" clicked={props.clicked}>
                Authenticate
            </NavigationItem>
        )}
    </ul>
);

export default navigationItems;
