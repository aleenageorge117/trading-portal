import React, { ReactEventHandler, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// SCSS
import "./TradesDetail.scss";

//JSON
import TradeList from '../../assets/json/tradeList.json';
import Button from '../../components/Form/Button';

//IMAGE
import defaultImg from '../../assets/images/defaultBgImg.png';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

const TradesDetail = () => {
    let urlData: any = useParams();
    let navigate = useNavigate();

    const [tradeData, setTradeData]: any = useState({});
    const [displayErr, setDisplayErr] = useState(false);

    useEffect(() => {
        if(urlData.tradeId != undefined) {
            fetch(`/trades/${urlData.tradeId}`)
            .then((res: any) => 
                res.json()
            )
            .then((data: any) => {
                if(data.error) {
                    setDisplayErr(true);
                } else 
                    setTradeData(data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
        
    }, [urlData.tradeId]);


    let tradeButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Trade Item",
        "name": "trade",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn marginRight-30"
    };

    let rateButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Rate Item",
        "name": "rate",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn marginRight-30"
    };

    let editButtonProps = {
        "field": "button",
        "type": "submit",
        "title": <i className="fa-solid fa-pencil" id="edit"></i>,
        "name": "edit",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "secondaryBtn marginLeft-30"
    };

    
    let deleteButtonProps = {
        "field": "button",
        "type": "submit",
        "title": <i className="fa-regular fa-trash-can" id="delete"></i>,
        "name": "delete",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "warningBtn marginLeft-30"
    };

    let handeClick = (event: any) => {
        console.log(event.target)
        if (event.target.id == 'edit') {
            console.log('navigate')
            navigate(`/edit/${urlData.tradeId}`)
        } else {
            fetch(`/trades/${urlData.tradeId}`, {
                method: 'delete',
            })
            .then((response) => response.json())
            .then(() => {
                // setTimeout(() => {
                    navigate('/trades')                  
                // }, 3000);
            })
            .catch((error) => {
              console.error(error);
            });        
        }
    }
    
    

    return (
        <div className='detailComponent col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            {
                !displayErr ?
                (
                    <div>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <div className='btnContainer floatRight'>
                                <Button btnClick={(event: any) => handeClick} data={editButtonProps}/>
                                <Button btnClick={(event: any) => handeClick} data={deleteButtonProps}/>
                            </div>    
                        </div>
                        <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                            <div className='imgContainer'>
                                <div title={tradeData.tradeName} style={{backgroundImage:`url(${tradeData.imageURL}), url(${defaultImg})`}} ></div>
                            </div>
                        </div>
                        <div className='detailSection col-lg-7 col-md-12 col-sm-12 col-xs-12'>
                            <div className=''>
                                <h2>{tradeData.tradeName}</h2>
                                <span className='authorName'>{tradeData.authorName}</span>
                                <div>
                                    <fieldset className="rate">
                                        <span className='ratingTxt'>Rating: &nbsp;</span>
                                        <input type="radio" id="rating10" readOnly checked name="rating" value="10" /><label htmlFor="rating10" title="5 stars"></label>
                                        <input type="radio" id="rating9" name="rating" value="9" /><label className="half" htmlFor="rating9" title="4 1/2 stars"></label>
                                        <input type="radio" id="rating8" name="rating" value="8" /><label htmlFor="rating8" title="4 stars"></label>
                                        <input type="radio" id="rating7" name="rating" value="7" /><label className="half" htmlFor="rating7" title="3 1/2 stars"></label>
                                        <input type="radio" id="rating6" name="rating" value="6" /><label htmlFor="rating6" title="3 stars"></label>
                                        <input type="radio" id="rating5" name="rating" value="5" /><label className="half" htmlFor="rating5" title="2 1/2 stars"></label>
                                        <input type="radio" id="rating4" name="rating" value="4" /><label htmlFor="rating4" title="2 stars"></label>
                                        <input type="radio" id="rating3" name="rating" value="3" /><label className="half" htmlFor="rating3" title="1 1/2 stars"></label>
                                        <input type="radio" id="rating2" name="rating" value="2" /><label htmlFor="rating2" title="1 star"></label>
                                        <input type="radio" id="rating1" name="rating" value="1" /><label className="half" htmlFor="rating1" title="1/2 star"></label>
                                    </fieldset>
                                    <div className='btnContainer'>
                                        <Button btnClick={(event: any) => {}} data={rateButtonProps}/>
                                        <Button btnClick={(event: any) => {}} data={tradeButtonProps}/>
                                    </div>
                                </div>
                            </div>
                            <hr className='dividerLine' />
                        </div>
                        <div className='descContainer'>
                            About:<br />
                            {tradeData.tradeDescription}
                        </div>
                    </div>
                ) : (<ErrorMsg message='Error displaying Trade. Please try again later!!'/>)
            }
        </div>
    );
}


export default TradesDetail;