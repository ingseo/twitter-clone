import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach(document => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets(prev => [nweetObject, ...prev]) 
        });
    }
    useEffect(() => {
        getNweets();
    },[])
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
    console.log(nweets);
    
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
            <div>
                {nweets.map(nweet => 
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>)}
            </div>
        </div>
    )
}

export default Home;