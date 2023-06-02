import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";

const SidebarChat = ({ addNewChat }) => {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter the name for the chat room");
        if (roomName) {
            // Perform logic to create a new chat room in the database
            // Example: Make an API request to create the chat room
            // axios.post("/api/chatRooms", { roomName })
            //     .then(response => {
            //         // Handle successful creation
            //     })
            //     .catch(error => {
            //         // Handle error
            //     });
        }
    };

    const sidebarChatClassName = `sidebarChat ${
        addNewChat ? "addNewChat" : ""
    }`;

    return (
        <div
            onClick={addNewChat ? createChat : null}
            className={sidebarChatClassName}
        >
            {addNewChat ? (
                <h2>Add New Chat</h2>
            ) : (
                <>
                    <Avatar
                        src={`https://api.dicebear.com/api/human/${seed}.svg`}
                    />
                    <div className="sidebarChat__info">
                        <h2>Room name</h2>
                        <p>This is the last message</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(SidebarChat);
