import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Form/Button';

// SCSS
import './Header.scss';

const Header = () => {

    let userLoggedIn: boolean = false;
    let buttonProps = {
        "field": "button",
        "type": "submit",
        "title": "Sign In",
        "name": "signIn",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn"
    };

    let tradeListButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "View Trades",
        "name": "viewTrades",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": ""
    };

    let createTradeButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Create Trade",
        "name": "createTrades",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "marginLeft-30"
    };

    return (
        <div>
            <div className='headerContainer col-lg-12 col-md-12 col-sm-12 col-xs-12 row verticalAlignCenter'>
                <div className='logoContainer verticalAlignCenter col-lg-3 col-md-12 col-sm-12 col-xs-12 displayFlex'>
                    <Link to="/" className='displayContents'>
                        <img className='mainLogo' height='80' width='80' src={require(`../../assets/images/logo.png`)} />
                        <img className='mainLogoOverlay' height='30' width='30' src={require(`../../assets/images/logoOverlay.png`)} />
                        <span className='logoText'>CD Xchange</span>
                    </Link>
                </div>
                <div className='col-lg-9 col-md-12 col-sm-12 textAlignRight displayBlock'>
                    <input type='text' className='searchIcon textInput' placeholder='Search ...' />
                    <div>
                        
                        <div className='col-lg-12 col-sm-12 col-xs-12 col-md-12 row'>                
                            <Link to='/trades'><span>Explore CD's</span></Link> 
                            <span className='verticalLine'></span>
                            <Link to='/create'><span>Create Trade</span></Link>
                            <span className='verticalLine'></span>
                            {
                                userLoggedIn ? 
                                (<button className='userIcon btn'>A</button>)
                                : (<Button btnClick={(event: any) => {}} data={buttonProps} />)
                            }
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}


export default Header;  