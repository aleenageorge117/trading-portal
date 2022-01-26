import React from 'react';

// SCSS
import './Header.scss';

const Header = () => {

    let userLoggedIn: boolean = false;

    return (
        <div>
            <div className='headerContainer col-lg-12 col-md-12 col-sm-12 row verticalAlignCenter'>
                {/* <div className=''> */}
                    <div className='logoContainer verticalAlignCenter col-lg-3 col-md-12 col-sm-12 displayFlex'>
                        <img className='mainLogo' height='80' width='80' src={require(`../../assets/images/logo.png`)} />
                        <img className='mainLogoOverlay' height='30' width='30' src={require(`../../assets/images/logoOverlay.png`)} />
                        <span className='logoText'>CD Xchange</span>
                    </div>
                    <div className='col-lg-9 col-md-12 col-sm-12 textAlignRight'>
                        <input type='text' className='searchIcon textInput' placeholder='Search ...' />
                        {
                            userLoggedIn ? 
                            (<button className='userIcon btn'>A</button>)
                            : (<button className='primaryBtn btn'>Sign In</button>)
                        }                    
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}


export default Header;  