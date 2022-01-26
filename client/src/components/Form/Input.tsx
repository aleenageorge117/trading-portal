import React from 'react';

// SCSS
import './Form.scss';

const Input = (props:any) => {

    return (
        <input type={props.data.type} name={props.data.name} placeholder={props.data.placeholder}
            required={props.data.required} maxLength={props.data.maxLength} />
    );

}
export default Input;  
