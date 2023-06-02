import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import Sidebar from "./components/Sidebar";
import ChatBar from "./components/ChatBar";
import Login from "./pages/Login";
import "./App.css";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("/messages/sync");
                setMessages(response.data);
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        const pusher = new Pusher("b7f1b5763d865c496fdf", {
            cluster: "ap2",
        });

        const channel = pusher.subscribe("messages");
        channel.bind("inserted", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            pusher.unsubscribe("messages");
            pusher.disconnect();
        };
    }, []);

    const handleDarkModeToggle = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    return (
        <div className={`app ${darkMode ? "dark" : ""}`}>
            <div className="app__body">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ChatPage
                                    darkMode={darkMode}
                                    onDarkModeToggle={handleDarkModeToggle}
                                    messages={messages}
                                />
                            }
                        />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

const ChatPage = ({ darkMode, onDarkModeToggle, messages }) => (
    <>
        <Sidebar darkMode={darkMode} onDarkModeToggle={onDarkModeToggle} />
        <ChatBar messages={messages} isDarkMode={darkMode} />
    </>
);

const LoginPage = () => (
    <div>
        <Login />
    </div>
);

export default App;
