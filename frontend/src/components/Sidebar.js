import React, { useState, useCallback } from "react";
import "./Sidebar.css";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SideBarChat from "./SidebarChat";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import img from "./../img/Photo_Kanishk.jpg";

const Sidebar = ({ Mode }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(Mode);

    const handleMenuOpen = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleAvatarClick = useCallback(() => {
        setProfileOpen((prevProfileOpen) => !prevProfileOpen);
    }, []);

    const handleLogout = useCallback(() => {
        // Perform logout logic
    }, []);

    const handleDarkModeToggle = useCallback(() => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    }, []);

    const MemoizedMenu = React.memo(() => (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleDarkModeToggle}>
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    ));

    const MemoizedSideBarChat = React.memo(SideBarChat);

    const sidebarChatsClassName = `sidebar__chats ${darkMode ? "dark" : ""}`;

    return (
        <div className={`sidebar ${darkMode ? "dark" : ""}`}>
            <div className="sidebar__header">
                <Avatar src={img} onClick={handleAvatarClick} />
                <h2 className="side__chat__header">Chats</h2>
                <div className="sidebar__headerRight">
                    <IconButton className="sidebar__icons">
                        <AddCommentRoundedIcon />
                    </IconButton>
                    <IconButton
                        className="sidebar__icons"
                        onClick={handleMenuOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <MemoizedMenu />
                </div>
            </div>
            {profileOpen ? (
                <div className="profile__panel">
                    <div className="profile__header">
                        <h3 className="profile__username">Kanishk Agarwal</h3>
                    </div>
                    <div className="profile__content">
                        {/* Add profile content here */}
                        <p>Profile status</p>
                    </div>
                    <div className="profile__footer">
                        <button
                            onClick={handleLogout}
                            className="profile__logoutButton"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="sidebar__search">
                        <div className="sidebar__searchContainer">
                            <SearchOutlinedIcon />
                            <input
                                type="text"
                                placeholder="Search or start new chat"
                            />
                        </div>
                    </div>
                    <div className={sidebarChatsClassName}>
                        <MemoizedSideBarChat addNewChat />
                        <MemoizedSideBarChat />
                        <MemoizedSideBarChat />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
