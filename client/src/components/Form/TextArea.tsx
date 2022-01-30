import React from 'react';

// SCSS
import './Form.scss';

const TextArea = (props:any) => {
    return (
        <textarea className={props.data.className} name={props.data.name} placeholder={props.data.placeholder} required={props.data.required} maxLength={props.data.maxLength} />
    );

}
export default TextArea;  
