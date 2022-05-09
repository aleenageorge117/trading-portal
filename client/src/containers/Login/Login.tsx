import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//JSON
import LoginForm from '../../assets/json/loginForm.json';

//COMPONENTS
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import TextArea from '../../components/Form/TextArea';

// SCSS
import './Login.scss';


const Login = () => {
    
    const [formData, setFormData] = useState({
        "emailId": "",
        "password": ""
    });
    
    const navigate = useNavigate();
    const [formTitle, setFormTitle] = useState('Login');

    const updateInputData = (el: ChangeEvent<HTMLInputElement>) => {
        if (el.target.name == 'emailId') {
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
        loginUser(formData);
    }

    let loginUser = async (formData: object) => {
        await fetch('/user/login', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })
        .then((res: any) => res.json())
        .then((data: any) => {
            localStorage.setItem('userId', data.id)
            localStorage.setItem('userName', data.name)

        })
        .then(() => {
            navigate('/profile')
            window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
        <div className='loginContainer col-lg-12 col-md-12 col-sm-12'>
            <div className='loginSection formContainer'>
                <div className='formTitleContainer'>
                    <h2 className='margin0'>{formTitle}</h2>
                </div>
                <form onSubmit={(event) => submitForm(event)}>

                    {
                        LoginForm !== undefined ?
                            (LoginForm.formFields.map((data: any, key: any) => {
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
                <div className='navigateToLink'><Link to='/signup'>Don't have an account? Go to Sign Up</Link></div>
            </div>
        </div>
    );
}


export default Login;