import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// SCSS
import "./DisplayCards.scss";

const DisplayCards = (props: any) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <Link to={'/trade-detail/'+props.data.id}>
            <div className='tradeCardContainer' onMouseEnter={() => {setIsShown(true)}}  onMouseLeave={() => {setIsShown(false)}} style={{backgroundImage:`url(${props.data.image})`}}>
                {
                    isShown ? (<div className='tradeItBtn' id={props.data.id}>Trade it</div>) : null
                }
            </div>
        </Link>
    );
}


export default DisplayCards;