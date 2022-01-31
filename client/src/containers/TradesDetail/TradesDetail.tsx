import React from 'react';
import { useParams } from 'react-router-dom';

// SCSS
import "./TradesDetail.scss";

//JSON
import TradeList from '../../assets/json/tradeList.json';
import Button from '../../components/Form/Button';

const TradesDetail = () => {
    let urlData: any = useParams();
    let tradeData:any;
    console.log(urlData.tradeId)
    tradeData = TradeList.trades[parseInt(urlData.tradeId)-1];

    let tradeButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Trade Item",
        "name": "trade",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "marginRight-30"
    };

    let rateButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Rate Item",
        "name": "rate",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "marginRight-30"
    };
    
    return (
        <div className='detailComponent col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                <div className='imgContainer'>
                    <div title={tradeData.title} style={{backgroundImage:`url(${tradeData.image})`}} ></div>
                </div>
            </div>
            <div className='detailSection col-lg-7 col-md-12 col-sm-12 col-xs-12'>
                <div className=''>
                    <h2>{tradeData.name}</h2>
                    <span className='authorName'>{tradeData.author}</span>
                    <div>
                        <fieldset className="rate">
                            <span className='ratingTxt'>Rating: &nbsp;</span>
                            <input type="radio" id="rating10" checked name="rating" value="10" /><label htmlFor="rating10" title="5 stars"></label>
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
                            <Button data={rateButtonProps}/>
                            <Button data={tradeButtonProps}/>
                        </div>
                    </div>
                </div>
                <hr className='dividerLine' />
            </div>
            <div className='descContainer'>
                About:<br />
                {tradeData.description}
            </div>
        </div>
    );
}


export default TradesDetail;