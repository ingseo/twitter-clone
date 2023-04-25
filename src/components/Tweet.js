import { dbService, storageService } from "fBase";
import React, { useState } from "react"; 
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        const ok = window.confirm("트윗을 삭제할까요?");
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
        <div className="tweet">
            {editing ? (
                <div className="tweetBox">
                    {isOwner && 
                        <>
                            <form className="tweetEdit" onSubmit={onSubmit}>
                                <input 
                                    className="formInput"
                                    type="text" 
                                    value={newTweet} 
                                    placeholder="무슨 일이 일어나고 있나요?"  
                                    required 
                                    autoFocus
                                    onChange={onChange}
                                />
                                <div className="editBtn">
                                    <input 
                                        className="formBtn"
                                        type="submit"
                                        value="수정하기"
                                    />
                                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                                        취소
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </div>
            ) : (
                <div className="tweetBox">
                    <div className="tweetInfo">
                        <div className="userData">
                            <span className="userName">{tweetObj.creatorName}</span>
                            <span className="date">{new Date(tweetObj.createdAt).toLocaleString()}</span>
                        </div>
                        {isOwner && (
                            <div className="tweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="tweetText">{tweetObj.text}</p>
                    {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
                </div>
            )}
        </div>
    )
}

export default Tweet;