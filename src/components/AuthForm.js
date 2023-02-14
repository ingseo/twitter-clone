import React, {useState} from "react";
import { authService } from "fBase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
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
        <>
            <form onSubmit={onSubmit}>
                <input 
                    name = "email"
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={onChange}
                />
                <input 
                    name = "password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Creat Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
        </>
    )
}
export default AuthForm;