import React, {useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //로그인 여부 확인
  return( 
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </> 
  );
  //App()안에 <AppRouter>를 사용하는 이유 = AppRouter 외에 다른 것을 더 사용할 수 있게끔 분리시킨 것이다.
}

export default App;
