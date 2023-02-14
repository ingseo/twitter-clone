import React, { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "fBase";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
        //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
        if (attachment !== "") {
            //파일 경로 참조 만들기
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            //storage 참조 경로로 파일 업로드 하기
            const response = await uploadString(attachmentRef, attachment, "data_url");
            //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
            attachmentUrl = await getDownloadURL(response.ref);
        }
        //트윗 오브젝트
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        //트윗하기 누르면 tweetObj 형태로 새로운 document 생성하여 tweets 콜렉션에 넣기
        await addDoc(collection(dbService, "tweets"), tweetObj);
        //state 비워서 form 비우기
        setTweet("");
        //파일 미리보기 img src 비워주기
        onClearAttachment("");  
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
        setAttachment("");
        fileInput.current.value = "";
    }

    return (
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
    )
}
export default TweetFactory;