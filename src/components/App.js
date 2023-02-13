import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setinit] = useState(false);
  const [userObj, setUserObj] = useState(null); 
  // userObj = 여러곳에서 사용하기 때문에 최상위 컴포넌트에 위치
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if(user){
          setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
          });
        }
        setinit(true)
        // init = false일 경우, router를 숨길 것이기 때문에 true로 바꿔주어야한다.
      }
    );
  }, []) //로그인 여부 확인
  //user를 새로고침해주는 function
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  }
  return( 
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "Initializing..."} 
      {/* <footer>&copy; {new Date().getFullYear()} Twitter</footer> */}
    </> 
  );
}

export default App;
