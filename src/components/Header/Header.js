import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Header.css';


function Header() {
    const [{ basket, user }] = useStateValue();

    const logout = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <nav className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    alt="header-logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={!user ? "/login" : ""} className="header__link">
                    <div onClick={logout} className="header_option">
                        <span className="header_optionLineOne">Hello {user?.email}</span>
                        <span className="header_optionLineTwo">
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to="/" className="header__link">
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">Orders</span>
                    </div>
                </Link>
                <Link to="/" className="header__link">
                    <div className="header_option">
                        <span className="header_optionLineOne">Your</span>
                        <span className="header_optionLineTwo">Prime</span>
                    </div>
                </Link>
                <Link to="/checkout" className="header__link">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwo header_basketcount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header;
