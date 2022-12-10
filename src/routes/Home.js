import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { 
    collection, 
    addDoc, 
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc") //firebase collection에 순서대로(내림차) 쌓이게끔 하기위해
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    },[])
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
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
            <div>
                {nweets.map((nweet) => 
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>)}
            </div>
        </div>
    )
}

export default Home;