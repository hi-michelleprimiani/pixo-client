import { useEffect, useRef, useState } from "react";
import { getMessagesByUser, createMessage } from "../managers/MessagesManager";
import React from 'react';
import './messages.css';


export const Messages = ({ userId }) => {
    const [conversations, setConversations] = useState({});
    const [selectedConversationKey, setSelectedConversationKey] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const currentUserID = parseInt(userId);
    const messagesEndRef = useRef(null);


    useEffect(() => {
        getMessagesByUser().then(data => {
            const groupedConversations = groupMessagesByConversation(data, currentUserID);
            setConversations(groupedConversations);
        });
    }, [userId]);

    useEffect(() => {
        scrollToBottom();
    }, [conversations]);

    const groupMessagesByConversation = (messages, userID) => {
        return messages.reduce((acc, message) => {
            const otherUserID = message.sender.id === userID ? message.receiver.id : message.sender.id;
            const conversationKey = `conversation-with-${otherUserID}`;

            if (!acc[conversationKey]) {
                acc[conversationKey] = {
                    otherUser: message.sender.id === userID ? message.receiver : message.sender,
                    messages: []
                };
            }

            acc[conversationKey].messages.push(message);

            return acc;
        }, {});
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSelectConversation = (conversationKey) => {
        setSelectedConversationKey(conversationKey);
    };

    const handleSendMessage = async () => {
        if (selectedConversationKey && messageInput.trim() !== "") {
            const receiverId = selectedConversationKey.split('-').pop();
            const newMessage = {
                sender: currentUserID,
                receiver: parseInt(receiverId),
                text: messageInput,
            };

            const response = await createMessage(newMessage);
            if (response.ok) {
                const createdMessage = await response.json();
                const updatedConversations = { ...conversations };
                updatedConversations[selectedConversationKey].messages.push(createdMessage);
                setConversations(updatedConversations);
                setMessageInput('');
            } else {
                console.error("Failed to send message");
            }
        }
    };
    return (
        <div className="flex flex-col items-center my-4">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            {Object.entries(conversations).map(([conversationKey, conversation]) => (
                <div key={conversationKey} className={`w-full max-w-md border rounded-lg overflow-hidden my-4 ${selectedConversationKey === conversationKey ? 'bg-blue-100' : ''}`}>
                    <h3 className="text-lg font-semibold bg-blue-100 text-center p-2 rounded-t-lg" onClick={() => handleSelectConversation(conversationKey)}>
                        Conversation with {conversation.otherUser.user.username}
                    </h3>
                    <div className="flex flex-col max-h-96 overflow-y-auto">
                        {conversation.messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender.id === currentUserID ? 'justify-end' : 'justify-start'} p-2`}
                            >
                                <div className="max-w-2/3 bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm">
                                    <div className="font-semibold">{message.sender.user.full_name}</div>
                                    <p className="text-sm text-gray-700 break-all">{message.text}</p>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {new Date(message.date_time).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedConversationKey === conversationKey && (
                        <div className="p-4 bg-white shadow-lg">
                            <div className="flex gap-4 items-center">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Type a message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                                    onClick={() => handleSendMessage(conversationKey)}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
                    }    