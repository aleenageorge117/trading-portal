import React from 'react';
import { Link } from 'react-router-dom';

// SCSS
import "./ErrorMsg.scss";

interface Props {
    message: string
}

const ErrorMsg = (props: Props) => {

    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 ErrorMsgContainer'>
            <span className='msg'>{props.message}</span>
        </div>
    );
}


export default ErrorMsg;