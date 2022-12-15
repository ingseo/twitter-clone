import React from "react"; 

const Tweet = ({ tweetObj, isOwner }) => {
    (
        <div>
            <h4>{tweetObj.text}</h4>
            <span>{new Date(tweetObj.createdAt).toLocaleString()}</span>
            {isOwner && (
                <>
                    <button>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    )
}

export default Tweet;