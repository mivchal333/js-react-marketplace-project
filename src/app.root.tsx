import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store/store";
import AnnouncementList from "./list/announcementList.root";
import AnnouncementDetails from "./details/container/announcementDetails.root";
import AnnouncmentAdd from "./form/announcmentAdd.root"
import AnnouncmentEdit from "./form/announcmentEdit.root"

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <AnnouncementList/>
                </Route>
                <Route exact path="/add">
                    <AnnouncmentAdd/>
                </Route>
                <Route exact path="/edit/:productId">
                    <AnnouncmentEdit/>
                </Route>
                <Route exact path="/product/:productId">
                    <AnnouncementDetails/>
                </Route>
            </Switch>
        </Router>
    </Provider>
)

export default App;
