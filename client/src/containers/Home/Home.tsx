import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//JSON
import TradeList from '../../assets/json/tradeList.json';

//COMPONENTS
import DisplayCards from '../../components/DisplayCards/DisplayCards';
import Button from '../../components/Form/Button';

// SCSS
import './Home.scss';


const Home = () => {
    // let tradeList = TradeList;

    // const [tradeList, setTradeList] : any = useState({});
    // const [objKey, setObjKey] : any = useState([]);

    // useEffect(() => {
 
    // }, []);


    // useEffect(() => {
    //     setObjKey(Object.keys(tradeList));           
    // }, [tradeList]);
    const session = () => {
        console.log('/user/session');

        fetch('/user/session')
        .then((res: any) => res.json())
        .then((data: any) => {
            console.log(data);
        }); 
    }

    let tradeListButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "View Trades",
        "name": "viewTrades",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn"
    };

    let createTradeButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Create Trade",
        "name": "createTrades",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn marginLeft-30"
    };

    return (
        <div className='homeContainer row'>
            <h2 className='sectionDivider'><span className='sectionTitle'>Games</span></h2>
            <div className='homeSection col-lg-12 col-sm-12 col-xs-12 col-md-12 row displayFlex'>                
                {/* <div className=' col-lg-4 col-md-6 col-sm-12 col-xs-12 grid1'>
                   <div>
                        <h3>
                            Limited Editions Games
                        </h3>
                        <p>
                            Shop the best curated collection of exclusive and special edition Games.
                        </p>
                   </div>
                </div>
                <div className='cardContainer col-lg-8 col-md-6 col-sm-12 col-xs-12'>
                    { 
                        tradeList['game'].map((data: any, idY: number) => {
                            return (
                                idY % 2 != 0 ? 
                                    (<div className='margin20 disCardContainer' key={idY}>
                                        <DisplayCards data={data}/>
                                    </div>) : (null)
                            )
                        })
                    }
                    <span className='backBtn'>
                        <Link to='/trades'>
                            Continue &nbsp; <i className="fa fa-long-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                        </Link>
                    </span>                                                              
                </div>  */}
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 grid1'>
                    <div>
                        <h3>
                            Limited Editions Games
                        </h3>
                        <p>
                            Shop the best curated collection of exclusive and special edition Games.
                        </p>
                    </div>
                </div>
                <div className='cardContainer col-lg-6 col-md-6 col-sm-12 col-xs-12'>

                </div>  
            </div>
            <h2 className='sectionDivider'><span className='sectionTitle'>Music Vinyls/ CD's</span></h2>
            <div className='homeSection col-lg-12 col-sm-12 col-xs-12 col-md-12 row displayFlex'>
                {/* <div className='cardContainer col-lg-8 col-md-6 col-sm-12 col-xs-12'>
                    {
                        tradeList.trades.map((data: any, key: number) => {
                            return (
                                data.type == 'song' && key <= 5 ? 
                                (
                                    <div className='margin20 disCardContainer'  key={key}>
                                        <DisplayCards data={data}/>
                                    </div>) 
                                : (null)
                            )
                        })
                    } 
                    <span className='backBtn'>
                        <Link to='/trades'>
                            Continue &nbsp; <i className="fa fa-long-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                        </Link>
                    </span> */}
                <div className='cardContainer col-lg-6 col-md-6 col-sm-12 col-xs-12'>

                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 grid2'>
                   <div>
                        <h3>
                            Experience the Music You Love
                        </h3>
                        <p>
                            Discover our large variety of Vinyl records including exclusives, bestsellers, signed editions, new releases, collectibles and more in stores and online.
                        </p>
                   </div>
                </div>
            </div>
            <h2 className='sectionDivider'><span className='sectionTitle'>Explore Trades</span></h2>
            <div className='homeSection col-lg-12 col-sm-12 col-xs-12 col-md-12 row textAlignCenter'>                
                <Link to='/trades'><Button btnClick={(event: any) => {}} data={tradeListButtonProps}/></Link>
                <Link to='/create'><Button btnClick={(event: any) => {}} data={createTradeButtonProps}/></Link>
            </div>
        </div>
    );
}


export default Home;