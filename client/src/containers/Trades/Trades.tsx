import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import DisplayCards from '../../components/DisplayCards/DisplayCards';

//JSON
import TradeList from "../../assets/json/tradeList.json"

// SCSS
import "./Trades.scss";


const Trades = () => {
    let tradeList = TradeList;

    const [selectedFilter, setSelectedFilter] = useState('all');

    return (
        <div className='tradeContainer col-lg-12 col-sm-12 col-xs-12 col-md-12'>
            <div className='sectionDivider marginLeft-30 col-lg-12'>Games</div>
            {
                tradeList.trades.map((data: any, key: number) => {
                    return (
                        data.type == 'game' ? 
                        (<div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 tradeList'>
                            <DisplayCards data={data} />
                            <span className='tradeTitle' data-tip data-for={'tradeTitle_' + key} data-class='reactTooltipStyle'>{data.name}</span>
                            <ReactTooltip id={'tradeTitle_' + key} place='bottom' effect='solid'>{data.name}</ReactTooltip>
                        </div>) : (null)
                    )
                })
            }
            <br />
            <div className='sectionDivider marginLeft-30 col-lg-12'>Songs</div>
            {
                tradeList.trades.map((data: any, key: number) => {
                    return (
                        data.type == 'song' ? 
                        (<div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 tradeList'>
                            <DisplayCards data={data} />
                            <span className='tradeTitle' data-tip data-for={'tradeTitle_' + key} data-class='reactTooltipStyle'>{data.name}</span>
                            <ReactTooltip id={'tradeTitle_' + key} place='bottom' effect='solid'>{data.name}</ReactTooltip>
                        </div>) : (null)
                    )
                })
            }
            <br />
        </div >
    );
}


export default Trades;