import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store/store";
import AnnouncementList from "./list/announcementList.root";

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <AnnouncementList/>
                </Route>
            </Switch>
        </Router>
    </Provider>
)

export default App;