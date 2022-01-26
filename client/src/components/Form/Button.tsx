import React from 'react';

// SCSS
import './Form.scss';

const Button = (props:any) => {
    
    return (
        <button className={'primaryBtn btn '+ props.data.className}>{props.data.title}</button>
    );

}
export default Button;  
