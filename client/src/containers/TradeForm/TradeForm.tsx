import React, { ChangeEvent, useEffect, useState } from 'react';
import { Router, useParams, useNavigate } from 'react-router-dom';

import $ from 'jquery';

//COMPONENTS
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import TextArea from '../../components/Form/TextArea';

// SCSS
import './TradeForm.scss';

//JSON
import CreateForm from '../../assets/json/createForm.json'
import { Link } from 'react-router-dom';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import { toast } from 'react-toastify';

interface Props {
    pageTitle: string
}

const TradeForm = (props: Props) => {
    let urlData: any = useParams();
    let navigate = useNavigate();

    const [formTitle, setFormTitle] = useState('');
    const [displayErr, setDisplayErr] = useState(false);
    const [formData, setFormData] = useState({
        "tradeName": "",
        "author": localStorage.getItem('userId'),
        "tradeDescription": "",
        "imageURL": "",
        "tag": "",
        "rating": 0
    });

    useEffect(() => {
        if (props.pageTitle === 'create') {
            setFormData({
                "tradeName": "",
                "author": localStorage.getItem('userId'),
                "tradeDescription": "",
                "imageURL": "",
                "tag": "",
                "rating": 0
            })
            setFormTitle('Create Trade');
        }
        else {
            setFormTitle('Edit Trade');
        }
        if(urlData.id != undefined) {
            fetch(`/trades/${urlData.id}`)
            .then((res: any) => res.json())
            .then((data: any) => {
                if(data.error == undefined) {
                    console.log(data)
                    setFormData(data.trade);
                } else {
                    showErrorToast(data.response)
                    if (data.code) {
                        if (data.code == 11300) {
                            localStorage.clear(); 
                            navigate('/')
                        }
                    }
                    setDisplayErr(true);
                }
            });
        }
        
    }, [urlData.id]);


    const submitForm = (event: any) => {
        event.preventDefault();

        if (props.pageTitle === 'create')
            postTradeData(formData);
        else 
            putTradeData(formData);
    }

    let postTradeData = async (data: object) => {
        await fetch('/trades', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error == undefined) {
                navigate('/trades')                  
            } else {
                showErrorToast(data.response)
                if (data.code) {
                    if (data.code == 11300) {
                        localStorage.clear(); 
                        navigate('/')
                    }
                }
            }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    let putTradeData = async (data: object) => {
        if (urlData.id != undefined) {
            await fetch(`/trades/${urlData.id}`, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.error == undefined) {
                    navigate('/trade-detail/'+urlData.id)       
                } else {
                    showErrorToast(data.response)
                    if (data.code) {
                        if (data.code == 11300) {
                            localStorage.clear(); 
                            navigate('/')
                        }
                    }
                }
            })
            .catch((error) => {
              console.error(error);
            });
        }
    }

    const updateInputData = (el: ChangeEvent<HTMLInputElement>) => {
        if (el.target.name == 'tradeName') {
            console.log(el.target.value)
            setFormData({
                ...formData,
                tradeName: el.target.value
            });
        } else if (el.target.name == 'imageURL') {
            setFormData({
                ...formData,
                imageURL: el.target.value
            });
        } else if (el.target.name == 'tradeDescription') {
            setFormData({
                ...formData,
                tradeDescription: el.target.value
            });
        } else if (el.target.name == 'tag') {
            setFormData({
                ...formData,
                tag: el.target.value
            });
        }
    }

    const showErrorToast = (msg: string) => {

        toast.error(msg, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter formArea'>
            <Link to='/' className='displayContents'>
                <span className='backBtn'>
                    <i className='fa fa-long-arrow-left' aria-hidden='true'></i>&nbsp;
                    Go Back Home
                </span><br />
            </Link>
            {
                !displayErr ?
                (
                    <div className='formContainer'>
                        <div className='formTitleContainer'>
                            <h2 className='margin0'>{formTitle}</h2>
                        </div>
                        <form onSubmit={(event) => submitForm(event)}>

                            {
                                CreateForm !== undefined ?
                                (CreateForm.formFields.map((data: any, key: any) => {
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
                                            {data.field == 'button' ? (<Button btnClick={(event: any) => {}} data={data} />) : (null)}
                                            {data.field == 'textarea' ? (<TextArea updateData={(el: any) => updateInputData} formData={formData} data={data} />) : (null)}
                                        </div>
                                    );
                                }))
                                :(<span>Error Loading form</span>)
                            }
                        </form>
                    </div>
                ) : (<ErrorMsg message='Error getting trade details. Please try again Later!!'/>)
            }
        </div>
    );

}
export default TradeForm;  
