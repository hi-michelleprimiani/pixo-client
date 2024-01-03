import { useEffect, useRef, useState } from "react";
import { getMessagesByUser, createMessage } from "../managers/MessagesManager";
import React from "react";
import { Button } from "@radix-ui/themes";

export const Messages = ({ userId }) => {
  const [conversations, setConversations] = useState({});
  const [selectedConversationKey, setSelectedConversationKey] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const currentUserID = parseInt(userId);

  useEffect(() => {
    getMessagesByUser().then((data) => {
      const groupedConversations = groupMessagesByConversation(
        data,
        currentUserID,
      );
      setConversations(groupedConversations);
    });
  }, [userId]);

  const groupMessagesByConversation = (messages, userID) => {
    return messages.reduce((acc, message) => {
      const otherUserID =
        message.sender.id === userID ? message.receiver.id : message.sender.id;
      const conversationKey = `conversation-with-${otherUserID}`;

      if (!acc[conversationKey]) {
        acc[conversationKey] = {
          otherUser:
            message.sender.id === userID ? message.receiver : message.sender,
          messages: [],
        };
      }

      acc[conversationKey].messages.push(message);

      return acc;
    }, {});
  };

  const handleSelectConversation = (conversationKey) => {
    setSelectedConversationKey(conversationKey);
  };

  const handleSendMessage = async () => {
    if (selectedConversationKey && messageInput.trim() !== "") {
      const receiverId = selectedConversationKey.split("-").pop();
      const newMessage = {
        sender: currentUserID,
        receiver: parseInt(receiverId),
        text: messageInput,
      };

      const response = await createMessage(newMessage);
      if (response.ok) {
        const createdMessage = await response.json();
        const updatedConversations = { ...conversations };
        updatedConversations[selectedConversationKey].messages.push(
          createdMessage,
        );
        setConversations(updatedConversations);
        setMessageInput("");
      } else {
        console.error("Failed to send message");
      }
    }
  };


    // Function to handle message deletion
    const handleDeleteMessage = async (messageId) => {
      try {
        const response = await fetch(`http://localhost:8000/messages/${messageId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          // Update state to remove the deleted message
          const updatedConversations = { ...conversations };
          for (const key in updatedConversations) {
            updatedConversations[key].messages = updatedConversations[key].messages.filter(msg => msg.id !== messageId);
          }
          setConversations(updatedConversations);
        } else {
          throw new Error("Failed to delete message");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    };

  return (
    <div className="flex flex-col items-center my-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      {Object.entries(conversations).map(([conversationKey, conversation]) => (
        <div
          key={conversationKey}
          className={`w-full max-w-2xl border rounded-2xl  overflow-hidden my-4 ${
            selectedConversationKey === conversationKey ? "bg-green/10" : ""
          }`}
        >
          <h3
            className="text-lg font-semibold bg-green/30 text-center p-2 rounded-t-lg"
            onClick={() => handleSelectConversation(conversationKey)}
          >
            Conversation with {conversation.otherUser.user.username}
          </h3>
          <div className="flex flex-col max-h-96 overflow-y-auto">
            {conversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender.id === currentUserID
                    ? "justify-end"
                    : "justify-start"
                } p-2`}
              >
                <div className="max-w-2/3 bg-white border border-gray-300 rounded-2xl px-4 py-2 shadow-sm">
                  <div className="font-semibold">
                    {message.sender.user.full_name}
                  </div>

                  <p className="text-sm text-gray-700 break-all">
                    {message.text}
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(message.date_time).toLocaleString()}
                    {message.sender.id === currentUserID && (
                      <Button
                        className="text-red-500 text-sm float-right"
                        onClick={() => handleDeleteMessage(message.id)}
                        variant="ghost"
                        color='red'
                      >
                        Delete
                      </Button>
                    )}
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
                <Button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2"
                  onClick={() => handleSendMessage(conversationKey)}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
