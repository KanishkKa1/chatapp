import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from "@mui/icons-material/Search";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBar.css";

export default function ChatBar({ isDarkMode }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showSendIcon, setShowSendIcon] = useState(false);
    const [groupDescriptionVisible, setGroupDescriptionVisible] =
        useState(false);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("/messages/sync");
                setMessages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const options = { hour12: false, hour: "numeric", minute: "numeric" };
        const time = currentDate.toLocaleTimeString("en-US", options);

        try {
            await axios.post("/messages/new", {
                message: input,
                name: "Kanishk",
                timestamp: time,
                received: true,
            });

            setInput("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);

        if (e.target.value.trim() === "") {
            setShowSendIcon(false);
        } else {
            setShowSendIcon(true);
        }
    };

    const handleAvatarClick = () => {
        setGroupDescriptionVisible(!groupDescriptionVisible);
    };

    return (
        <div className={`chatBar ${isDarkMode ? "dark" : ""}`}>
            <div className="chatBar__header">
                <Avatar
                    src={`https://api.dicebear.com/api/human/${seed}.svg`}
                    onClick={handleAvatarClick}
                />
                <div className="chatBar__headerInfo">
                    <h3>Room Name</h3>
                    <p>
                        Last seen at{" "}
                        {messages.length > 0
                            ? messages[messages.length - 1].timestamp
                            : ""}
                    </p>
                </div>
                <div className="chatBar__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {groupDescriptionVisible && (
                <div className="groupDescriptionDropdown">
                    <h4 className="groupDescriptionDropdown__heading">
                        Group Description
                    </h4>
                    <p className="groupDescriptionDropdown__content">
                        This is the description of the group.
                    </p>
                    <p className="groupDescriptionDropdown__content">
                        Additional information can be added here.
                    </p>
                </div>
            )}
            <div className="chatBar__body">
                {messages.map((message) => (
                    <p
                        key={message._id}
                        className={`chatBar__message ${
                            message.received && "chatBar__received"
                        }`}
                    >
                        <span className="chatBar__name">{message.name}</span>
                        {message.message}
                        <span className="chatBar__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chatBar__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <form onSubmit={sendMessage} className="chatBar__inputForm">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message"
                        type="text"
                    />

                    {showSendIcon ? (
                        <IconButton
                            type="submit"
                            className="chatBar__send__button"
                        >
                            <SendIcon />
                        </IconButton>
                    ) : (
                        <IconButton className="chatBar__send__button">
                            <MicIcon />
                        </IconButton>
                    )}
                </form>
            </div>
        </div>
    );
}
