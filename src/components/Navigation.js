import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { 
    faUser,
    faHashtag,
    faGear,
} from "@fortawesome/free-solid-svg-icons";

import "../style/scss/nav.scss"

const Navigation = ({ isLoggedIn, userObj }) => 
<nav>
    <ul>
        <li className="logo">
            <Link to="/">
                <FontAwesomeIcon icon={faTwitter} />
            </Link>
        </li>
        <li>
            <Link to="/">
                <FontAwesomeIcon icon={faHashtag} />
                <span>탐색하기</span>
            </Link>
        </li>
        <li>
            <Link to="/">
                <FontAwesomeIcon icon={faGear} />
                <span>설정</span>
            </Link>
        </li>
        {isLoggedIn && 
        <li>
            <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
                <span>
                    {userObj.displayName
                    ? `${userObj.displayName}의 Profile`
                    : "Profile"}
                </span>
            </Link>
        </li>
        }
    </ul>
</nav>
export default Navigation;