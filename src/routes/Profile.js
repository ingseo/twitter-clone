import { authService, dbService } from "fBase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";

//1. 로그인한 유저 정보 prop으로 받기
const Profile = ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    //2. 내 tweets 얻는 function 생성
    const getMyTweets = async() => {
    //3. 트윗 불러오기
        //3-1. dbService의 컬렉션 중 "tweets" Docs에서 userObj의 uid와 
        //동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", `${userObj.uid}`),
            orderBy("createdAt", "desc")
        );
        //3-2. getDocs()메서드로 쿼리 결과 값 가져오기
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };
    //4. 내 tweets 얻는 function 호출
    useEffect(() => {
        getMyTweets();
    },[]);

    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile;