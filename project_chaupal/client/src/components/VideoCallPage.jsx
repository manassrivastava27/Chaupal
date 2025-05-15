import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const VideoCallPage = () => {
    const history = useHistory();
    const roomName = "NGO-Chat-VideoCall"; // Unique room name for the call
    const domain = "meet.jit.si"; // Jitsi public server

    useEffect(() => {
        const loadJitsiScript = () => {
            const script = document.createElement('script');
            script.src = 'https://meet.jit.si/external_api.js';
            script.async = true;
            script.onload = initializeJitsi;
            document.body.appendChild(script);
        };

        const initializeJitsi = () => {
            if (window.JitsiMeetExternalAPI) {
                const options = {
                    roomName,
                    parentNode: document.getElementById('jitsi-container'),
                    width: '100%',
                    height: '100%',
                    configOverwrite: {
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                    },
                };

                new window.JitsiMeetExternalAPI(domain, options);
            } else {
                console.error("Jitsi Meet API not loaded.");
            }
        };

        loadJitsiScript();
    }, []);

    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "10px", textAlign: "center", background: "#007bff", color: "white", fontSize: "18px" }}>
            <button 
    onClick={() => history.push("/")} 
    style={{
        backgroundColor: "#007bff", 
        color: "#fff", 
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        textDecoration: "underline" // Underline the text
    }}
>
    Go Back to Chat
</button>

                <span style={{ marginLeft: "20px" }}></span>
            </div>
            <div id="jitsi-container" style={{ flex: 1 }}></div>
        </div>
    );
};

export default VideoCallPage;
