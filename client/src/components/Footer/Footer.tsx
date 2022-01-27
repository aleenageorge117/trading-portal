import React from 'react';

// SCSS
import "./Footer.scss";

const Footer = () => {
    const d = new Date();
    let currentYear = d.getFullYear();

    return (
        <div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 footerContainer row verticalAlignCenter'>
                <p className="floatLeft">Copyright © {currentYear} - CD Xchange</p>
                <p className="floatRight">Need any help, please mail us at:&nbsp;
                    <b>
                    <a className="link">mail@cdxchange.com</a>
                    </b>
                </p>
            </div>
        </div>
    );
}


export default Footer;