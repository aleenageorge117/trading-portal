import React from 'react';

//COMPONENTS
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import TextArea from '../../components/Form/TextArea';

// SCSS
import './CreateTrade.scss';

//JSON
import CreateForm from '../../assets/json/createForm.json'
import { Link } from 'react-router-dom';


const CreateTrade = () => {
    return (
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter formArea'>
            <Link to="/" className='displayContents'>
                <span className='backBtn'>
                    <i className="fa fa-long-arrow-left" aria-hidden="true"></i>&nbsp;
                    Go Back Home
                </span><br />
            </Link>
            <div className='formContainer'>
                <div className='formTitleContainer'>
                    <h2 className='margin0'>Create Trade</h2>
                </div>

                {
                    CreateForm !== undefined ?
                    (CreateForm.formFields.map((data: any, key: any) => {
                        return (
                            <div className={'formField ' + data.className} key={key}>
                                {data.field !== "button" ? 
                                    (
                                        <p >{data.title}
                                            <span className='required'> *</span>
                                        </p>
                                    ) : (null)}
                                {data.field == "input" ? (<Input data={data} />) : (null)}
                                {data.field == "button" ? (<Button data={data} />) : (null)}
                                {data.field == "textarea" ? (<TextArea data={data} />) : (null)}
                            </div>
                        )
                    }))
                    :(<span>Error Loading form</span>)
                }
            </div>
        </div>
    );

}
export default CreateTrade;  
