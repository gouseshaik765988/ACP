'use client';
import { Suspense, useState } from 'react';
// Assuming these paths are correct relative to the current file location
import HomePageContent from '../HomePageContent/page';
import ChatPageContent from '../chat/page';
import WelcomePage from '../component/blankchat'; // Assuming path is correct

export default function HomePage() {
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

    const handleFriendSelect = (friendName: string) => {
        setSelectedFriend(friendName);
    };

    return (
        // Outer container for the full layout
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

            {/* Container for the 30% width Home Page Content */}
            <div style={{
                width: '30%',
                overflowY: 'auto',
                // --- ADDED DIVIDER STYLE HERE ---
                borderRight: '1px solid #ccc'
                // --------------------------------
            }}>
                <Suspense fallback={<div>Loading Home Page Content...</div>}>
                    <HomePageContent onFriendSelect={handleFriendSelect} selectedFriend={selectedFriend} />
                </Suspense>
            </div>

            {/* Container for the 70% width Chat Area */}
            <div style={{ width: '70%', overflow: 'hidden' }}>
                <Suspense fallback={<div>Loading...</div>}>

                    {selectedFriend ? (
                        <ChatPageContent friendName={selectedFriend} />
                    ) : (
                        <WelcomePage />
                    )}
                </Suspense>
            </div>

        </div>
    );
}
