import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navber.css";
import { navItems } from "./NavItems";
import Button from "./Button";
import Dropdown from "./Dropdown";
import ing from "../img/down.jpg";

function Navbar() {
    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <img className="mainimg" src={ing} alt="mainImg" />
                </Link>
                <ul className="nav-items">
                    {navItems.map((item) => {
                        if (item.title === "구별로 보기") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setDropdown(true)}
                                    onMouseLeave={() => setDropdown(false)}
                                >
                                    <p>{item.title}</p>
                                    {dropdown && <Dropdown />}
                                </li>
                            );
                        }
                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}> {item.title} </Link>
                            </li>
                        );
                    })}
                </ul>
                <Button />
            </nav>
        </>
    );
}

export default Navbar;
