import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';

function App() {
  const [init, setinit] = useState(false);//아직은 초기화X
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if(user) {
          setIsLoggedIn(true);
          setUserObj(user);
        } else {
          setIsLoggedIn(false);
        }
        setinit(true)
        // init = false일 경우, router를 숨길 것이기 때문에 true로 바꿔주어야한다.
      }
    );
  }, []) //로그인 여부 확인
  return( 
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."} 
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </> 
  );
  //App()안에 <AppRouter>를 사용하는 이유 = AppRouter 외에 다른 것을 더 사용할 수 있게끔 분리시킨 것이다.
}

export default App;
