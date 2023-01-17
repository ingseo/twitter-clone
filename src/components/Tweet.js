import { dbService, storageService } from "fBase";
import React, { useState } from "react"; 
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";

const Tweet = ({ tweetObj, isOwner }) => {
    const tweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);

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
        await updateDoc(tweetTextRef, {
            text: newTweet,
        });
        toggleEditing();
    }

    

    //delete
    //삭제하려는 이미지 파일 가리키는 ref 생성하기(tweetObj의 attachmentUrl)
    const desertRef = ref(storageService, tweetObj.attachmentUrl);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delelte this tweet?");
        if(ok){
            try {
                //해당하는 트윗(텍스트) 파이어스토어에서 삭제
                await deleteDoc(tweetTextRef);
                //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
                if (tweetObj.attachmentUrl !== "") {
                    await deleteObject(desertRef);
                }
            } catch (error) {
                window.alert("트윗을 삭제하는 데 실패했습니다!");
            }
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