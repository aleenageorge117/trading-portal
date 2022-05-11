import React from 'react';

// SCSS
import './Form.scss';

const Input = (props:any) => {

    return (
        <input type={props.data.type} name={props.data.name} id={props.data.name} placeholder={props.data.placeholder}
            required={props.data.required} maxLength={props.data.maxLength}  minLength={props.data.minLength} 
            onChange={props.updateData(this)}
            value={props.formData[`${props.data.name}`]}/>
    );

}
export default Input;  
