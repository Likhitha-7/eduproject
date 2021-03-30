import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header =(props) => {
    return(
        <>
           <div id="header">
                    <Link className="logo" to="/">Eatoo!</Link>
                    <span className="leftopt" style={{float:'right'}}></span>
                   
            </div>
        </>
    )
}

export default Header;