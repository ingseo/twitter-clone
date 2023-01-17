import { dbService } from "fBase";
import React, { useState } from "react"; 
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Tweet = ({ tweetObj, isOwner }) => {
    const TweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);

    //update(edit)
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const toggleEditing = () => setEditing(prev => !prev);
    const editCancel = () => {
        toggleEditing();
        setNewTweet(tweetObj.text);
    }
    const onChange = (event) => {
        const {
            target : { value },
        } = event
        setNewTweet(value);
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        await updateDoc(TweetTextRef, {
            text: newTweet,
        });
        toggleEditing();
    }

    //delete
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delelte this tweet?");
        if(ok){
            await deleteDoc(TweetTextRef);
        }
    }

    return (
        <div>
            {editing ? (
                <>
                    {isOwner && 
                        <>
                            <form onSubmit={onSubmit}>
                                <input 
                                    type="text" 
                                    value={newTweet} 
                                    placeholder="What's on your mind?"  
                                    required 
                                    onChange={onChange}
                                />
                                <input 
                                    type="submit"
                                    value="Update Tweet"
                                />
                            </form>
                            <button onClick={editCancel}>Cancel</button>
                        </>
                    }
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img src={tweetObj.attachmentUrl} width="300px" height="300px" />
                    )}
                    <span>{new Date(tweetObj.createdAt).toLocaleString()}</span>
                    {isOwner && (
                        <>
                            <button onClick={toggleEditing}>Edit</button>
                            <button onClick={onDeleteClick}>Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Tweet;