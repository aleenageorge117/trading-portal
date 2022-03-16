import React from 'react';
import { Link } from 'react-router-dom';

// SCSS
import "./Footer.scss";

const Footer = () => {
    const d = new Date();
    let currentYear = d.getFullYear();

    return (
        <div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 footerContainer row verticalAlignCenter'>
                <p className="floatLeft">Copyright © {currentYear} - CD Xchange</p>
                <p className="floatRight">
                    <Link to='/about'><span>About Us</span></Link>
                    <span className='verticalLine'></span>
                    <Link to='/contact'><span className='marginRight-30'>Contact</span></Link> 
                    <i className="marginRight-30 fab fa-facebook"></i>
                    <i className="marginRight-30 fab fa-twitter"></i>
                    Need any help, please mail us at:&nbsp;
                    <b>
                    <a className="link">mail@cdxchange.com</a>
                    </b>
                </p>
            </div>
        </div>
    );
}


export default Footer;