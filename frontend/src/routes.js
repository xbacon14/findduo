import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes() {
     return (
          <HashRouter basename="/">
               <div className="App">
                    <Route path="/" exact component={Login} />
                    <Route path="/lol/:id" component={Main} />
               </div>
          </HashRouter>
     );


}

