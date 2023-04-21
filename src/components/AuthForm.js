import React, {useState} from "react";
import { authService } from "fBase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
} from 'firebase/auth';
import AuthBtn from "components/AuthBtn";
import Contact from "components/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import 'style/scss/popup.scss'

const AuthForm = ({popupType}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(popupType);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const{target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount){ //newAccount == true
                data = await createUserWithEmailAndPassword(
                    authService, email, password
                )
            } else {
                data = await signInWithEmailAndPassword(
                    authService, email, password
                )
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
        
    }

    const toggleAccount = () => setNewAccount((prev) => !prev) //현재의 값과 반대되는 것을 리턴
    
    return (
        <div className="popup">
            <div className="title">
                <FontAwesomeIcon icon={faTwitter} />
                <h1>{newAccount ? "지금 트위터에 가입하세요" : "트위터에 로그인하기"}</h1>
            </div>
            <div className="btnGroup">
                <AuthBtn />
                <div className="line">
                    <span/><p>또는</p><span/>
                </div>
                <form className="container" onSubmit={onSubmit}>
                    <input 
                        className="authInput"
                        name = "email"
                        type="email" 
                        placeholder="이메일 주소" 
                        required 
                        value={email} 
                        onChange={onChange}
                    />
                    <input 
                        className="authInput"
                        name = "password"
                        type="password" 
                        placeholder="비밀번호" 
                        required 
                        value={password}
                        onChange={onChange}
                    />
                    <input 
                        className="authInput authSubmit"
                        type="submit" 
                        value={newAccount ? "계정 만들기" : "로그인"} />
                    {error && <span className="authError">{error}</span>}
                </form>
            </div>
            {newAccount ? <Contact /> : ""}
            <div className="toggleAccount">
                {newAccount ? "이미 계정이 있으신가요?" : "계정이 없으신가요? "}
                <span className="authSwitch" onClick={toggleAccount}>
                    {newAccount ? "로그인" : "가입하기"}
                </span>
            </div>
            
        </div>
    )
}
export default AuthForm;