import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import DatabaseIcon from '../assets/database.jpg';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => {
    const history = useHistory();

    const goToDatabase = () => {
        history.push('/database');  // Navigate to /database route
    };

    return (
        <div className="channel-list__sidebar">
            {/* Database Icon */}
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={goToDatabase}>
                    <img src={DatabaseIcon} alt="Database" width="30" />
                </div>
            </div>

            {/* Logout Icon */}
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={logout}>
                    <img src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
        </div>
    );
};

export default SideBar;
