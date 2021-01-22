import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.TotalPrice,
            customer: {
                name: 'Siddharth',
                address: {
                    Street: 'Teststreet 1',
                    zipCode: '345312',
                    country: 'India' 
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
        .then(
            (response) => {
                this.setState({loading: false});
                this.props.history.push('/');
            }
        )
        .catch((error) => {this.setState({loading: false})});
    }
    render(){
        let contactData = this.state.loading ? 
            <Spinner /> 
            : (
                <div>
                    <h4>Enter your Contact Data: </h4>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button BtnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </div>
            ); 
        return(
            <div className={classes.ContactData}>
            {contactData}
            </div>
        );
    }
}

export default ContactData;