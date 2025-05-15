import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';


import { ChannelListContainer, ChannelContainer, Auth, VideoCallPage } from './components';
import UserProfilePage from './components/UserProfilePage';
import 'stream-chat-react/dist/css/index.css';
import './App.css';
import DatabasePage from './components/DatabasePage';

const cookies = new Cookies();
const apiKey = 'rjf6c3xpy6qy';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken);
}

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!authToken) return <Auth />;

    return (
        <Router>
            <div className="app__wrapper">
                <Chat client={client} theme="team light">
                    <Switch>
                        <Route path="/profile">
                            <UserProfilePage />
                        </Route>

                        <Route path="/video-call">
                            <VideoCallPage />
                        </Route>
                        <Route path="/database">
                            <DatabasePage />
                        </Route>
                        <Route path="/">
                            <ChannelListContainer 
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                            />
                            <ChannelContainer 
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                createType={createType}
                            />
                        </Route>
                    </Switch>
                </Chat>
            </div>
        </Router>
    );
}

export default App;
