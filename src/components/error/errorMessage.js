import React, { Fragment } from 'react';
import imgs from './error.jpg';

const ErrorMessage = () => {
    return (
        <Fragment>
            <img src={imgs} alt=""></img>
            <span>Something goes wrong :(</span>
        </Fragment>
    )
    
}
export default ErrorMessage;