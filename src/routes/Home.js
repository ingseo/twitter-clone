import { dbService } from "fBase";
import React, { useEffect, useState, useRef } from "react";
import { 
    collection, 
    addDoc, 
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(() => {
        const q = query(
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc") //firebase collection에 순서대로(내림차) 쌓이게끔 하기위해
        );
        onSnapshot(q, (snapshot) => {
            const tweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArr);
        });
    },[])
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "tweets"), {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setTweet("");
    }
    const onChange = (event) => {
        const {
            target:{ value },
        } = event; //=from event. event 안의 target안의 value 
        setTweet(value);
    }
    const onfileChange = (event) => {
        const {
            target: { files },
        } = event; //event 안에서 target안으로 가 파일을 받아오는 것을 의미
        const theFile = files[0];
        const reader = new FileReader(); //filereader API
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent; 
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const fileInput = useRef();
    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = null;
    }
    

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={tweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={140} 
                />
                <input type="file" accept="image/*" onChange={onfileChange} ref={fileInput}/>
                <input type="submit" value="tweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Cancel</button>
                    </div>
                )}
                {/* attachment가 있을때만 이미지가 보인다 */}
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} /> 
                ))}
            </div>
        </div>
    )
}

export default Home;