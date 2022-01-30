import React from 'react';
import { useParams } from 'react-router-dom';

// SCSS
import "./TradesDetail.scss";

//JSON
import TradeList from '../../assets/json/tradeList.json';

const TradesDetail = () => {
    let urlData: any = useParams();
    let tradeData:any;

    for (let trade in TradeList.trades) {
        if (trade == urlData.tradeId)
            tradeData = TradeList.trades[trade];
    }

    
    return (
        <div className='detailComponent col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <div>

            </div>
        </div>
    );
}


export default TradesDetail;