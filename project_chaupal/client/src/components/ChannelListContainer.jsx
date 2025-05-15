import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Logo from '../assets/logomain.png';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '../assets/logout.png'
import DatabaseIcon from '../assets/database.jpg';
import ProfileIcon from '../assets/profile.png';


const cookies = new Cookies();

const SideBar = ({ logout }) => {
    const history = useHistory(); // Correct hook for react-router v5

    const goToDatabase = () => {
        history.push('/database'); // Correct way to navigate in v5
    };

    return (
        <div className="channel-list__sidebar">
            {/* Profile Icon */}
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={() => history.push("/profile")}>
                    <img src={ProfileIcon} alt="Profile" width="30" />
                </div>
            </div>
            
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
            {/* <button onClick={() => history.push("/profile")}>My Profile</button> */}

        </div>
    );
};


const CompanyHeader = () => (
    <div className="channel-list__header">
        <img src={Logo} alt="Logo" className="channel-list_header_logo"/>
        
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                
            </div>
        </>
    );
}

// Update ChannelListContainer.jsx
const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { client } = useChatContext();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    };

    return (
        <>
            <button className="mobile-toggle-sidebar" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`channel-list__container ${isOpen ? 'active' : ''}`}>
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                />
            </div>

            {/* Move SideBar into sidebar-overlay */}
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}>
                <SideBar logout={logout} />
            </div>
        </>
    );
};

export default ChannelListContainer;
