import React from 'react';

// SCSS
import './Form.scss';

const Button = (props:any) => {
    
    return (
        <button className={'btn '+ props.data.className} id={props.data.name}
            onClick={props.btnClick(this, props.data.name)}>
            {props.data.title}
        </button>
    );

}
export default Button;  
