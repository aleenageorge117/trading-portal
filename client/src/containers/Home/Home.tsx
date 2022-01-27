import React from 'react';

// SCSS
import "./Home.scss";

const Home = () => {
    return (
        <div className='homeContainer row'>
            <div className='homeSection col-lg-6 col-sm-12 col-xs-12 col-md-12 row'>
                <div className='cardContainer marginLeft-30'></div>
                <div className='cardContainer marginLeft-30'></div>
            </div>
            <div className='homeSection col-lg-6 col-sm-12 col-xs-12 col-md-12 row'>
                <div className='cardContainer marginRight-30'></div>
            </div>
        </div>
    );
}


export default Home;