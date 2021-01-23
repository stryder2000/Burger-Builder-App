import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from './../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

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
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.TotalPrice,
            formData
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
        return(
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;