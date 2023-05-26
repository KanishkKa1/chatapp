import React from "react";
import "./sidebarChat.css";
import { Avatar } from "@mui/material";

export default function sidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    );
}
