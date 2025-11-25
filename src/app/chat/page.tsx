"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootState } from '@/store/store';
type Message = {
    sender: string;
    receiver: string;
    content: string;
    timestamp?: string;
};

// Removed dynamic/fetchCache exports as they apply to Next.js data fetching, not rendering logic.

export default function ChatPageContent({ friendName: friend }: { friendName: string }) {
    const user = useSelector((state: RootState) => state.user);
    const loggeduser = user?.username ?? '';
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [disable, setDisable] = useState(false);
    // --------------------- FETCH MESSAGES ----------------------
    useEffect(() => {
        if (!loggeduser || !friend) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/getMessage?user=${loggeduser}&friend=${friend}`, {
                    cache: 'no-store',
                });
                if (!res.ok) throw new Error('Fetch failed');
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error('Fetching error:', err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 4000);
        return () => clearInterval(interval);
    }, [loggeduser, friend]);

    // ----------------------- SEND MESSAGE -----------------------
    const sendMessage = async () => {
        if (!text.trim() || sending) return;
        setDisable(true);
        setSending(true);
        try {
            const res = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: loggeduser,
                    receiver: friend,
                    content: text,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setMessages((prev) => [
                    ...prev,
                    { sender: loggeduser, receiver: friend, content: text, timestamp: new Date().toISOString() },
                ]);
                setText('');
                setDisable(false);
            }
        } catch (err) {
            console.error('Send error:', err);
            setDisable(false);
        }
        setSending(false);
        setDisable(false);
    };

    // -------------------- SCROLL TO BOTTOM ----------------------
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <>

            <div className="d-flex flex-column h-100 bg-f0fdf0 text-f6fff6">

                <div className="d-flex align-items-center px-3 py-2 border-bottom shadow-sm" style={{ zIndex: 10, backgroundColor: '#f0fdf0' }}>
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: '40px', height: '40px', fontWeight: 700, border: '1px solid gray' }}
                    >
                        {friend[0]?.toUpperCase()}
                    </div>
                    <div>
                        <div className="fw-bold" style={{ fontSize: "18px" }}>{friend}</div>
                        <small className="text-success fw-bold">Online</small>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: '#f0fdf0' }}>
                    {messages.length === 0 ? (
                        <div className="text-center text-muted mt-3">
                            <p>We believe that private communication should be just that—private. </p> <br></br>
                            <p>A foundational quote often associated with secure messaging services emphasizing the importance of end-to-end encryption.</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const mine = msg.sender === loggeduser;
                            return (
                                <div
                                    key={index}
                                    className={`d-flex mb-2 ${mine ? 'justify-content-end' : 'justify-content-start'}`}
                                >
                                    <div
                                        className="d-flex align-items-end rounded-3 px-2 py-1"
                                        style={{
                                            maxWidth: '75%',
                                            backgroundColor: mine ? '#0d6efd' : '#e9ecef',
                                            color: mine ? 'white' : 'black',
                                        }}
                                    >
                                        <span style={{ fontSize: '18px', marginRight: '6px', wordBreak: 'break-word' }}>
                                            {msg.content}
                                        </span>

                                        <span style={{ fontSize: '10px', opacity: 0.7 }}>
                                            {new Date(msg.timestamp || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* INPUT */}
                <div className="d-flex align-items-center px-3 py-3   shadow-sm position-relative" style={{ backgroundColor: '#f0fdf0' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="form-control"
                        style={{

                            color: 'black',

                            borderRadius: '25px',
                            padding: '12px 55px 12px 18px',
                            fontSize: '20px',
                            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                        }}
                    />

                    <button
                        disabled={disable}
                        onClick={sendMessage}
                        style={{
                            position: 'absolute',
                            right: '22px',
                            background: 'lightgreen',
                            border: 'none',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <SendRoundedIcon style={{ fontSize: '22px', color: 'black' }} />
                    </button>
                </div>
            </div>

        </>
    );
}