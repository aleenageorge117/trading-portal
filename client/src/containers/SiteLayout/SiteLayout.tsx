import React from 'react';

//COMPONENTS
import RouteLists from '../../routes/RouteLists';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// SCSS
import "./SiteLayout.scss";

const SiteLayout = () => {
    return (
        <div className=''>
            <Header />
            <div className='routeDisplayArea col-lg-12'>
                <RouteLists />
            </div>
            <Footer />
        </div>
    );
}


export default SiteLayout;