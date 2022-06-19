import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail";

const Layout = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path={"/character/:id/detail"} component={CharacterDetail}></Route>
                <Route exact path={"/"} component={Home}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Layout;