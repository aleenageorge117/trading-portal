import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//JSON
import SignUpForm from '../../assets/json/signUpForm.json';

//COMPONENTS
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import TextArea from '../../components/Form/TextArea';

// SCSS
import './SignUp.scss';


const SignUp = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        "userName": "",
        "emailId": "",
        "password": ""
    });

    const [formTitle, setFormTitle] = useState('Sign Up');

    const updateInputData = (el: ChangeEvent<HTMLInputElement>) => {
        if (el.target.name == 'userName') {
            setFormData({
                ...formData,
                userName: el.target.value
            });
        } else if (el.target.name == 'emailId') {
            setFormData({
                ...formData,
                emailId: el.target.value
            });
        } else if (el.target.name == 'password') {
            setFormData({
                ...formData,
                password: el.target.value
            });
        }
    }

    let submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUser(formData);
    }

    let createUser = async (formData: object) => {
        await fetch('/user/signup', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })
        .then((response) => { 
            response.json()
            navigate('/trades')                  
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <div className='signUpContainer col-lg-12 col-md-12 col-sm-12'>
            <div className='signUpSection formContainer'>
                <div className='formTitleContainer'>
                    <h2 className='margin0'>{formTitle}</h2>
                </div>
                <form onSubmit={(event) => submitForm(event)}>

                    {
                        SignUpForm !== undefined ?
                            (SignUpForm.formFields.map((data: any, key: any) => {
                                return (
                                    <div className={'formField ' + data.parenClassName} key={key}>
                                        {data.field !== 'button' ?
                                            (
                                                <p >{data.title}
                                                    {
                                                        data.required ? (<span className='required'> *</span>) : (null)
                                                    }
                                                </p>
                                            ) : (null)}
                                        {data.field == 'input' ? (<Input updateData={(el: any) => updateInputData} formData={formData} data={data} />) : (null)}
                                        {data.field == 'button' ? (<Button btnClick={(event: any) => { }} data={data} />) : (null)}
                                        {data.field == 'textarea' ? (<TextArea updateData={(el: any) => updateInputData} formData={formData} data={data} />) : (null)}
                                    </div>
                                );
                            }))
                            : (<span>Error Loading form</span>)
                    }
                </form>
                <div className='navigateToLink'><Link to='/login'>Already Sign Up? Go to Login</Link></div>
            </div>
        </div>
    );
}


export default SignUp;