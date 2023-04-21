import React from 'react'
import { authService } from "fBase";
import { 
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function AuthBtn(props) {
    const onSocialClick = async(event) => {
        const {
            target: { name }
        } = event; //es6문법
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }  

    return (
        <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
                Google 계정 이용하기 <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className="authBtn">
                Github 계정 이용하기 <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    )
}
