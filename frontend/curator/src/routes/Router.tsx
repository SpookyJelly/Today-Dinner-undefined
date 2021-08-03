import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestPage from "@pages/TestPage";
import Main from "@pages/Main";
import Profile from "@pages/Profile";
import Authlogin from "@pages/Authlogin";
import Appbar from "@components/Appbar";
import { useSelector } from "react-redux";

import { RootState } from "modules";
import Articles from "../Articles/route/Articles";
//App.tsx에서 내려주는 props들의 타입 여기서 지정
interface BRouterProps {}

const BRouter: React.FC<BRouterProps> = () => {
  // // useSelector 훅을 이용해서 state의 clientLogin store의 name을 getter 했다.
  const name = useSelector((state: RootState) => state.clientLogin.name);
  const Email = useSelector((state: RootState) => state.clientLogin.email);

  const [isAuth, setAuth] = useState<Boolean>(false);

  useEffect(() => {
    if (name && Email) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [name, Email]);

  return (
    <Router>
      {isAuth ? <Appbar /> : null}
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/test" exact component={TestPage} />
        <Route path="/profile/:nickname" component={Profile} />
        <Route path="/oauth/:socialCompany" component={Authlogin} />
        <Route path="/articles" component={Articles} />
      </Switch>
    </Router>
  );
};

export default BRouter;
