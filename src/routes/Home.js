import { dbService } from "fBase";
import React, {useState} from "react";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now(),
        });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setNweet("");
    }
    const onChange = (event) => {
        const {
            target:{ value },
        } = event; //=from event. event 안의 target안의 value 
        setNweet(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={nweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={140} 
                />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    )
}

export default Home;