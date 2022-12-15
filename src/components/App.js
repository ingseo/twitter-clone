import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';

function App() {
  const [init, setinit] = useState(false);
  const [userObj, setUserObj] = useState(null); 
  // userObj = 여러곳에서 사용하기 때문에 최상위 컴포넌트에 위치
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        user? setUserObj(user) : setUserObj(null);
        setinit(true)
        // init = false일 경우, router를 숨길 것이기 때문에 true로 바꿔주어야한다.
      }
    );
  }, []) //로그인 여부 확인
  return( 
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."} 
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </> 
  );
}

export default App;
