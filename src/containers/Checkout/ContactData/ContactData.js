import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/index';
import axios from './../../../axios-orders';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'}
                    ]
                },
                validation: {},
                valid: true,
                value: 'fastest'
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.TotalPrice.toFixed(2),
            formData
        };
        this.props.purchaseBurger(order);
    }

    inputChangedHandler = (event, ElementIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[ElementIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        let formIsValid = true;
        for(let InputIdentifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[InputIdentifier].valid;
        }
        updatedOrderForm[ElementIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== "";
        }

        if(rules.minLength){
            isValid = isValid && (value.length >= rules.minLength);
        }

        if(rules.maxLength){
            isValid = isValid && (value.length <= rules.maxLength);
        }
        return isValid;
    }

    render(){ 
        let inputElementArray = [];
        for(let key in this.state.orderForm){
            inputElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    <h4>Enter your Contact Data: </h4>
                    {inputElementArray.map(formElement => (
                        <Input 
                          key={formElement.id}
                          elementType={formElement.config.elementType} 
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shouldValidate={formElement.config.validation}
                          touched={formElement.config.touched}
                          changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button BtnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}



const MapStateToProps = state => {
    return {
        ingredients: state.bgr.ingredients,
        TotalPrice: state.bgr.TotalPrice,
        loading: state.odr.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (order) => dispatch(orderActions.purchaseBurger(order))
    };
}

export default connect(MapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));