import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { 
    collection, 
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import Trend from 'components/Trend';

import 'style/scss/home.scss'

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);  

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

    return(
        <div className="page homePage">
            <div className="timeLine container">
                <h1>홈</h1>
                <TweetFactory userObj={userObj} />
                <div>
                    {tweets.map((tweet) => (
                        <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} /> 
                    ))}
                </div>
            </div>
            <div className='trendContainer container'>
                <Trend />
            </div>
        </div>
    )
}

export default Home;