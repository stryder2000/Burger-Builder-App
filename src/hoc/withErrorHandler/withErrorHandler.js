import React from 'react';
import Auxilliary from './../Auxilliary/Auxilliary';
import Modal from './../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Auxilliary>
                <Modal modalClosed={clearError} show={error}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilliary>
        );
    };
};

export default withErrorHandler;
