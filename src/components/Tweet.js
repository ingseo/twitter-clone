import React from "react"; 

const Tweet = ({tweetObj}) => (
    <div>
        <h4>{tweetObj.text}</h4>
        <span>{new Date(tweetObj.createdAt).toLocaleString()}</span>
        <button>Delete tweet</button>
    </div>
)

export default Tweet;