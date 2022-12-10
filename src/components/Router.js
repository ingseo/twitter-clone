import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
    //Router가 하나의 용도로만 쓰여야하기때문에 useState는 App.js로 이동. Routs만 보이게 한다.
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            {/* Navigation이 존재하려면 isLoggedIn이 true여야 한다. */}
            <Switch>
                {/* 로그인이 되어있다면, home으로, 아니라면 Auth로 이동 */}
                {isLoggedIn ? (
                    <> 
                        <Route exact path="/"> 
                            <Home userObj={userObj} /> {/* props 전달 */}
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </> 
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;