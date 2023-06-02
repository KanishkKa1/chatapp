import React from "react";
import "./login.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
    const signIn = () => {};
    return (
        <div className="login">
            <div>
                <Link to="/">ChatApp</Link>
            </div>
            <div className="login__container">
                <img alt="" />
                <div className="login__text">
                    <h1>Sign in to ChatApp</h1>
                </div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    );
}
