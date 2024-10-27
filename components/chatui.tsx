/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    userName: string;
    roomId: string;
}

export default function ChatInterface({ userName, roomId }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance: Socket = io('https://collaborator-be.onrender.com');

        setSocket(socketInstance);

        socketInstance.on('connect', () => console.log('Connected to server'));
        socketInstance.on('receive_message', (message: Message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && socket) {
            const message: Message = {
                id: messages.length + 1,
                content: newMessage,
                sender: userName,
                timestamp: new Date(),
            };

            socket.emit('send_message', message);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mt-5 mx-auto bg-gray-900 rounded-md">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white font-semibold">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-white text-left">{userName}</h2>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === userName ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                                }`}
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
                                <span className="text-white text-sm">
                                    {/* {message.sender === userName ? `${userName.charAt(0).toUpperCase()}` : 'AI'} */}
                                    {message.sender.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div
                                className={`rounded-lg p-3 ${message.sender === userName
                                    ? 'bg-blue-600 text-white text-left'
                                    : 'bg-gray-700 text-gray-100 text-left'
                                    }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                <span className="text-xs opacity-70 mt-1 block">
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form className="p-4 border-t border-gray-700" onSubmit={sendMessage}>
                <div className="flex items-center space-x-2">
                    <button
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                        title="Attach file"
                        type="button"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <input
                        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <button
                        className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                        type="submit"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}