import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
    const alertHi = () => {
        alert("뻥이지렁ㅎ");
    };
    return (
        <button className="btn" onClick={alertHi}>
            눌려봐랑~_~
        </button>
    );
}

export default Button;
