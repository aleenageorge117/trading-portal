import React from 'react';
import ReactTooltip from "react-tooltip";


// SCSS
import "./Trades.scss";


const Trades = () => {
    let tradeList = {
        "trades": [
            {
                "name": "The Banner Saga",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "image": "https://d10nlcvbt35ur0.cloudfront.net/content/uploads/2015/11/02235425/FR-708_Cover.jpg",
                "userName": "abc",
                "rating": 4.5
            },
            {
                "name": "Ilan Eshkeri & Shigeru Umebayashi - Ghost of Tsushima (Music From the Video Game) - CD",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "image": "https://i5.walmartimages.com/asr/537cbb66-a4db-49b4-b740-479224d10643.1cbfc00f0a08d1b20421c8c208554e01.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                "userName": "abc",
                "rating": 4
            },
            {
                "name": "Morgan Wallen - Dangerous: The Double Album - CD",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "image": "https://i5.walmartimages.com/asr/90d52c4b-f41f-4492-9750-0f44c89d74ff.489d16e95b75433054f3c3ae57b07857.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                "userName": "abc",
                "rating": 3.5
            },
            {
                "name": "Walker Hayes - Country Stuff The Album - CD",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "image": "https://i5.walmartimages.com/asr/4a9e95cf-5159-416b-b3cc-924f5a34bf87.9eacbe31080ef3e9b36f30d08adf16ba.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                "userName": "abc",
                "rating": 4
            },
            {
                "name": "Blaster Simulator - PC CD Sim Game - Knock Down Buildings, Build Up Your Company",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "image": "https://i5.walmartimages.com/asr/2d7cc5bc-3cac-4f41-a84e-5fb54ff46fba_1.9d04934726fd448c8a77b650e8677016.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                "userName": "abc",
                "rating": 2.5
            },
            
            {
                "name": "Reba McEntire - Revived Remixed Revisited (3 CD Box Set) - CD",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "image": "https://i5.walmartimages.com/asr/e05a8190-e14a-4b2d-a4f7-7ca0125946bd.672848bbb355aa610f5264180adbc880.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                "userName": "abc",
                "rating": 2.5
            }
        ]
    }

    return (
        <div className='tradeContainer col-lg-12 col-sm-12 col-xs-12 col-md-12'>
                {
                    tradeList.trades.map((data: any, key: number) => {
                        return (
                            <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 tradeList'>
                                <div className='cardContainer' style={{backgroundImage:`url(${data.image})`}}>
                                    <div className='tradeBanner'>
                                    </div>
                                </div>
                                <span className='tradeTitle' data-tip data-for={'tradeTitle_' + key} data-class='reactTooltipStyle'>{data.name}</span>
                                <ReactTooltip id={'tradeTitle_' + key} place='bottom' effect='solid'>{data.name}</ReactTooltip>

                            </div>
                        )
                    })
                }
        </div >
    );
}


export default Trades;