import React from "react";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SideBarChat from "./sidebarChat";
import img from "./../img/Photo_Kanishk.jpg";

export default function sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={img} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
            </div>
        </div>
    );
}
