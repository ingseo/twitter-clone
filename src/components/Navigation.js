import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ isLoggedIn, userObj }) => 
<nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
            <Link to="/" style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faTwitter} />
            </Link>
        </li>
        <li>
            {isLoggedIn && 
                <Link
                    to="/profile"
                    style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}
                >
                <FontAwesomeIcon icon={faUser} />
                <span style={{ marginTop: 10 }}>
                    {userObj.displayName
                    ? `${userObj.displayName}의 Profile`
                    : "Profile"}
                </span>
            </Link>
            }
        </li>
    </ul>
</nav>
export default Navigation;