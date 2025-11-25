'use client';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

export default function WelcomePage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: '#f0fdf0', // Light green background
            color: '#555',
            textAlign: 'center',
            padding: '20px',
            position: 'relative', // Crucial for positioning background elements
            overflow: 'hidden' // Hides bubbles that extend past the edge
        }}>

            {/* Background Decorative Elements (Bubbles and Icons) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4 }}>
                {/* Large Chat Bubbles */}
                <div style={{ position: 'absolute', top: '10%', left: '15%', transform: 'scale(2.5)', color: '#d0f0c0' }}>
                    <ChatBubbleOutlineIcon style={{ fontSize: '100px' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '15%', right: '10%', transform: 'scale(3)', color: '#d0f0c0' }}>
                    <MessageOutlinedIcon style={{ fontSize: '100px' }} />
                </div>

                {/* Smaller, lighter bubbles */}
                <div style={{ position: 'absolute', top: '40%', right: '30%', width: '30px', height: '30px', backgroundColor: '#e9f5e9', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '30%', left: '25%', width: '50px', height: '50px', backgroundColor: '#e9f5e9', borderRadius: '50%' }}></div>

                {/* Add Friend Icon */}
                <div style={{ position: 'absolute', top: '65%', left: '10%', transform: 'scale(1.5)', color: '#c5e3b5' }}>
                    <PersonAddAltOutlinedIcon style={{ fontSize: '80px' }} />
                </div>
            </div>

            {/* Main Content Container (ensures text is above background elements) */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", color: "#333" }}>
                    Welcome to the Cool Chat
                </h1>
                <p style={{ fontSize: "1.2rem", marginTop: "10px", color: "#666" }}>
                    Please select a friend from the list on the left to start chatting.
                </p>
            </div>
        </div>
    );
}
