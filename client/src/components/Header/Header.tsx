import React, { useEffect, useState } from 'react';
import { Link, Router, useNavigate } from 'react-router-dom';
import Button from '../Form/Button';

// SCSS
import './Header.scss';

const Header = () => {

    const navigate = useNavigate();

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    let loginInButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Log In",
        "name": "signIn",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn"
    };

    
    let loginOutButtonProps = {
        "field": "button",
        "type": "submit",
        "title": "Log Out",
        "name": "signOut",
        "placeholder": "",
        "required": false,
        "maxLength": 0,
        "className": "primaryBtn"
    };

    let handleLogIn = (event: any) => {
        navigate('/login')                  
    }

    let handleLogOut = (event: any) => {
        fetch('/user')
            .then((res: any) => res.json())
            .then((data: any) => {
                if(!data.error) {
                    setUserLoggedIn(false);
                    localStorage.clear(); 
                    navigate('/')
                    window.location.reload();

                }
            });
    }

    useEffect(() => {
        setTimeout(() => {
            if(localStorage.getItem('userId')) 
                setUserLoggedIn(true)
            else 
                setUserLoggedIn(false)

        }, 0);
    }, [])
    
    useEffect(() => {
        setTimeout(() => {
            if(localStorage.getItem('userId')) 
                setUserLoggedIn(true)
            else 
                setUserLoggedIn(false)
        }, 0);
    }, [navigate])

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
                            {
                                userLoggedIn ? 
                                (
                                    <div className='displayContents'>
                                        <Link to='/create'><span>Create Trade</span></Link>
                                        <span className='verticalLine'></span>
                                        <Link to='/profile'><span>Profile</span></Link>
                                        <span className='verticalLine'></span>  
                                        <Button btnClick={() => handleLogOut} data={loginOutButtonProps} />
                                    </div>
                                )
                                : (<Button btnClick={() => handleLogIn} data={loginInButtonProps} />)
                            }
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}


export default Header;  