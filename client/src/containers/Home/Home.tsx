import React from 'react';
import { Link } from 'react-router-dom';

//JSON
import TradeList from '../../assets/json/tradeList.json';

//COMPONENTS
import DisplayCards from '../../components/DisplayCards/DisplayCards';

// SCSS
import './Home.scss';


const Home = () => {
    let tradeList = TradeList;

    return (
        <div className='homeContainer row'>
            <h2 className='sectionDivider'><span className='sectionTitle'>Games</span></h2>
            <div className='homeSection col-lg-12 col-sm-12 col-xs-12 col-md-12 row displayFlex'>                
                <div className=' col-lg-4 col-md-6 col-sm-12 col-xs-12 grid1'>
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
                        tradeList.trades.map((data: any, key: number) => {
                            return (
                                data.type == 'game' && key <= 5 ? 
                                (
                                    <div className='margin20 disCardContainer'>
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
                    </span>
                </div>
            </div>
            <h2 className='sectionDivider'><span className='sectionTitle'>Music Vinyls/ CD's</span></h2>
            <div className='homeSection col-lg-12 col-sm-12 col-xs-12 col-md-12 row displayFlex'>
                <div className='cardContainer col-lg-8 col-md-6 col-sm-12 col-xs-12'>
                    {
                        tradeList.trades.map((data: any, key: number) => {
                            return (
                                data.type == 'song' && key <= 5 ? 
                                (
                                    <div className='margin20 disCardContainer'>
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
                    </span>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12 grid2'>
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
        </div>
    );
}


export default Home;