import { useEffect, useState } from "react";
import { getMessagesByUser } from "../managers/MessagesManager";

export const Messages = ({userId}) => {
    const [conversations, setConversations] = useState({});
    const currentUserID = parseInt(userId); // Assuming you have this from your auth context or state

    useEffect(() => {
        getMessagesByUser().then(data => {
            const groupedConversations = groupMessagesByConversation(data, currentUserID);
            setConversations(groupedConversations);
        });
    }, []);

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

    return (
        <div className="flex flex-col items-center my-4">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            {Object.entries(conversations).map(([conversationKey, conversation]) => (
                <div key={conversationKey} className="w-full max-w-md border rounded-lg overflow-hidden my-4">
                    <h3 className="text-lg font-semibold bg-blue-100 text-center p-2 rounded-t-lg">
                        Conversation with {conversation.otherUser.user.username}
                    </h3>
                    <div className="flex flex-col">
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
                </div>
            ))}
        </div>
    );
};
