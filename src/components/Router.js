import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({ isLoggedIn }) => {
    //Router가 하나의 용도로만 쓰여야하기때문에 useState는 App.js로 이동. Routs만 보이게 한다.
    return(
        <Router>
            <Switch>
                {/* 로그인이 되어있다면, home으로, 아니라면 Auth로 이동 */}
                {isLoggedIn ? (
                    <> {/* Fragment = 많은 요소들을 render하고 싶을 때 사용. 부모가 없을때 */}
                        <Route exact path="/"> 
                        {/* path = 이동하는 주소경로. 이 경우 경로이동없이 자식컴포넌트인 Home을 띄운다. */}
                            <Home />
                        </Route>
                    </> 
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;