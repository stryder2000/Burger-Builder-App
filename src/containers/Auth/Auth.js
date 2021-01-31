import React, { Component } from 'react';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Modal from './../../components/UI/Modal/Modal';
import { Redirect } from 'react-router-dom';
import { checkValidity } from './../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath();
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[
                formElementIdentifier
            ].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.TotalPrice.toFixed(2),
            formData
        };
        this.props.purchaseBurger(order);
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                )
            }
        };
        this.setState({ controls: updatedControls });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return { isSignup: !prevState.isSignup };
        });
    };

    render() {
        let inputElementArray = [];
        for (let key in this.state.controls) {
            inputElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = inputElementArray.map((formElement) => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));
        let submit = this.props.loading ? (
            <Spinner />
        ) : (
            <Button BtnType="Success">SUBMIT</Button>
        );

        let err = 'ERROR : ' + this.props.error + '. PLEASE TRY AGAIN!';

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <Auxilliary>
                <Modal
                    modalClosed={this.props.errorConfirmedHandler}
                    show={this.props.showError}
                >
                    <span style={{ color: 'red', fontWeight: '600' }}>
                        {err}
                    </span>
                </Modal>
                <div className={classes.Auth}>
                    {authRedirect}
                    <form onSubmit={this.onSubmitHandler}>
                        {form}
                        {submit}
                    </form>

                    <Button
                        BtnType="Danger"
                        clicked={this.switchAuthModeHandler}
                    >
                        SWITCH TO {this.state.isSignup ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </div>
            </Auxilliary>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        showError: state.auth.showError,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.bgr.building
    };
};

const MapDisptachToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        errorConfirmedHandler: () => dispatch(actions.errorConfirmed()),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(MapStateToProps, MapDisptachToProps)(Auth);
