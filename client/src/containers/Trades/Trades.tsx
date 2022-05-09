import React, { useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import $ from 'jquery';

//JSON
import TradeList from "../../assets/json/tradeList.json"

// SCSS
import "./Trades.scss";

//COMPONENT
import DisplayCards from '../../components/DisplayCards/DisplayCards';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

const Trades = () => {

    const [pageContent, setPageContent] : any = useState({});
    const [objKey, setObjKey] : any = useState([]);
    const [displayErr, setDisplayErr] = useState(false);

    useEffect(() => {
        fetch('/trades')
            .then((res: any) => res.json())
            .then((data: any) => {
                if (data.error == undefined) 
                    setPageContent(data);
                else
                setDisplayErr(true);
            })
            .catch((error) => {
                setDisplayErr(true);
            });
    }, []);

    useEffect(() => {
        setObjKey(Object.keys(pageContent));
    }, [pageContent]);
    let counter = 0;
    
    return (
        <div>
            {
                !displayErr ? (
                    <div>
                        {
                            objKey.map((key: any, idX: number) => {
                                if (pageContent[key].length == 0) counter++;

                                return (
                                    pageContent[key].length > 0 ? 
                                        (
                                            <div className='tradeContainer col-lg-12 col-sm-12 col-xs-12 col-md-12'>
                                                <div className='sectionDivider marginLeft-30 col-lg-12'>{key}</div>
                                                {
                                                    pageContent[key].map((data: any, idY: number) => {
                                                        return (
                                                            <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 tradeList'  key={key}>
                                                                <DisplayCards data={data} />
                                                                <span className='tradeTitle' data-tip data-for={'tradeTitle_' + key} data-class='reactTooltipStyle'>{data.tradeName}</span>
                                                                <ReactTooltip id={'tradeTitle_' + key} place='bottom' effect='solid'>{data.tradeName}</ReactTooltip>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                <br />
                                            </div>
                                        ) : (null)
                                );
                            })
                        }
                        {counter == objKey.length ? (<p> No List To display</p>) : (null)}
                    </div>
                  
                ) : (<ErrorMsg message='Error displaying Trades. Please try again later!!'/>)
            }
            
        </div>
    );
}


export default Trades;
